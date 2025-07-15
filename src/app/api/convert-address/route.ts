import { NextRequest, NextResponse } from 'next/server'
import fuzzysort from 'fuzzysort'

interface AddressInput {
  ward: string
  district: string
  province: string
}

interface AddressMapping {
  oldProvince: string
  oldDistrict: string
  oldWard: string
  newProvince: string
  newDistrict: string
  newWard: string
  oldProvinceDescription?: string
  oldDistrictDescription?: string
  oldWardDescription?: string
  newProvinceDescription?: string
  newDistrictDescription?: string
  newWardDescription?: string
  oldPopulation?: string
  newPopulation?: string
  oldAreaKm2?: string
  newAreaKm2?: string
  oldAdminCenter?: string
  newAdminCenter?: string
  oldLongitude?: string
  newLongitude?: string
  oldLatitude?: string
  newLatitude?: string
  note?: string
}

// Hàm fetch mapping từ PayloadCMS REST API
async function fetchAddressMappings(): Promise<AddressMapping[]> {
  const urlBase = process.env.PAYLOAD_API_URL + '/address-mappings'
  let allDocs: AddressMapping[] = []
  let page = 1
  const limit = 10000
  while (true) {
    const url = `${urlBase}?limit=${limit}&page=${page}`
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })
    const data = await res.json()
    if (!data.docs || data.docs.length === 0) break
    allDocs = allDocs.concat(data.docs)
    if (data.docs.length < limit) break
    page++
  }
  return allDocs
}

function normalize(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/(xã|phường|thị trấn|huyện|quận|thành phố|tỉnh)/g, '')
    .replace(/[.,]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getTopMatches(
  input: AddressInput,
  mappings: AddressMapping[],
  topN: number = 3,
): Array<{ mapping: AddressMapping; score: number }> {
  const inputWard = normalize(input.ward)
  const inputDistrict = normalize(input.district)
  const inputProvince = normalize(input.province)

  // Sử dụng fuzzy cho từng trường, ưu tiên ward
  const scored: Array<{ mapping: AddressMapping; score: number }> = []
  for (const m of mappings) {
    const candidates = [
      { ward: m.oldWard, district: m.oldDistrict, province: m.oldProvince },
      { ward: m.newWard, district: m.newDistrict, province: m.newProvince },
    ]
    let bestScore = -Infinity
    for (const c of candidates) {
      // Fuzzy cho ward
      const wardScore = inputWard
        ? (fuzzysort.single(inputWard, normalize(c.ward))?.score ?? -1000)
        : 0
      // Fuzzy cho district
      const districtScore = inputDistrict
        ? (fuzzysort.single(inputDistrict, normalize(c.district))?.score ?? -1000)
        : 0
      // Fuzzy cho province
      const provinceScore = inputProvince
        ? (fuzzysort.single(inputProvince, normalize(c.province))?.score ?? -1000)
        : 0
      // Tổng điểm: ưu tiên ward > district > province
      let score = 0
      if (wardScore > -1000) score += 1000 + wardScore * 2
      if (districtScore > -1000) score += 500 + districtScore
      if (provinceScore > -1000) score += 200 + provinceScore
      if (score > bestScore) bestScore = score
    }
    if (bestScore > 0) {
      scored.push({ mapping: m, score: bestScore })
    }
  }
  // Gom nhóm theo điểm số, lấy hết nhóm cao nhất, nếu chưa đủ thì lấy tiếp nhóm điểm thấp hơn cho đến khi đủ topN
  scored.sort((a, b) => b.score - a.score)
  const result: Array<{ mapping: AddressMapping; score: number }> = []
  let i = 0
  while (result.length < topN && i < scored.length) {
    const currentScore = scored[i]?.score
    if (currentScore === undefined) break
    const sameScoreGroup = scored.filter((m) => m.score === currentScore && !result.includes(m))
    for (const item of sameScoreGroup) {
      const isDuplicate = result.some(
        (r) =>
          r.mapping.newWard === item.mapping.newWard &&
          r.mapping.newProvince === item.mapping.newProvince,
      )
      if (!isDuplicate) {
        result.push(item)
      }
    }
    i += sameScoreGroup.length
  }
  return result.slice(0, Math.max(result.length, topN))
}

function buildDescription(m: any) {
  const desc = []
  if (m.note) desc.push(m.note)
  if (m.newPopulation) desc.push(`Dân số: ${m.newPopulation}`)
  if (m.newAreaKm2) desc.push(`Diện tích: ${m.newAreaKm2} km²`)
  if (m.newAdminCenter) desc.push(`Trung tâm: ${m.newAdminCenter}`)
  if (m.newLongitude && m.newLatitude)
    desc.push(`Kinh độ: ${m.newLongitude}, Vĩ độ: ${m.newLatitude}`)
  if (m.newProvinceDescription || m.newWardDescription || m.newDistrictDescription)
    desc.push(m.newProvinceDescription || m.newWardDescription || m.newDistrictDescription)
  return desc.join('\n')
}

export async function POST(req: NextRequest) {
  const { addresses } = (await req.json()) as { addresses: AddressInput[] }
  const addressMappings = await fetchAddressMappings()
  const results = addresses.map((input: AddressInput) => {
    const matches = getTopMatches(input, addressMappings, 3)
    return {
      input: [input.ward, input.district, input.province].filter(Boolean).join(', '),
      matches: matches.map(({ mapping, score }) => ({ ...mapping, score: Math.round(score) })),
    }
  })
  return NextResponse.json({ results })
}
