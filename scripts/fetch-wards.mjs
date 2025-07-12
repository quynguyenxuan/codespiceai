// scripts/fetch-wards.mjs
// Script lấy dữ liệu phường/xã mới từ API sapnhap.bando.com.vn
// Kết quả lưu vào data/ward.json
// Cách dùng: node scripts/fetch-wards.mjs

import axios from 'axios'
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'

const API_URL = 'https://sapnhap.bando.com.vn/ptracuu'
const OUTPUT_PATH = path.resolve('data', 'wards.json')

async function fetchWardById(id) {
  const form = new FormData()
  form.append('id', id)
  const headers = form.getHeaders()
  const res = await axios.post(API_URL, form, { headers })
  return res.data
}

async function main() {
  const allData = []
  for (let id = 1; id <= 34; id++) {
    try {
      console.log(`Fetching id=${id}...`)
      const data = await fetchWardById(id)
      allData.push({ id, data })
    } catch (err) {
      console.error(`Error fetching id=${id}:`, err.response?.data || err.message)
    }
  }
  // Đảm bảo thư mục data tồn tại
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allData, null, 2), 'utf-8')
  console.log('Đã lưu dữ liệu vào', OUTPUT_PATH)
}

main()
