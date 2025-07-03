# Hướng Dẫn Kỹ Thuật: Di Chuyển Cơ Sở Dữ Liệu từ SQLite sang PostgreSQL cho Dự Án Next.js & Payload CMS

Tài liệu này cung cấp một kế hoạch toàn diện để phân tích và thực hiện việc di chuyển cơ sở dữ liệu từ SQLite sang PostgreSQL một cách an toàn và hiệu quả, được tùy chỉnh cho kiến trúc dự án sử dụng Next.js và Payload CMS.

## Mục Lục
1.  [Phân Tích Hiện Trạng Dự Án](#1-phân-tích-hiện-trạng-dự-án)
2.  [Phân Tích Schema và Truy Vấn](#2-phân-tích-schema-và-truy-vấn)
3.  [Kế Hoạch Di Chuyển Chi Tiết](#3-kế-hoạch-di-chuyển-chi-tiết)
4.  [Cập Nhật Mã Nguồn Ứng Dụng](#4-cập-nhật-mã-nguồn-ứng-dụng)
5.  [Kiểm Thử và Xác Thực](#5-kiểm-thử-và-xác-thực)
6.  [Rủi Ro Tiềm Ẩn và Giải Pháp](#6-rủi-ro-tiềm-ẩn-và-giải-pháp)

---

### 1. Phân Tích Hiện Trạng Dự Án

Mục tiêu của giai đoạn này là xác định chính xác các công nghệ đang được sử dụng để có chiến lược di chuyển phù hợp.

*   **Ngôn ngữ & Framework:**
    *   **Ngôn ngữ:** TypeScript.
    *   **Framework:** Next.js cho frontend và backend logic.
    *   **CMS & ORM:** Payload CMS. Đây là thành phần quan trọng nhất, vì Payload quản lý schema và các tương tác với cơ sở dữ liệu thông qua các "Collections" và "Globals" được định nghĩa bằng code.

*   **Tệp Cấu Hình Cơ Sở Dữ Liệu:**
    *   **Payload Configuration:** Cấu hình kết nối cơ sở dữ liệu của Payload thường nằm trong tệp `payload.config.ts`. Hiện tại, nó có khả năng đang sử dụng `@payloadcms/db-sqlite`.
    *   **Biến Môi Trường:** Chuỗi kết nối cơ sở dữ liệu được quản lý thông qua tệp `.env`.
    *   **Docker:** Tệp `docker-compose.yml` định nghĩa các dịch vụ của môi trường phát triển. Đây là nơi lý tưởng để thêm dịch vụ PostgreSQL mới.

### 2. Phân Tích Schema và Truy Vấn

Do sử dụng Payload CMS, việc phân tích schema và truy vấn sẽ khác với các dự án truyền thống.

*   **Phân Tích Schema:**
    *   Schema không được định nghĩa trong một tệp `.sql` mà được **định nghĩa bằng code** trong các thư mục `src/collections/` và `src/globals/`.
    *   **Hành động:** Rà soát tất cả các tệp trong các thư mục này để hiểu rõ cấu trúc dữ liệu:
        *   **Bảng (Collections):** Mỗi tệp trong `src/collections/` định nghĩa một bảng.
        *   **Cột (Fields):** Mảng `fields` trong mỗi collection định nghĩa các cột, kiểu dữ liệu (`text`, `number`, `relationship`, `blocks`, v.v.), và các ràng buộc (`required`, `unique`).
        *   **Mối quan hệ (Relationships):** Các trường `relationship` và `upload` định nghĩa các khóa ngoại.
        *   **Chỉ mục (Indexes):** Các trường có `index: true` sẽ được tạo chỉ mục.

*   **Rà Soát Truy Vấn Đặc Thù:**
    *   Payload CMS xử lý hầu hết các truy vấn CRUD. Các truy vấn SQL thô là rất hiếm.
    *   **Hành động:** Tìm kiếm trong toàn bộ mã nguồn các vị trí có thể chứa logic đặc thù của SQLite:
        *   **Custom Endpoints:** Kiểm tra thư mục `src/endpoints/`.
        *   **Hooks:** Kiểm tra các tệp hooks trong `src/collections/**/hooks/`.
        *   **Custom Components/Functions:** Tìm kiếm các từ khóa như `knex`, `db.raw`, hoặc các hàm SQL của SQLite (ví dụ: `strftime`, `group_concat`).
    *   **Dự đoán:** Khả năng cao là sẽ không có hoặc có rất ít truy vấn thô cần sửa đổi.

### 3. Kế Hoạch Di Chuyển Chi Tiết

Đây là quy trình từng bước để thực hiện việc di chuyển.

#### Bước 1: Sao Lưu Cơ Sở Dữ Liệu SQLite

Tuyệt đối không bỏ qua bước này.

```bash
# Lệnh sao lưu toàn bộ schema và dữ liệu ra một tệp .sql
sqlite3 path/to/your/database.db .dump > backup.sql
```
*Lưu ý: Thay `path/to/your/database.db` bằng đường dẫn thực tế đến tệp cơ sở dữ liệu SQLite của bạn.*

#### Bước 2: Thiết Lập Instance PostgreSQL

Sử dụng Docker để thiết lập một môi trường nhất quán.

*   **Hành động:** Cập nhật tệp `docker-compose.yml` để thêm một dịch vụ PostgreSQL.

```yaml
# trong docker-compose.yml

services:
  # ... các dịch vụ hiện có của bạn (ví dụ: nextjs-app)

  postgres:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: your_db_user
      POSTGRES_PASSWORD: your_db_password
      POSTGRES_DB: your_db_name
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - your_network # Đảm bảo app và db cùng network

volumes:
  postgres_data:

# ...
```

*   Chạy lệnh để khởi tạo container: `docker-compose up -d postgres`

#### Bước 3: Tái Tạo Schema trên PostgreSQL

Payload CMS làm cho bước này trở nên cực kỳ đơn giản.

*   **Hành động:**
    1.  Cập nhật cấu hình Payload để trỏ đến PostgreSQL (xem chi tiết ở [Mục 4](#4-cập-nhật-mã-nguồn-ứng-dụng)).
    2.  Khởi động ứng dụng Payload.
    3.  Payload sẽ tự động đọc các định nghĩa trong `src/collections/` và tạo tất cả các bảng, cột, kiểu dữ liệu, và chỉ mục tương thích với PostgreSQL. **Không cần viết `CREATE TABLE` thủ công.**

#### Bước 4: Di Chuyển Dữ Liệu

Có hai phương pháp chính:

##### Phương pháp 1: Sử dụng `pgloader` (Khuyến khích)

`pgloader` là một công cụ mạnh mẽ được thiết kế chuyên cho việc di chuyển dữ liệu sang PostgreSQL.

*   **Cài đặt:** `sudo apt-get install pgloader` hoặc `brew install pgloader`.
*   **Tạo tệp lệnh:** Tạo một tệp `migration.load`.

```clojure
-- migration.load
LOAD DATABASE
    FROM sqlite:///path/to/your/database.db
    INTO postgresql://your_db_user:your_db_password@localhost:5432/your_db_name

WITH
    include drop,
    create tables,
    create indexes,
    reset sequences

SET
    maintenance_work_mem to '128MB',
    work_mem to '12MB'

BEFORE LOAD DO
    $$ DROP SCHEMA public CASCADE; $$,
    $$ CREATE SCHEMA public; $$
;
```

*   **Thực thi:**
    ```bash
    pgloader migration.load
    ```
*   **Ưu điểm:** Rất nhanh, tự động xử lý nhiều vấn đề chuyển đổi kiểu dữ liệu, đáng tin cậy.
*   **Nhược điểm:** Cần cài đặt một công cụ riêng.

##### Phương pháp 2: Viết Kịch Bản Tùy Chỉnh (Custom Script)

Sử dụng khi cần xử lý logic chuyển đổi dữ liệu phức tạp.

*   **Hành động:** Viết một kịch bản Node.js sử dụng các thư viện như `sqlite3` và `pg`.

```typescript
// Ví dụ pseudo-code cho migration-script.ts
import sqlite3 from 'sqlite3';
import { Client } from 'pg';

async function migrate() {
  const sqlite = new sqlite3.Database('path/to/database.db');
  const postgres = new Client({ connectionString: 'postgresql://...' });
  await postgres.connect();

  const tables = ['users', 'posts', 'pages']; // và các bảng khác

  for (const table of tables) {
    console.log(`Migrating ${table}...`);
    const rows = await new Promise<any[]>((resolve, reject) => {
      sqlite.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    for (const row of rows) {
      // Xử lý chuyển đổi dữ liệu nếu cần
      // Ví dụ: Chuyển đổi JSON string từ SQLite sang kiểu JSONB của Postgres
      if (row.layout) row.layout = JSON.parse(row.layout);

      const columns = Object.keys(row).join(', ');
      const values = Object.values(row);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

      try {
        await postgres.query(`INSERT INTO "${table}" (${columns}) VALUES (${placeholders})`, values);
      } catch (e) {
        console.error(`Failed to insert row into ${table}:`, row, e);
      }
    }
  }

  await postgres.end();
  sqlite.close();
}

migrate();
```

*   **Ưu điểm:** Toàn quyền kiểm soát logic chuyển đổi.
*   **Nhược điểm:** Tốn thời gian phát triển, dễ phát sinh lỗi, chậm hơn `pgloader`.

### 4. Cập Nhật Mã Nguồn Ứng Dụng

#### Bước 1: Cài Đặt Thư Viện

```bash
yarn add @payloadcms/db-postgres pg
yarn remove @payloadcms/db-sqlite # Xóa adapter cũ
```

#### Bước 2: Cập Nhật Biến Môi Trường

Trong tệp `.env` của bạn:

```diff
- DATABASE_URI=sqlite:///${path.resolve(__dirname, 'payload.db')}
+ DATABASE_URI=postgres://your_db_user:your_db_password@localhost:5432/your_db_name
```

#### Bước 3: Cập Nhật Cấu Hình Payload

Trong tệp `payload.config.ts`:

```typescript
import { buildConfig } from 'payload/config'
// import { sqliteAdapter } from '@payloadcms/db-sqlite' // Xóa dòng này
import { postgresAdapter } from '@payloadcms/db-postgres' // Thêm dòng này
import path from 'path'
// ... các import khác

export default buildConfig({
  // ... các cấu hình khác
  db: postgresAdapter({ // Thay đổi ở đây
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  // ...
})
```

### 5. Kiểm Thử và Xác Thực

#### Bước 1: Xác Thực Toàn Vẹn Dữ Liệu

*   **Đếm số lượng bản ghi:** Viết một kịch bản đơn giản để so sánh số lượng hàng trong các bảng chính giữa SQLite và PostgreSQL.
*   **So sánh dữ liệu mẫu:** Lấy một vài bản ghi phức tạp (ví dụ: một trang có nhiều content blocks) từ cả hai cơ sở dữ liệu và so sánh từng trường để đảm bảo dữ liệu được di chuyển chính xác.

#### Bước 2: Kiểm Thử Chức Năng Ứng Dụng

*   **Chạy bộ kiểm thử tự động (Automated Tests):** Nếu dự án có sẵn, đây là cách hiệu quả nhất để đảm bảo không có hồi quy (regression).
*   **Kiểm thử thủ công (Manual Testing):**
    *   Đăng nhập vào Payload Admin UI.
    *   Thực hiện các thao tác CRUD (Tạo, Đọc, Cập nhật, Xóa) trên tất cả các Collections.
    *   Kiểm tra các mối quan hệ (ví dụ: một bài viết có đúng tác giả không).
    *   Kiểm tra các trang frontend có hiển thị đúng dữ liệu không.
    *   Kiểm tra các chức năng đặc biệt như tìm kiếm, phân trang.

### 6. Rủi Ro Tiềm Ẩn và Giải Pháp

*   **Rủi Ro:** Mất dữ liệu trong quá trình di chuyển.
    *   **Giải Pháp:** **Luôn luôn sao lưu** cơ sở dữ liệu SQLite trước khi bắt đầu. Thực hiện di chuyển trên môi trường staging trước khi áp dụng cho production.

*   **Rủi Ro:** Thời gian chết của ứng dụng (downtime).
    *   **Giải Pháp:** Lên kế hoạch di chuyển trong thời gian có ít người dùng truy cập. Sử dụng `pgloader` để giảm thiểu thời gian di chuyển dữ liệu.

*   **Rủi Ro:** Dữ liệu không tương thích (ví dụ: kiểu dữ liệu, JSON).
    *   **Giải Pháp:** `pgloader` xử lý tốt hầu hết các trường hợp. Nếu dùng kịch bản tùy chỉnh, hãy kiểm thử kỹ lưỡng việc chuyển đổi kiểu dữ liệu. Payload giúp giảm thiểu rủi ro này vì nó quản lý schema.

*   **Rủi Ro:** Các truy vấn đặc thù của SQLite bị lỗi trên PostgreSQL.
    *   **Giải Pháp:** Rà soát mã nguồn kỹ lưỡng ở [Mục 2](#2-phân-tích-schema-và-truy-vấn). Thay thế các hàm đặc thù bằng các hàm tương đương của PostgreSQL (ví dụ: `strftime` -> `to_char`).