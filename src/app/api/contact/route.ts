import { NextRequest, NextResponse } from 'next/server'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

// Đảm bảo cài @aws-sdk/client-ses trong package.json

const PAYLOAD_API = process.env.PAYLOAD_API_URL // ví dụ: 'https://yourdomain.com/api/contacts'
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY

const ses = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
})

const EMAIL_FROM = process.env.AWS_SES_FROM_EMAIL // verified sender
const EMAIL_TO = process.env.AWS_SES_TO_EMAIL // nhận thông báo

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    // Map dữ liệu form sang schema contacts
    const payloadData = {
      title: data.subject || data.name,
      username: data.name,
      email: data.email,
      company: data.company,
      phoneNumber: data.phone,
      content: data.message,
      budgetMin: data.budget?.split('-')[0],
      budgetMax: data.budget?.split('-')[1],
    }
    // 1. Lưu vào PayloadCMS
    const saveRes = await fetch(`${PAYLOAD_API}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${PAYLOAD_API_KEY}`,
      },
      body: JSON.stringify(payloadData),
    })
    if (!saveRes.ok) {
      const err = await saveRes.text()
      return NextResponse.json(
        { success: false, error: 'Lưu dữ liệu thất bại', detail: err },
        { status: 500 },
      )
    }

    // 2. Gửi email qua AWS SES
    const emailBody = `Bạn nhận được liên hệ mới từ website:\n\nHọ tên: ${data.name}\nEmail: ${data.email}\nCông ty: ${data.company}\nSố điện thoại: ${data.phone}\nChủ đề: ${data.subject}\nNgân sách: ${data.budget}\nNội dung: ${data.message}`
    const emailParams = {
      Destination: { ToAddresses: [EMAIL_TO!] },
      Message: {
        Body: { Text: { Data: emailBody } },
        Subject: { Data: `Liên hệ mới từ website: ${data.subject || data.name}` },
      },
      Source: EMAIL_FROM!,
      ReplyToAddresses: [data.email],
    }
    await ses.send(new SendEmailCommand(emailParams))

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi không xác định' },
      { status: 500 },
    )
  }
}
