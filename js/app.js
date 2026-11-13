const initialBooksData = [
    {
        id: 1,
        judul: 'Laskar Pelangi',
        penulis: 'Andrea Hirata',
        penerbit: 'Bentang Pustaka',
        tahun: 2005,
        harga: 85000,
        stok: 15,
        kategori_id: 2,
        kategori: 'Sastra & Fiksi',
        gambar: 'uploads/buku/1793927570_6aed2992d996d.jfif'
    },
    {
        id: 2,
        judul: 'Bumi Manusia',
        penulis: 'Pramoedya Ananta Toer',
        penerbit: 'Hasta Mitra',
        tahun: 1980,
        harga: 95000,
        stok: 10,
        kategori_id: 2,
        kategori: 'Sastra & Fiksi',
        gambar: 'uploads/buku/1793936379_6aed4bfbbd6fd.jpg'
    },
    {
        id: 3,
        judul: 'Filosofi Teras',
        penulis: 'Henry Manampiring',
        penerbit: 'Kompas',
        tahun: 2018,
        harga: 98000,
        stok: 8,
        kategori_id: 3,
        kategori: 'Pengembangan Diri',
        gambar: 'uploads/buku/1793936414_6aed4c1e99c5a.jfif'
    },
    {
        id: 4,
        judul: 'Pemrograman Web Modern dengan Laravel 12',
        penulis: 'Fadhil Danendra',
        penerbit: 'Informatika USK',
        tahun: 2026,
        harga: 120000,
        stok: 12,
        kategori_id: 1,
        kategori: 'Sains & Teknologi',
        gambar: 'uploads/buku/1793936453_6aed4c4584484.jfif'
    },
    {
        id: 5,
        judul: 'Algoritma & Struktur Data Tingkat Lanjut',
        penulis: 'Tim Dosen USK',
        penerbit: 'USK Press',
        tahun: 2024,
        harga: 110000,
        stok: 5,
        kategori_id: 1,
        kategori: 'Sains & Teknologi',
        gambar: 'uploads/buku/1793936988_6aed4e5c73d10.jfif'
    },
    {
        id: 6,
        judul: 'Manajemen Waktu & Produktivitas Belajar',
        penulis: 'Dr. Hendra Saputra',
        penerbit: 'Pustaka Mandiri',
        tahun: 2023,
        harga: 75000,
        stok: 0,
        kategori_id: 3,
        kategori: 'Pengembangan Diri',
        gambar: 'uploads/buku/1793952934_6aed8ca687f01.png'
    }
];

let cartState = [
    { id: 1, judul: 'Laskar Pelangi', harga: 85000, jumlah: 1, gambar: 'uploads/buku/1793927570_6aed2992d996d.jfif' },
    { id: 4, judul: 'Pemrograman Web Modern dengan Laravel 12', harga: 120000, jumlah: 2, gambar: 'uploads/buku/1793936453_6aed4c4584484.jfif' }
];

function formatRupiah(number) {
    return 'Rp ' + Number(number).toLocaleString('id-ID');
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
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

function updateNavCartBadge() {
    const totalCount = cartState.reduce((acc, item) => acc + item.jumlah, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
        b.textContent = totalCount;
        b.style.display = totalCount > 0 ? 'inline-block' : 'none';
    });
}

function addToCart(bookId) {
    const book = initialBooksData.find(b => b.id === bookId);
    if (!book) return;
    if (book.stok <= 0) {
        showToast('Maaf, stok buku ini sedang habis.');
        return;
    }
    const found = cartState.find(item => item.id === bookId);
    if (found) {
        found.jumlah += 1;
    } else {
        cartState.push({
            id: book.id,
            judul: book.judul,
            harga: book.harga,
            jumlah: 1,
            gambar: book.gambar
        });
    }
    updateNavCartBadge();
    showToast('Buku "' + book.judul + '" berhasil ditambahkan ke keranjang!');
    renderCartTable();
}

