// scripts/fetch-provinces.mjs
// Script lấy dữ liệu tỉnh/thành phố mới sau sáp nhập từ API sapnhap.bando.com.vn
// Kết quả lưu vào data/provinces.json
// Cách dùng: node scripts/fetch-provinces.mjs

import axios from 'axios'
import fs from 'fs'
import path from 'path'

const API_URL = 'https://sapnhap.bando.com.vn/pcotinh'
const OUTPUT_PATH = path.resolve('data', 'provinces.json')

async function fetchProvinces() {
  const res = await axios.post(API_URL, {})
  return res.data
}

async function main() {
  try {
    console.log('Fetching provinces...')
    const data = await fetchProvinces()
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), 'utf-8')
    console.log('Đã lưu dữ liệu vào', OUTPUT_PATH)
  } catch (err) {
    console.error('Error fetching provinces:', err.response?.data || err.message)
  }
}

main()
