import fs from 'fs'
import axios from 'axios'

const API_URL = process.env.PAYLOAD_API_URL + '/address-mappings'
const TOKEN = process.env.PAYLOAD_API_TOKEN

const dvhcvn = JSON.parse(fs.readFileSync('data/dvhcvn.json', 'utf-8'))

async function importOldMappings() {
  for (const province of dvhcvn.data) {
    const oldProvince = province.name
    const oldProvinceDescription = province.type
    for (const district of province.level2s || []) {
      const oldDistrict = district.name
      const oldDistrictDescription = district.type
      for (const ward of district.level3s || []) {
        const oldWard = ward.name
        const oldWardDescription = ward.type
        const mapping = {
          oldProvince,
          oldDistrict,
          oldWard,
          newProvince: '',
          newDistrict: '',
          newWard: '',
          oldProvinceDescription,
          oldDistrictDescription,
          oldWardDescription,
          newProvinceDescription: '',
          newDistrictDescription: '',
          newWardDescription: '',
          oldPopulation: '',
          newPopulation: '',
          oldAreaKm2: '',
          newAreaKm2: '',
          oldAdminCenter: '',
          newAdminCenter: '',
          oldLongitude: '',
          newLongitude: '',
          oldLatitude: '',
          newLatitude: '',
          note: 'Dữ liệu trước sáp nhập',
        }
        try {
          await axios.post(API_URL, mapping, {
            headers: {
              // Authorization: `Bearer ${TOKEN}`,
              'Content-Type': 'application/json',
            },
          })
          console.log('Imported:', oldProvince, oldDistrict, oldWard)
        } catch (err) {
          console.error('Error importing:', mapping, err.response?.data || err.message)
        }
      }
    }
  }
}

importOldMappings().then(() => console.log('Done!'))
