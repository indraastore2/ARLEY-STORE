/* === FITUR ANTI-INSPECT/DEVTOOLS === */

// 1. Menonaktifkan F12 dan beberapa tombol umum lainnya
document.onkeydown = function(e) {
    // F12 key check
    if(e.keyCode == 123) {
        return false;
    }
    // Ctrl+Shift+I (Inspect Element)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // Ctrl+Shift+J (Console)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    // Ctrl+U (View Source)
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
    // Command+Option+I (Mac Inspect Element)
    if(e.metaKey && e.altKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
}

// 2. Menonaktifkan Klik Kanan (Context Menu)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

/* === AKHIR FITUR ANTI-INSPECT/DEVTOOLS === */

document.addEventListener('DOMContentLoaded', () => {
    // ... sisa kode website Anda
});

// ... di dalam document.addEventListener('DOMContentLoaded', () => { ...

// 3. Logika Anti-Debug (Membuat browser 'Freeze' saat DevTools dibuka)
const antiDebug = () => {
    // Fungsi ini dipanggil berkali-kali dalam interval waktu
    const checkDevTools = () => {
        // Jika DevTools terbuka, eksekusi akan berhenti di sini
        // dan memaksa pengguna untuk menutup DevTools
        debugger; 
    };

    // Panggil checkDevTools setiap 500 milidetik (0.5 detik)
    setInterval(checkDevTools, 500); 
};

// Panggil fungsi antiDebug untuk mengaktifkan perlindungan
antiDebug();

/* === FITUR ANTI-INSPECT DAN REFRESH BERKELANJUTAN === */

// 1. Fungsi Utama Deteksi DevTools
const antiDevTools = () => {
    // Fungsi ini mencoba mendeteksi pembukaan DevTools dengan menjebak 'debugger'
    // Jika DevTools terbuka, eksekusi akan berhenti di 'debugger;'
    debugger; 
};

// 2. Skrip Pemeriksaan (Berjalan terus menerus)
const checkAndLoop = () => {
    try {
        // Panggil fungsi deteksi
        antiDevTools();
        
    } catch (e) {
        // Jika kode mencapai blok 'catch', berarti DevTools mungkin sedang dibuka
        // atau skrip diblokir/dimanipulasi. 
        
        // 📢 TINDAKAN: Paksakan Refresh (Infinite Loop)
        window.location.reload(true); 
    }
};

// 3. Menjalankan Pengecekan secara berkala
// Set interval yang sangat pendek (misal, 50 milidetik)
setInterval(checkAndLoop, 50);

// 4. Mencegah Klik Kanan (Anti-Tindakan Umum)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 5. Mencegah Shortcut Keyboard (F12, Ctrl+Shift+I, dll.)
document.onkeydown = function(e) {
    // F12 key check (123)
    if(e.keyCode == 123) {
        return false;
    }
    // Ctrl+Shift+I
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // Ctrl+U (View Source)
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

/* === AKHIR FITUR ANTI-INSPECT === */

document.addEventListener('DOMContentLoaded', () => {
    // ... sisa kode website Anda
});

// ... sisa kode website Anda (variabel, fungsi, renderJokiList, dll.)

document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA JOKI LENGKAP
    // Harga diubah menjadi NUMBER untuk perhitungan
    const allJokiItems = [
        { category: "level", name: "Sea 1 (100 Level)", price: 8000 },
        { category: "level", name: "Sea 2 (100 Level)", price: 9000, note: "Lvl > 1.000, bonus $50M!" },
        { category: "level", name: "Sea 3 (100 Level)", price: 10000, note: "Lvl > 1.000, bonus $50M!"}, 
        { category: "mastery", name: "100 Mastery Gun", price: 12000 },
        { category: "mastery", name: "100 Mastery Sword", price: 8000 },
        { category: "mastery", name: "100 Mastery Fighting Style", price: 5000 },
        { category: "mastery", name: "100 Mastery Fruit", price: 10000 },
        { category: "sword", name: "Yama", price: 9000 },
        { category: "sword", name: "Midnight Blade", price: 5000 },
        { category: "sword", name: "Cdk Full Quest", price: 45000 },
        { category: "sword", name: "Tushita", price: 10000 },
        { category: "sword", name: "Rengoku", price: 7000 },
        { category: "fighting", name: "Super Human", price: 10000 },
        { category: "fighting", name: "Electric Claw", price: 6000 },
        { category: "fighting", name: "Sanguine Art", price: 25000 },
        { category: "fighting", name: "Dragon Talon", price: 7000 },
        { category: "fighting", name: "Godhuman", price: 12000 }
    ];

    const jokiListContainer = document.getElementById('joki-list');
    
    // Variabel Global untuk Keranjang
    let cart = [];

    // 📢 PERHATIAN: Pastikan ID ini ada di file index.html Anda
    const modal = document.getElementById('cartModal');
    const openCartBtn = document.getElementById('openCartBtn');
    const closeButton = modal ? modal.querySelector('.close-button') : null; // Cek null safety
    const cartCountElement = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalElement = document.getElementById('cartTotal');
    const emptyMessage = document.getElementById('emptyCartMessage');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const paymentMethodSelect = document.getElementById('paymentMethod');

    // Cek Keberadaan Elemen Kunci (Debugging)
    if (!jokiListContainer) {
        console.error("Elemen 'joki-list' tidak ditemukan. Gagal merender.");
        return; 
    }
    if (!modal) {
        console.error("Elemen 'cartModal' tidak ditemukan. Fitur keranjang dinonaktifkan.");
    }
    
    // -----------------------------------------------------------
    // FUNGSI UTILITY & KERANJANG
    // -----------------------------------------------------------

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const calculateTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

    const removeItemFromCart = (index) => {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    const updateCartDisplay = () => {
        if (!modal) return; // Nonaktif jika modal tidak ada

        const total = calculateTotal();
        cartCountElement.textContent = cart.length;
        cartTotalElement.textContent = formatRupiah(total);
        
        if (cart.length === 0) {
            cartItemsList.innerHTML = '';
            emptyMessage.style.display = 'block';
            checkoutBtn.disabled = true;
        } else {
            emptyMessage.style.display = 'none';
            checkoutBtn.disabled = false;
            cartItemsList.innerHTML = cart.map((item, index) => `
                <div class="cart-item-row">
                    <span>${item.name}</span>
                    <span style="font-weight: bold; color: #ccc;">${formatRupiah(item.price)}</span>
                    <button class="remove-item-btn" data-index="${index}" style="background: none; border: none; color: #e63946; cursor: pointer;">&times;</button>
                </div>
            `).join('');

            // Re-attach listener untuk tombol hapus
            document.querySelectorAll('.remove-item-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    removeItemFromCart(index);
                });
            });
        }
    };

    const addItemToCart = (item) => {
        cart.push(item);
        updateCartDisplay();
        alert(`${item.name} ditambahkan ke keranjang!`);
        if (modal) {
             modal.style.display = "block"; // Langsung buka modal
        }
    };

    // -----------------------------------------------------------
    // LOGIKA RENDER JOKI LIST
    // -----------------------------------------------------------

    const getCategoryTitle = (categoryId) => {
        switch (categoryId) {
            case 'level': return 'Joki Level';
            case 'mastery': return 'Joki Mastery';
            case 'sword': return 'Joki Sword';
            case 'fighting': return 'Joki Fighting Style';
            default: return 'Layanan Joki';
        }
    };

    const groupItemsByCategory = (items) => {
        return items.reduce((acc, item) => {
            const categoryId = item.category;
            if (!acc[categoryId]) {
                acc[categoryId] = {
                    title: getCategoryTitle(categoryId),
                    items: []
                };
            }
            acc[categoryId].items.push(item);
            return acc;
        }, {});
    };

    const renderJokiList = (itemsToRender) => {
        jokiListContainer.innerHTML = '';
        const groupedItems = groupItemsByCategory(itemsToRender);
        let allCardsHtml = '';

        for (const categoryId in groupedItems) {
            const categoryData = groupedItems[categoryId];
            let cardBodyHtml = '';

            categoryData.items.forEach(item => {
                const displayPrice = formatRupiah(item.price);

                // 📢 KOREKSI: Mengganti tombol order agar lebih bersih dari styling inline
                cardBodyHtml += `
                    <div class="joki-item">
                        <div>
                            <span class="item-name">${item.name}</span>
                            ${item.note ? `<span class="item-note">(${item.note})</span>` : ''}
                        </div>
                        <span class="item-price">${displayPrice}</span>
                        
                        <button class="add-to-cart-btn order-btn" 
                                data-name="${item.name}" 
                                data-price="${item.price}" 
                                data-category="${item.category}">
                            Order </i>
                        </button>
                    </div>
                `;
            });

            allCardsHtml += `
                <div class="joki-card">
                    <div class="card-header">${categoryData.title}</div>
                    <div class="card-body">
                        ${cardBodyHtml}
                    </div>
                </div>
            `;
        }
        
        jokiListContainer.innerHTML = allCardsHtml;
        
        // Attach listener ke semua tombol "Order" setelah rendering selesai
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const name = e.currentTarget.dataset.name;
                const price = parseInt(e.currentTarget.dataset.price);
                const category = e.currentTarget.dataset.category;

                addItemToCart({ name, price, category });
            });
        });
    };

    // -----------------------------------------------------------
    // LOGIKA MODAL DAN CHECKOUT (Hanya dijalankan jika modal ada)
    // -----------------------------------------------------------
    
    if (modal) {
        // Buka Modal
        openCartBtn.onclick = () => {
            modal.style.display = "block";
            updateCartDisplay();
        }

        // Tutup Modal
        if (closeButton) {
            closeButton.onclick = () => {
                modal.style.display = "none";
            }
        }

        // Tutup Modal jika klik di luar area
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        // Checkout via WhatsApp
        checkoutBtn.onclick = () => {
            if (cart.length === 0) return;

            const total = calculateTotal();
            const paymentMethod = paymentMethodSelect.value;
            let message = `Halo Lexka.store, saya ingin order jasa joki. Berikut detail pesanan saya:\n\n`;

            cart.forEach((item, index) => {
                message += `${index + 1}. ${item.name} - ${formatRupiah(item.price)}\n`;
            });

            message += `\nTotal Harga: ${formatRupiah(total)}`;
            message += `\nMetode Pembayaran Pilihan: ${paymentMethod}`;
            message += `\n\nMohon diproses, terima kasih!`;

            const whatsappLink = `https://wa.me/6288212289046?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        };
    }
    
    // -----------------------------------------------------------
    // 📢 INISIALISASI UTAMA (Selalu harus di bagian akhir)
    // -----------------------------------------------------------
    renderJokiList(allJokiItems);
});