function renderCartTable() {
    const tbody = document.getElementById('cart-table-body');
    const grandTotalEl = document.getElementById('cart-grand-total');
    if (!tbody || !grandTotalEl) return;

    tbody.innerHTML = '';
    let grandTotal = 0;

    if (cartState.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 36px; color: var(--text-muted);">Keranjang belanja Anda saat ini masih kosong.</td></tr>';
        grandTotalEl.textContent = formatRupiah(0);
        return;
    }

    cartState.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;
        grandTotal += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${item.gambar}" alt="${item.judul}" style="width: 48px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                    <div>
                        <strong style="font-size: 14px; color: var(--text-main); display: block;">${item.judul}</strong>
                        <span style="font-size: 12px; color: var(--text-muted);">${formatRupiah(item.harga)} per unit</span>
                    </div>
                </div>
            </td>
            <td>${formatRupiah(item.harga)}</td>
            <td>
                <div style="display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 4px 8px; background: #ffffff;">
                    <button type="button" onclick="changeQuantity(${index}, -1)" style="background:none; border:none; cursor:pointer; font-weight:700; font-size:14px; width:20px;">-</button>
                    <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.jumlah}</span>
                    <button type="button" onclick="changeQuantity(${index}, 1)" style="background:none; border:none; cursor:pointer; font-weight:700; font-size:14px; width:20px;">+</button>
                </div>
            </td>
            <td><strong style="color: var(--primary); font-size: 14px;">${formatRupiah(subtotal)}</strong></td>
            <td>
                <button type="button" class="btn btn-secondary btn-sm" onclick="removeCartItem(${index})" style="color: var(--danger);">
                    Hapus
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    grandTotalEl.textContent = formatRupiah(grandTotal);
}

function changeQuantity(index, delta) {
    if (cartState[index]) {
        cartState[index].jumlah += delta;
        if (cartState[index].jumlah <= 0) {
            cartState.splice(index, 1);
        }
        renderCartTable();
        updateNavCartBadge();
    }
}

function removeCartItem(index) {
    if (cartState[index]) {
        showToast('"' + cartState[index].judul + '" dihapus dari keranjang.');
        cartState.splice(index, 1);
        renderCartTable();
        updateNavCartBadge();
    }
}

function simulateCheckout() {
    if (cartState.length === 0) {
        showToast('Keranjang belanja masih kosong!');
        return;
    }
    showToast('Checkout berhasil disimulasikan! Kode Pesanan baru: USK-20261113-007.');
    cartState = [];
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
    const badge = row.querySelector('.order-status-badge');
    if (badge) {
        badge.className = 'status-badge badge-warning order-status-badge';
        badge.textContent = 'Menunggu Konfirmasi';
    }
    const actionCell = row.querySelector('.order-action');
    if (actionCell) {
        actionCell.innerHTML = '<span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Bukti Terverifikasi Menunggu</span>';
    }
    showToast('Bukti transfer pembayaran berhasil diunggah! Status: Menunggu Konfirmasi Administrator.');
}

function simulateCancelOrder(orderId) {
    const row = document.getElementById('order-row-' + orderId);
    if (!row) return;
    const badge = row.querySelector('.order-status-badge');
    if (badge) {
        badge.className = 'status-badge badge-secondary order-status-badge';
        badge.textContent = 'Dibatalkan';
    }
    const actionCell = row.querySelector('.order-action');
    if (actionCell) {
        actionCell.innerHTML = '<span style="font-size: 12px; color: var(--danger); font-weight: 600;">Pesanan Batal</span>';
    }
    showToast('Pesanan berhasil dibatalkan. Stok buku otomatis dikembalikan ke katalog.');
}

