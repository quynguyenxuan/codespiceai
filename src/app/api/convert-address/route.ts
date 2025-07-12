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
  const urlBase = process.env.PAYLOAD_API_URL + '/api/address-mappings'
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

  const scored: Array<{ mapping: AddressMapping; score: number }> = []

  for (const m of mappings) {
    const candidates = [
      { ward: m.oldWard, district: m.oldDistrict, province: m.oldProvince },
      { ward: m.newWard, district: m.newDistrict, province: m.newProvince },
    ]
    let bestScore = -Infinity
    for (const c of candidates) {
      let score = 0
      if (normalize(c.ward) === inputWard && inputWard) score += 10
      else if (inputWard && normalize(c.ward).includes(inputWard)) score += 5
      if (normalize(c.district) === inputDistrict && inputDistrict) score += 5
      else if (inputDistrict && normalize(c.district).includes(inputDistrict)) score += 2
      if (normalize(c.province) === inputProvince && inputProvince) score += 3
      else if (inputProvince && normalize(c.province).includes(inputProvince)) score += 1
      if (score > bestScore) bestScore = score
    }
    if (bestScore > 0) {
      scored.push({ mapping: m, score: bestScore })
    }
  }
  // Sắp xếp theo điểm số giảm dần và lấy topN
  return scored.sort((a, b) => b.score - a.score).slice(0, topN)
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
      matches: matches.map(({ mapping, score }) => ({ ...mapping, score })),
    }
  })
  return NextResponse.json({ results })
}
