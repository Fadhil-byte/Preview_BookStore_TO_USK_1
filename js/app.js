const initialBooks = [
    {
        id: 1,
        judul: 'Laskar Pelangi',
        penulis: 'Andrea Hirata',
        penerbit: 'Bentang Pustaka',
        tahun: 2005,
        harga: 85000,
        kategori: 'Sastra & Fiksi',
        stok: 15,
        status: 'Tersedia'
    },
    {
        id: 2,
        judul: 'Bumi Manusia',
        penulis: 'Pramoedya Ananta Toer',
        penerbit: 'Hasta Mitra',
        tahun: 1980,
        harga: 95000,
        kategori: 'Sastra & Fiksi',
        stok: 10,
        status: 'Tersedia'
    },
    {
        id: 3,
        judul: 'Filosofi Teras',
        penulis: 'Henry Manampiring',
        penerbit: 'Kompas',
        tahun: 2018,
        harga: 98000,
        kategori: 'Pengembangan Diri',
        stok: 8,
        status: 'Tersedia'
    },
    {
        id: 4,
        judul: 'Pemrograman Web Modern dengan Laravel 12',
        penulis: 'Fadhil Danendra',
        penerbit: 'Informatika USK',
        tahun: 2026,
        harga: 120000,
        kategori: 'Sains & Teknologi',
        stok: 12,
        status: 'Tersedia'
    },
    {
        id: 5,
        judul: 'Algoritma & Struktur Data Tingkat Lanjut',
        penulis: 'Tim Dosen USK',
        penerbit: 'USK Press',
        tahun: 2024,
        harga: 110000,
        kategori: 'Sains & Teknologi',
        stok: 5,
        status: 'Tersedia'
    },
    {
        id: 6,
        judul: 'Manajemen Waktu & Produktivitas Belajar',
        penulis: 'Dr. Hendra Saputra',
        penerbit: 'Pustaka Mandiri',
        tahun: 2023,
        harga: 75000,
        kategori: 'Pengembangan Diri',
        stok: 0,
        status: 'Habis'
    }
];

let cartItems = [
    {
        id: 1,
        judul: 'Laskar Pelangi',
        harga: 85000,
        jumlah: 1
    },
    {
        id: 4,
        judul: 'Pemrograman Web Modern dengan Laravel 12',
        harga: 120000,
        jumlah: 2
    }
];

function formatRupiah(number) {
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

function updateNavCartBadge() {
    const totalCount = cartItems.reduce((acc, item) => acc + item.jumlah, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });
}

function addToCart(bookId) {
    const book = initialBooks.find(b => b.id === bookId);
    if (!book) return;
    if (book.stok <= 0) {
        showToast('Maaf, stok buku ini sedang habis.');
        return;
    }
    const existing = cartItems.find(item => item.id === bookId);
    if (existing) {
        existing.jumlah += 1;
    } else {
        cartItems.push({
            id: book.id,
            judul: book.judul,
            harga: book.harga,
            jumlah: 1
        });
    }
    updateNavCartBadge();
    showToast('"' + book.judul + '" berhasil ditambahkan ke keranjang!');
    if (document.getElementById('cart-table-body')) {
        renderCartTable();
    }
}

