# Preview_BookStore_TO_USK_1

Repositori ini memuat berkas pratinjau antarmuka (frontend preview) mandiri berbasis HTML, CSS, dan JavaScript untuk sistem Toko Buku USK (Universitas Syiah Kuala).

## Halaman Pratinjau

1. **Home Page (`index.html`)**
   - Header navigasi dengan switcher halaman preview.
   - Hero banner dengan pencarian buku interaktif secara real-time.
   - Filter kategori buku (Sastra & Fiksi, Pengembangan Diri, Sains & Teknologi).
   - Katalog koleksi buku lengkap dengan status stok dan tombol tambah ke keranjang.

2. **Login & Registrasi (`auth.html`)**
   - Tab dinamis untuk beralih antara Masuk ke Akun dan Daftar Akun Baru.
   - Validasi email pendaftaran khusus domain `@gmail.com` dan panjang kata sandi minimal 8 karakter.
   - Notifikasi interaktif dan simulasi autentikasi.

3. **User Page (`user.html`)**
   - Kartu ringkasan statistik belanja pengguna aktif.
   - Tab Keranjang Belanja dengan kalkulasi otomatis jumlah eksemplar, subtotal, dan total pembayaran.
   - Tab Riwayat Transaksi dengan badge status pesanan, simulasi unggah bukti transfer, dan simulasi pembatalan pesanan.
   - Tab Contact Admin untuk simulasi pengiriman pertanyaan ke administrator.

## Struktur Direktori

```text
preview-website/
├── css/
│   └── style.css
├── js/
│   └── app.js
├── auth.html
├── index.html
├── README.md
└── user.html
```

## Cara Menjalankan

Seluruh halaman dibangun menggunakan standar web murni (Vanilla HTML, CSS, JavaScript) tanpa dependensi eksternal:
1. Klon repositori ini atau unduh sebagai berkas ZIP.
2. Buka berkas `index.html` langsung menggunakan peramban web pilihan Anda (Google Chrome, Mozilla Firefox, Microsoft Edge).
3. Gunakan navigasi pada bar bagian atas untuk berpindah antar halaman pratinjau.
