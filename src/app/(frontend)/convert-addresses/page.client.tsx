'use client'
import { useState } from 'react'
import Papa from 'papaparse'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

// Hàm tách địa chỉ thành tỉnh, huyện, xã (giả định: xã, huyện, tỉnh, cách nhau bởi dấu phẩy)
function parseAddressLine(line: string) {
  const parts = line.split(',').map((s) => s.trim())
  return {
    ward: parts[0] || '',
    district: parts[1] || '',
    province: parts[2] || '',
  }
}

export default function ConvertAddressesPageClient() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    setLoading(true)
    // Hỗ trợ nhập nhiều dòng, mỗi dòng là một địa chỉ (cũ hoặc mới)
    const addresses = input
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(parseAddressLine)
    const res = await fetch('/api/convert-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresses }),
    })
    const data = await res.json()
    setResults(data.results)
    setLoading(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    Papa.parse(f, {
      complete: (result) => {
        const addresses = result.data.flat().filter(Boolean)
        setInput(addresses.join('\n'))
      },
    })
  }

  const handleDownload = () => {
    if (!results.length) return
    const csv = Papa.unparse(
      results.flatMap((r) =>
        r.matches.map((m: any) => ({
          'Địa chỉ gốc': r.input,
          'Tỉnh/Thành cũ': m.oldProvince,
          'Quận/Huyện cũ': m.oldDistrict,
          'Phường/Xã cũ': m.oldWard,
          'Tỉnh/Thành mới': m.newProvince,
          'Quận/Huyện mới': m.newDistrict,
          'Phường/Xã mới': m.newWard,
          'Dân số mới': m.newPopulation,
          'Diện tích mới (km2)': m.newAreaKm2,
          'Trung tâm hành chính mới': m.newAdminCenter,
          'Kinh độ mới': m.newLongitude,
          'Vĩ độ mới': m.newLatitude,
          'Mô tả mới': m.newProvinceDescription || m.newWardDescription || m.newDistrictDescription,
          'Ghi chú': m.note,
          'Điểm khớp': m.score,
        })),
      ),
    )
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'ket-qua-chuyen-doi-dia-chi.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Chuyển đổi địa chỉ hành chính Việt Nam</h1>
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={6}
            placeholder="Nhập một hoặc nhiều địa chỉ (mỗi dòng: xã, huyện, tỉnh hoặc tỉnh, huyện, xã)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center gap-2 mb-4">
            <input type="file" accept=".csv,.txt" onChange={handleFileUpload} />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleConvert}
              disabled={loading}
            >
              {loading ? 'Đang chuyển đổi...' : 'Chuyển đổi'}
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleDownload}
              disabled={!results.length}
            >
              Tải kết quả CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            {results.length > 0 && (
              <Table className="border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead>Địa chỉ gốc</TableHead>
                    <TableHead>Địa chỉ mới</TableHead>
                    <TableHead>Điểm khớp</TableHead>
                    <TableHead>Mô tả</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r, i) =>
                    r.matches.length > 0 ? (
                      r.matches.map((m: any, j: number) => {
                        const newAddress = [
                          m.newWardDescription + ' ' + m.newWard,
                          m.newDistrict,
                          m.newProvince,
                        ]
                          .filter(Boolean)
                          .join(', ')
                        const descItems = []
                        if (m.note)
                          descItems.push(
                            <li key="note">
                              <span className="font-semibold">Ghi chú:</span> {m.note}
                            </li>,
                          )
                        if (m.newPopulation)
                          descItems.push(
                            <li key="pop">
                              <span className="font-semibold">Dân số:</span> {m.newPopulation}
                            </li>,
                          )
                        if (m.newAreaKm2)
                          descItems.push(
                            <li key="area">
                              <span className="font-semibold">Diện tích:</span> {m.newAreaKm2} km²
                            </li>,
                          )
                        if (m.newAdminCenter)
                          descItems.push(
                            <li key="center">
                              <span className="font-semibold">Trung tâm:</span> {m.newAdminCenter}
                            </li>,
                          )
                        if (m.newLongitude && m.newLatitude)
                          descItems.push(
                            <li key="coords">
                              <span className="font-semibold">Tọa độ:</span> Kinh độ{' '}
                              {m.newLongitude}, Vĩ độ {m.newLatitude}
                            </li>,
                          )
                        if (m.newProvinceDescription)
                          descItems.push(
                            <li key="provdesc">
                              <span className="font-semibold">Mô tả tỉnh/thành:</span>{' '}
                              {m.newProvinceDescription}
                            </li>,
                          )
                        if (m.newDistrictDescription)
                          descItems.push(
                            <li key="distdesc">
                              <span className="font-semibold">Mô tả quận/huyện:</span>{' '}
                              {m.newDistrictDescription}
                            </li>,
                          )
                        if (m.newWardDescription)
                          descItems.push(
                            <li key="warddesc">
                              <span className="font-semibold">Mô tả phường/xã:</span>{' '}
                              {m.newWardDescription}
                            </li>,
                          )
                        return (
                          <TableRow key={i + '-' + j}>
                            <TableCell>{r.input}</TableCell>
                            <TableCell>
                              {newAddress || <span className="text-gray-400">Không rõ</span>}
                            </TableCell>
                            <TableCell>{m.score}</TableCell>
                            <TableCell style={{ minWidth: 220 }}>
                              {descItems.length > 0 ? (
                                <ul className="list-disc pl-4 space-y-1 text-left">{descItems}</ul>
                              ) : (
                                <span className="text-gray-400">Không có thông tin bổ sung</span>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow key={i + '-noresult'}>
                        <TableCell>{r.input}</TableCell>
                        <TableCell colSpan={3} className="text-red-500 text-center">
                          Không tìm thấy kết quả phù hợp
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