function filterCategory(category, element) {
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(p => p.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    const cards = document.querySelectorAll('.book-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchBooks(keyword) {
    const term = keyword.toLowerCase().trim();
    const cards = document.querySelectorAll('.book-card');
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const author = card.getAttribute('data-author').toLowerCase();
        if (title.includes(term) || author.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function switchAuthTab(targetTab) {
    const tabLogin = document.getElementById('tab-btn-login');
    const tabRegister = document.getElementById('tab-btn-register');
    const formLogin = document.getElementById('form-login-box');
    const formRegister = document.getElementById('form-register-box');
    const alertBox = document.getElementById('auth-alert');

    if (!tabLogin || !tabRegister || !formLogin || !formRegister) return;

    if (alertBox) {
        alertBox.style.display = 'none';
    }

    if (targetTab === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.style.display = 'block';
        formRegister.style.display = 'none';
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formLogin.style.display = 'none';
        formRegister.style.display = 'block';
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const alertBox = document.getElementById('auth-alert');
    if (!email) {
        if (alertBox) {
            alertBox.className = 'alert alert-danger';
            alertBox.textContent = 'Silakan masukkan alamat email dan password Anda.';
            alertBox.style.display = 'flex';
        }
        return;
    }
    if (alertBox) {
        alertBox.className = 'alert alert-success';
        alertBox.textContent = 'Login berhasil! Mengalihkan ke Halaman User...';
        alertBox.style.display = 'flex';
    }
    setTimeout(() => {
        window.location.href = 'user.html';
    }, 1000);
}

function handleRegisterSubmit(event) {
    event.preventDefault();
    const nama = document.getElementById('reg-nama').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const alertBox = document.getElementById('auth-alert');

    if (!email.endsWith('@gmail.com')) {
        if (alertBox) {
            alertBox.className = 'alert alert-danger';
            alertBox.textContent = 'Validasi Gagal: Pendaftaran akun wajib menggunakan alamat email dengan domain @gmail.com.';
            alertBox.style.display = 'flex';
        }
        return;
    }

    if (password.length < 8) {
        if (alertBox) {
            alertBox.className = 'alert alert-danger';
            alertBox.textContent = 'Validasi Gagal: Password minimal 8 karakter.';
            alertBox.style.display = 'flex';
        }
        return;
    }

    if (alertBox) {
        alertBox.className = 'alert alert-success';
        alertBox.textContent = 'Pendaftaran berhasil untuk ' + nama + '! Silakan beralih ke tab Masuk untuk login.';
        alertBox.style.display = 'flex';
    }

    setTimeout(() => {
        switchAuthTab('login');
        const loginEmail = document.getElementById('login-email');
        if (loginEmail) {
            loginEmail.value = email;
        }
    }, 1500);
}

function switchUserTab(tabName, element) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    const panes = document.querySelectorAll('.user-tab-pane');
    panes.forEach(pane => {
        pane.style.display = 'none';
    });
    const target = document.getElementById('tab-' + tabName);
    if (target) {
        target.style.display = 'block';
    }
}

function renderCartTable() {
    const tbody = document.getElementById('cart-table-body');
    const grandTotalEl = document.getElementById('cart-grand-total');
    if (!tbody || !grandTotalEl) return;

    tbody.innerHTML = '';
    let grandTotal = 0;

    if (cartItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:32px; color:var(--text-muted);">Keranjang belanja Anda masih kosong.</td></tr>';
        grandTotalEl.textContent = formatRupiah(0);
        return;
    }

    cartItems.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;
        grandTotal += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.judul}</strong></td>
            <td>${formatRupiah(item.harga)}</td>
            <td>
                <div style="display:flex; align-items:center; gap:8px;">
                    <button class="btn btn-secondary btn-sm" onclick="changeQuantity(${index}, -1)" style="padding:2px 8px;">-</button>
                    <span style="font-weight:700; min-width:20px; text-align:center;">${item.jumlah}</span>
                    <button class="btn btn-secondary btn-sm" onclick="changeQuantity(${index}, 1)" style="padding:2px 8px;">+</button>
                </div>
            </td>
            <td style="font-weight:700; color:var(--primary);">${formatRupiah(subtotal)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteCartItem(${index})" style="padding:4px 8px;">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    grandTotalEl.textContent = formatRupiah(grandTotal);
}

function changeQuantity(index, delta) {
    if (cartItems[index]) {
        cartItems[index].jumlah += delta;
        if (cartItems[index].jumlah <= 0) {
            cartItems.splice(index, 1);
        }
        renderCartTable();
        updateNavCartBadge();
    }
}

function deleteCartItem(index) {
    if (cartItems[index]) {
        showToast('"' + cartItems[index].judul + '" dihapus dari keranjang.');
        cartItems.splice(index, 1);
        renderCartTable();
        updateNavCartBadge();
    }
}

function simulateCheckout() {
    if (cartItems.length === 0) {
        showToast('Keranjang masih kosong!');
        return;
    }
    showToast('Checkout berhasil disimulasikan! Menuju daftar riwayat pesanan...');
    cartItems = [];
    renderCartTable();
    updateNavCartBadge();
    setTimeout(() => {
        const orderTabBtn = document.querySelector('[data-tab="pesanan"]');
        if (orderTabBtn) {
            orderTabBtn.click();
        }
    }, 1200);
}

function simulateUploadProof(orderId) {
    const row = document.getElementById('order-row-' + orderId);
    if (!row) return;
    const badge = row.querySelector('.status-badge');
    if (badge) {
        badge.className = 'status-badge badge-pending';
        badge.textContent = 'Menunggu Konfirmasi';
    }
    const actionCell = row.querySelector('.order-action');
    if (actionCell) {
        actionCell.innerHTML = '<span style="font-size:12px; color:var(--text-muted);">Bukti Diunggah</span>';
    }
    showToast('Bukti transfer pembayaran berhasil diunggah! Status: Menunggu Konfirmasi Admin.');
}

function simulateCancelOrder(orderId) {
    const row = document.getElementById('order-row-' + orderId);
    if (!row) return;
    const badge = row.querySelector('.status-badge');
    if (badge) {
        badge.className = 'status-badge badge-habis';
        badge.textContent = 'Dibatalkan';
    }
    const actionCell = row.querySelector('.order-action');
    if (actionCell) {
        actionCell.innerHTML = '<span style="font-size:12px; color:var(--danger); font-weight:600;">Pesanan Batal</span>';
    }
    showToast('Pesanan berhasil dibatalkan. Stok buku otomatis dikembalikan.');
}

function simulateContactMessage(event) {
    event.preventDefault();
    const subject = document.getElementById('msg-subject').value;
    showToast('Pesan "' + subject + '" berhasil dikirimkan ke administrator!');
    event.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavCartBadge();
    if (document.getElementById('cart-table-body')) {
        renderCartTable();
    }
});

