import fs from 'fs'
import axios from 'axios'
import { getPayload } from 'payload'
import config from '@payload-config'

const API_URL = process.env.PAYLOAD_API_URL + '/address-mappings'
const TOKEN = process.env.PAYLOAD_API_TOKEN
const DATABASE_URI = process.env.DATABASE_URI
console.log(DATABASE_URI)

console.log(API_URL, TOKEN)
console.log(config)

const dvhcvn = JSON.parse(fs.readFileSync('data/dvhcvn.json', 'utf-8'))

// Get a local copy of Payload by passing your config
const payload = await getPayload({ config })

// Hàm loại bỏ dấu tiếng Việt và chuyển về lowerCase
function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w\s]/gi, '')
    .toLowerCase()
    .trim()
}

async function updateOldMappings() {
  console.log('updateOldMappings: start')
  for (const province of dvhcvn.data) {
    const oldProvince = province.name
    const oldProvinceDescription = province.type
    for (const district of province.level2s || []) {
      const oldDistrict = district.name
      const oldDistrictDescription = district.type
      for (const ward of district.level3s || []) {
        const oldWard = ward.name
        // 1. Tìm bản ghi theo oldWard gần đúng (contains)
        try {
          // Ưu tiên dùng contains nếu API hỗ trợ
          let res
          try {
            // res = await axios.get(API_URL, {
            //   params: { 'where[oldWard][contains]': oldWard },
            //   headers: {
            //     // Authorization: `Bearer ${TOKEN}`,
            //     'Content-Type': 'application/json',
            //   },
            // })
            res = await payload.find({
              collection: 'address-mappings',
              where: {
                oldWard: { contains: oldWard },
              },
            })
          } catch (e) {
            // Nếu không hỗ trợ contains, fallback sang lấy nhiều bản ghi rồi lọc thủ công
            // res = await axios.get(API_URL, {
            //   params: { 'where[oldWard][like]': oldWard },
            //   headers: {
            //     // Authorization: `Bearer ${TOKEN}`,
            //     'Content-Type': 'application/json',
            //   },
            // })
            res = await payload.find({
              collection: 'address-mappings',
              where: {
                oldWard: { like: oldWard },
              },
            })
          }
          const items = res.data?.docs || res.data?.data || res.docs || res.data || []
          // Lọc lại: oldWard gốc là substring (không dấu, lowerCase) của oldWard trong DB
          const normOldWard = normalize(oldWard)
          const matched = items.filter((item) => {
            if (!item.oldWard) return false
            return normalize(item.oldWard).includes(normOldWard)
          })
          if (!matched.length) continue
          for (const item of matched) {
            // Nếu thiếu oldDistrict/oldProvince thì cập nhật
            if (
              !item.oldDistrict ||
              !item.oldProvince ||
              !item.oldDistrictDescription ||
              !item.oldProvinceDescription
            ) {
              const patch = {}
              if (!item.oldDistrict) patch.oldDistrict = oldDistrict
              if (!item.oldDistrictDescription)
                patch.oldDistrictDescription = oldDistrictDescription
              if (!item.oldProvince) patch.oldProvince = oldProvince
              if (!item.oldProvinceDescription)
                patch.oldProvinceDescription = oldProvinceDescription
              if (Object.keys(patch).length > 0) {
                try {
                  // await axios.patch(`${API_URL}/${item.id || item._id}`, patch, {
                  //   headers: {
                  //     Cookie: `payload-token=${TOKEN}`,
                  //     'Content-Type': 'application/json',
                  //   },
                  // })
                  await payload.update({
                    collection: 'address-mappings',
                    id: item.id || item._id,
                    data: patch,
                  })
                  console.log('Updated:', item.oldWard, patch)
                } catch (err) {
                  console.error(
                    'Error updating:',
                    item.oldWard,
                    patch,
                    err.response?.data || err.message,
                  )
                }
              }
            }
          }
        } catch (err) {
          console.error('Error finding:', oldWard, err.response?.data || err.message)
        }
      }
    }
  }
}

await updateOldMappings().then(() => console.log('Done!'))
