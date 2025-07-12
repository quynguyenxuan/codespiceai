# Hướng dẫn cấu hình biến môi trường PayloadCMS cho tính năng chuyển đổi địa chỉ

Tính năng chuyển đổi địa chỉ hành chính Việt Nam cần truy cập dữ liệu mapping từ PayloadCMS thông qua API. Để cấu hình đúng, bạn cần thiết lập các biến môi trường sau trong file `.env` hoặc `.env.local` của dự án Next.js:

---

## 1. PAYLOAD_API_URL
- **Ý nghĩa:** Địa chỉ endpoint gốc của PayloadCMS, thường là domain hoặc IP nơi bạn deploy PayloadCMS.
- **Ví dụ:**
  - Nếu bạn chạy local: `http://localhost:3000`
  - Nếu deploy production: `https://cms.yourdomain.com`
- **Cách lấy:**
  - Đăng nhập vào admin PayloadCMS, kiểm tra URL trên trình duyệt.
  - Hoặc hỏi dev backend quản lý hệ thống PayloadCMS.

**Cấu hình:**
```
PAYLOAD_API_URL=https://cms.yourdomain.com
```

---

## 2. PAYLOAD_API_TOKEN
- **Ý nghĩa:** Token xác thực (Bearer Token) để truy cập API nếu PayloadCMS của bạn yêu cầu bảo mật (thường là production).
- **Cách lấy:**
  1. Đăng nhập vào PayloadCMS admin bằng tài khoản có quyền API.
  2. Vào phần "Users" (hoặc "API Keys" nếu có), tạo mới hoặc lấy token sẵn có.
  3. Sao chép token này và dán vào biến môi trường.
- **Nếu API public:** Có thể để trống biến này.

**Cấu hình:**
```
PAYLOAD_API_TOKEN=your_token_here
```

---

## 3. Lưu ý khi sử dụng
- **Không commit file `.env` hoặc `.env.local` chứa token lên git/public repo.**
- Nếu thay đổi URL hoặc token, cần khởi động lại server Next.js để nhận cấu hình mới.
- Nếu gặp lỗi 401/403 khi gọi API, kiểm tra lại token hoặc quyền truy cập của user trên PayloadCMS.

---

## 4. Ví dụ cấu hình hoàn chỉnh
```
PAYLOAD_API_URL=https://cms.example.com
PAYLOAD_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

---

## 5. Tham khảo thêm
- [PayloadCMS REST API docs](https://payloadcms.com/docs/rest-api/overview)
- Hỏi dev backend hoặc quản trị viên nếu bạn không rõ thông tin cấu hình.

---

## 6. Nguyên lý hoạt động của tính năng chuyển đổi địa chỉ

### 1. Nhập địa chỉ và gửi yêu cầu chuyển đổi
- Người dùng có thể nhập nhiều địa chỉ (mỗi dòng một địa chỉ) hoặc upload file (CSV, TXT).
- Khi nhấn nút "Chuyển đổi", frontend gửi danh sách địa chỉ lên API `/api/convert-address`.

### 2. Xử lý backend (API Next.js)
- API `/api/convert-address` sẽ:
  1. Gọi tới PayloadCMS (qua REST API) để lấy toàn bộ dữ liệu mapping địa chỉ cũ → mới từ collection `address-mappings`.
  2. Với mỗi địa chỉ người dùng nhập, sử dụng thuật toán fuzzy matching (thư viện `fuzzysort`) để tìm địa chỉ cũ gần đúng nhất trong dữ liệu mapping.
  3. Nếu tìm được, trả về địa chỉ mới tương ứng và điểm số độ khớp (score). Nếu không, trả về "Không tìm thấy".

### 3. Hiển thị kết quả cho người dùng
- Frontend nhận kết quả, hiển thị bảng gồm:
  - Địa chỉ gốc
  - Địa chỉ mới (nếu tìm thấy)
  - Độ khớp (score)
- Người dùng có thể kiểm tra, copy, tải file CSV hoặc xử lý tiếp kết quả này.

### 4. Ưu điểm
- Dữ liệu mapping lấy động từ PayloadCMS, dễ cập nhật, không cần deploy lại code khi thay đổi dữ liệu.
- Hỗ trợ fuzzy matching giúp nhận diện địa chỉ kể cả khi người dùng nhập sai chính tả hoặc thiếu ký tự.
- Có thể mở rộng thêm các tính năng như export kết quả, lưu lịch sử, phân quyền sử dụng...

--- 