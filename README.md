# Preview_BookStore_TO_USK_1

Repositori ini memuat berkas pratinjau antarmuka (frontend preview) mandiri berbasis HTML, CSS, dan JavaScript murni yang 100% identik dengan sistem Toko Buku USK (Universitas Syiah Kuala).

## Halaman Pratinjau

1. **Landing Page (`index.html`)**
   - Header navigasi resmi BukuKita USK.
   - Hero banner dengan portal resmi toko buku dan tombol aksi.
   - Kartu ketentuan pemesanan dan ringkasan statistik (Buku, Kategori, Pembaca, Metode Bayar).
   - Diagram alur pemesanan buku (Langkah 1 s.d. 4).
   - Cuplikan kartu buku gaya Tokopedia dengan foto sampul buku asli, status stok, dan harga.
   - Pilihan kategori pembaca dan fitur keunggulan toko buku.

2. **Login & Registrasi (`auth.html`)**
   - Beralih dinamis antara formulir Masuk ke Akun dan Daftar Akun Baru.
   - Validasi email pendaftaran khusus domain `@gmail.com` dan kata sandi minimal 8 karakter.
   - Pilihan akun demo bawaan (`user@gmail.com` dan `admin@tokobuku.usk`).

3. **Halaman User / Pelanggan (`user.html`)**
   - Panel dashboard pelanggan dengan panduan berbelanja.
   - Katalog buku lengkap dengan pencarian real-time dan penambahan ke keranjang.
   - Keranjang belanja dinamis dengan kalkulasi kuantitas (+ / -), subtotal, dan total tagihan.
   - Riwayat pesanan dengan badge status transaksi, simulasi unggah ulang bukti transfer, dan pembatalan pesanan.
   - Fitur Contact Admin dua kolom (formulir pesan dan riwayat balasan admin).

4. **Halaman Admin / Pengelola (`admin.html`)**
   - Dashboard Administrator dengan banner sambutan, peringatan pesanan/pesan baru, 5 kartu statistik, dan panduan tugas.
   - Daftar Pesanan Masuk (Semua User) lengkap dengan filter pencarian, status bayar/pesanan, dan modal interaktif peninjauan bukti transfer asli beserta aksi verifikasi (Diproses, Dikirim, Selesai, Dibatalkan).
   - Formulir Tambah Buku Baru dan tabel kelola buku (Edit / Hapus).
   - Manajemen Master Kategori Buku.
   - Manajemen Data Pengguna (User).
   - Manajemen Pesan Masuk Pelanggan lengkap dengan formulir balasan resmi administrator.

## Struktur Direktori

```text
preview-website/
├── css/
│   └── style.css
├── js/
│   └── app.js
├── uploads/
│   ├── bukti/
│   └── buku/
├── admin.html
├── auth.html
├── index.html
├── README.md
└── user.html
```

## Cara Menjalankan

Seluruh halaman dibangun menggunakan standar web murni (Vanilla HTML, CSS, JavaScript) tanpa memerlukan server web backend (PHP/Laravel/Node.js):
1. Klon repositori ini atau unduh berkas ZIP.
2. Buka berkas `index.html` langsung melalui peramban web (Google Chrome, Microsoft Edge, Mozilla Firefox).
3. Gunakan bilah navigasi bagian atas untuk berpindah secara instan antara Landing Page, Login & Registrasi, Halaman User, dan Halaman Admin.
