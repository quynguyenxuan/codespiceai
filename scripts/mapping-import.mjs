// scripts/mapping-import.mjs
import fs from 'fs'
import path from 'path'
import axios from 'axios'

const API_URL = process.env.PAYLOAD_API_URL + '/address-mappings'
const TOKEN = process.env.PAYLOAD_API_TOKEN

const provinces = JSON.parse(fs.readFileSync('data/provinces.json', 'utf-8'))
const wards = JSON.parse(fs.readFileSync('data/wards.json', 'utf-8'))

function splitNames(str) {
  return str
    .replace(/và/g, ',')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

async function importProvinceMappings() {
  for (const p of provinces) {
    if (!p.tentinh || !p.truocsapnhap) continue
    const oldNames = splitNames(p.truocsapnhap)
    for (const oldProvince of oldNames) {
      const mapping = {
        oldProvince,
        oldDistrict: '',
        oldWard: '',
        newProvince: p.tentinh,
        newDistrict: '',
        newWard: '',
        oldProvinceDescription: '',
        oldDistrictDescription: '',
        oldWardDescription: '',
        newProvinceDescription: p.truocsapnhap ? `Sáp nhập từ: ${p.truocsapnhap}` : '',
        newDistrictDescription: '',
        newWardDescription: '',
        oldPopulation: '',
        newPopulation: p.dansonguoi || '',
        oldAreaKm2: '',
        newAreaKm2: p.dientichkm2 || '',
        oldAdminCenter: '',
        newAdminCenter: p.trungtamhc || '',
        oldLongitude: '',
        newLongitude: p.kinhdo ? String(p.kinhdo) : '',
        oldLatitude: '',
        newLatitude: p.vido ? String(p.vido) : '',
        note: p.truocsapnhap ? `Sáp nhập từ: ${p.truocsapnhap}` : '',
      }
      try {
        await axios.post(API_URL, mapping, {
          headers: {
            // Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        })
        console.log('Imported province mapping:', mapping)
      } catch (err) {
        console.error(
          'Error importing province mapping:',
          mapping,
          err.response?.data || err.message,
        )
      }
    }
  }
}

async function importWardMappings() {
  for (const province of wards) {
    for (const ward of province.data) {
      if (!ward.tenhc || !ward.truocsapnhap) continue
      const oldNames = splitNames(ward.truocsapnhap)
      for (const oldWard of oldNames) {
        const mapping = {
          oldProvince: '',
          oldDistrict: '', // Không có cấp huyện
          oldWard,
          newProvince: ward.tentinh || '',
          newDistrict: '',
          newWard: ward.tenhc,
          oldProvinceDescription: '',
          oldDistrictDescription: '',
          oldWardDescription: '',
          newProvinceDescription: '',
          newDistrictDescription: '',
          newWardDescription: ward.loai || '',
          oldPopulation: '',
          newPopulation: ward.dansonguoi || '',
          oldAreaKm2: '',
          newAreaKm2: ward.dientichkm2 || '',
          oldAdminCenter: '',
          newAdminCenter: ward.trungtamhc || '',
          oldLongitude: '',
          newLongitude: ward.kinhdo ? String(ward.kinhdo) : '',
          oldLatitude: '',
          newLatitude: ward.vido ? String(ward.vido) : '',
          note: ward.truocsapnhap ? `Sáp nhập từ: ${ward.truocsapnhap}` : '',
        }
        try {
          await axios.post(API_URL, mapping, {
            headers: {
              // Authorization: `Bearer ${TOKEN}`,
              'Content-Type': 'application/json',
            },
          })
          console.log('Imported ward mapping:', mapping)
        } catch (err) {
          console.error('Error importing ward mapping:', mapping, err.response?.data || err.message)
        }
      }
    }
  }
}

async function main() {
  await importProvinceMappings()
  await importWardMappings()
  console.log('Hoàn tất import mapping!')
}

main()