function filterCatalog(categoryId, element) {
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    const cards = document.querySelectorAll('.tokopedia-card');
    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (categoryId === 'all' || cat == categoryId) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchCatalog(keyword) {
    const term = keyword.toLowerCase().trim();
    const cards = document.querySelectorAll('.tokopedia-card');
    cards.forEach(card => {
        const title = (card.getAttribute('data-title') || '').toLowerCase();
        const author = (card.getAttribute('data-author') || '').toLowerCase();
        if (title.includes(term) || author.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function switchTab(containerId, tabName, buttonElement) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const navButtons = container.querySelectorAll('.tab-btn, .filter-pill, .nav-sub-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    const panes = container.querySelectorAll('.tab-pane');
    panes.forEach(p => p.classList.remove('active'));

    const targetPane = document.getElementById(tabName);
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

function switchAuthTab(type) {
    const tabLogin = document.getElementById('auth-tab-login');
    const tabRegist = document.getElementById('auth-tab-regist');
    const boxLogin = document.getElementById('box-login');
    const boxRegist = document.getElementById('box-regist');
    const alertBox = document.getElementById('auth-alert');

    if (!tabLogin || !tabRegist || !boxLogin || !boxRegist) return;
    if (alertBox) alertBox.style.display = 'none';

    if (type === 'login') {
        tabLogin.classList.add('active');
        tabRegist.classList.remove('active');
        boxLogin.style.display = 'block';
        boxRegist.style.display = 'none';
    } else {
        tabRegist.classList.add('active');
        tabLogin.classList.remove('active');
        boxLogin.style.display = 'none';
        boxRegist.style.display = 'block';
    }
}

function handleLoginDemo(e) {
    e.preventDefault();
    const email = document.getElementById('input-email').value.trim();
    const alertBox = document.getElementById('auth-alert');
    if (!email) return;

    if (alertBox) {
        alertBox.className = 'alert alert-success';
        alertBox.style.display = 'flex';
        if (email.includes('admin')) {
            alertBox.textContent = 'Login berhasil sebagai Administrator Toko Buku! Mengalihkan ke Halaman Admin...';
            setTimeout(() => { window.location.href = 'admin.html'; }, 1000);
        } else {
            alertBox.textContent = 'Login berhasil sebagai Pelanggan Toko Buku! Mengalihkan ke Halaman User...';
            setTimeout(() => { window.location.href = 'user.html'; }, 1000);
        }
    }
}

function handleRegistDemo(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const alertBox = document.getElementById('auth-alert');

    if (!email.endsWith('@gmail.com')) {
        if (alertBox) {
            alertBox.className = 'alert alert-danger';
            alertBox.textContent = 'Validasi Gagal: Pendaftaran akun wajib menggunakan alamat email berdomain @gmail.com.';
            alertBox.style.display = 'flex';
        }
        return;
    }

    if (alertBox) {
        alertBox.className = 'alert alert-success';
        alertBox.textContent = 'Registrasi berhasil! Silakan beralih ke formulir Masuk untuk login.';
        alertBox.style.display = 'flex';
    }

    setTimeout(() => {
        switchAuthTab('login');
        const loginInput = document.getElementById('input-email');
        if (loginInput) loginInput.value = email;
    }, 1500);
}

function openOrderModal(orderCode, user, items, total, status, proofImg) {
    const modal = document.getElementById('orderModal');
    if (!modal) return;
    document.getElementById('modal-order-code').textContent = orderCode;
    document.getElementById('modal-order-user').textContent = user;
    document.getElementById('modal-order-items').textContent = items;
    document.getElementById('modal-order-total').textContent = total;
    document.getElementById('modal-order-status').textContent = status;
    const imgEl = document.getElementById('modal-order-proof');
    if (imgEl && proofImg) {
        imgEl.src = proofImg;
        imgEl.style.display = 'block';
    }
    modal.classList.add('active');
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) modal.classList.remove('active');
}

function adminUpdateOrderStatus(orderId, newStatus) {
    const row = document.getElementById('admin-order-' + orderId);
    if (row) {
        const badge = row.querySelector('.admin-status-pesanan');
        if (badge) {
            badge.textContent = newStatus;
            if (newStatus === 'Diproses') badge.className = 'status-badge badge-warning admin-status-pesanan';
            else if (newStatus === 'Dikirim') badge.className = 'status-badge badge-info admin-status-pesanan';
            else if (newStatus === 'Selesai') badge.className = 'status-badge badge-success admin-status-pesanan';
            else badge.className = 'status-badge badge-secondary admin-status-pesanan';
        }
        const payBadge = row.querySelector('.admin-status-bayar');
        if (payBadge && (newStatus === 'Diproses' || newStatus === 'Dikirim' || newStatus === 'Selesai')) {
            payBadge.className = 'status-badge badge-success admin-status-bayar';
            payBadge.textContent = 'Sudah Bayar';
        }
    }
    closeOrderModal();
    showToast('Status pesanan #' + orderId + ' berhasil diperbarui menjadi "' + newStatus + '"!');
}

function simulateAdminReply(e, pesanId) {
    e.preventDefault();
    const textarea = document.getElementById('reply-text-' + pesanId);
    if (!textarea) return;
    showToast('Balasan pesan berhasil dikirimkan kepada pelanggan!');
    const badge = document.getElementById('pesan-status-' + pesanId);
    if (badge) {
        badge.className = 'status-badge badge-success';
        badge.textContent = 'Sudah Dibalas';
    }
    textarea.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavCartBadge();
    renderCartTable();
});
