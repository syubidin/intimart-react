// Semua konten situs ada di sini. Edit file ini untuk mengubah teks, kontak, toko, dll.
export const CONTACT = {
  email: 'ptintimartelangperkasa@gmail.com',
  address: 'Ruko Citragrand CBD Blok ER02/07, Jatirangga - Jatisampurna, Kota Bekasi - Jawa Barat',
  phones: [
    { area: 'Jabodetabek', display: '+62 857-8848-5400', wa: '6285788485400' },
    { area: 'Purwakarta', display: '+62 877-8598-8724', wa: '6287785988724' },
  ],
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8774!2d106.9906!3d-6.4036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699f3b7b!2sJatirangga%2C+Jatisampurna%2C+Kota+Bekasi!5e0!3m2!1sid!2sid!4v1699000000000!5m2!1sid!2sid',
  mapsLink: 'https://maps.google.com/?q=Ruko+Citragrand+CBD+Jatirangga+Jatisampurna+Bekasi',
};
export const SOCIAL = { instagram: '' }; // isi mis. 'https://instagram.com/akun_anda'

// Foto produk dari Unsplash (format webp via CDN)
const PROD_PHOTOS = {
  // Metamart - Kebutuhan sehari-hari
  'Personal Care': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&fm=webp&q=80',
  'Alat & cairan kebersihan rumah': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&fm=webp&q=80',
  'Bumbu keperluan dapur': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&fm=webp&q=80',
  'Makanan instan': 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&fm=webp&q=80',
  'Minuman kemasan': '/images/minuman-kemasan.webp',
  'Snacks': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&fm=webp&q=80',
  // Metamart - ATK
  'Tas': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&fm=webp&q=80',
  'Perlengkapan alat tulis': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&fm=webp&q=80',
  'Alat menggambar & mewarnai': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&fm=webp&q=80',
  'Perlengkapan kantor': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&fm=webp&q=80',
  'Buku cerita': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&fm=webp&q=80',
  'Pernak-pernik': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&fm=webp&q=80',
  'Mainan anak-anak': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&fm=webp&q=80',
  // MetaGrow
  'Beras Super SLYP': '/images/beras-slyp.webp',
  'Telur Ayam berkualitas (Khas Blitar)': 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=600&fm=webp&q=80',
  'Telur Puyuh berkualitas': 'https://images.unsplash.com/photo-1582655299221-2b6bff351df0?w=600&fm=webp&q=80',
  'Susu UHT': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&fm=webp&q=80',
  // MetaFashion
  'Atasan Kemeja Pria & Wanita': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&fm=webp&q=80',
  'Casual T-shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&fm=webp&q=80',
  'Blus Wanita': 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&fm=webp&q=80',
  'Dress Wanita': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&fm=webp&q=80',
  'Pakaian Olahraga Pria & Wanita': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&fm=webp&q=80',
  'Jaket': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&fm=webp&q=80',
  'Aksesoris': 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&fm=webp&q=80',
};

export const LINES = [
  {
    slug: 'metamart', name: 'Metamart', tag: 'Minimarket & ATK', color: 'red',
    logo: '/images/logo-metamart.webp', photo: '/images/photo-atk.webp',
    desc: 'Fokus pada bidang minimarket, retail, dan grosir barang kebutuhan sehari-hari serta kebutuhan sekolah dan kantor.',
    groups: [
      { title: 'Kebutuhan sehari-hari', items: ['Personal Care', 'Alat & cairan kebersihan rumah', 'Bumbu keperluan dapur', 'Makanan instan', 'Minuman kemasan', 'Snacks'] },
      { title: 'Kebutuhan ATK & sekolah', items: ['Tas', 'Perlengkapan alat tulis', 'Alat menggambar & mewarnai', 'Perlengkapan kantor', 'Buku cerita'] },
      { title: 'Kebutuhan lainnya', items: ['Pernak-pernik', 'Mainan anak-anak'] },
    ],
  },
  {
    slug: 'metagrow', name: 'MetaGrow', tag: 'Supplier Kebutuhan Sembako', color: 'green',
    logo: '/images/logo-metagrow.webp', photo: '/images/photo-telur.webp',
    desc: 'Fokus pada penyediaan bahan pangan pokok (sembako) secara retail dan grosir. Saat ini hadir di Purwakarta, Depok, Bekasi, dan Cikarang.',
    groups: [{ title: 'Produk yang kami sediakan', items: ['Beras Super SLYP', 'Telur Ayam berkualitas (Khas Blitar)', 'Telur Puyuh berkualitas', 'Susu UHT'] }],
    agent: true,
  },
  {
    slug: 'metafashion', name: 'MetaFashion', tag: 'Fesyen', color: 'fashion',
    logo: '/images/logo-metafashion.webp', photo: '/images/photo-fashion.webp',
    desc: 'Menyediakan pilihan pakaian ex-import berkualitas dan aksesoris pelengkap pilihan.',
    groups: [{ title: 'Produk yang kami sediakan', items: ['Atasan Kemeja Pria & Wanita', 'Casual T-shirt', 'Blus Wanita', 'Dress Wanita', 'Pakaian Olahraga Pria & Wanita', 'Jaket', 'Aksesoris'] }],
  },
];

// Build flat product list with photos
export const PRODUCTS = LINES.flatMap((l) =>
  l.groups.flatMap((g) =>
    g.items.map((n) => ({
      n,
      g: g.title,
      l,
      img: PROD_PHOTOS[n] || null,
    }))
  )
);

export const TEAM = [
  { name: 'Aditya Saputra', role: 'Pembina', img: 'aditya' },
  { name: 'Angela Wijanarko', role: 'Direktur', img: 'angela' },
  { name: 'Vira Julestica', role: 'Direktur Pelaksana', img: 'vira' },
  { name: 'Gilang Prawira', role: 'Head of Sales', img: 'gilang' },
  { name: 'Bagus Maulana', role: 'Ops & Purchasing Manager', img: 'bagus' },
];

export const LEGAL = [
  { k: 'NIB', v: '2605250051712' },
  { k: 'KBLI', v: '47111, 47611, 47711, 47739' },
  { k: 'AHU', v: '0040506.AH.01.01. Tahun 2025' },
  { k: 'HaKI Metamart', v: 'IDM001374365' },
];

export const PARTNERS = [
  { name: 'PT. Intiperta Elang Perkasa', type: 'Retailer', tag: 'Mitra Retail' },
  { name: 'PT. Haidar Aditama Perdana', type: 'Retailer', tag: 'Mitra Retail' },
  { name: 'PT. Intihuma Elang Perkasa', type: 'Property Development', tag: 'Properti & Kawasan' },
  { name: 'PT. Intimedcos Elang Perkasa', type: 'Cosmetics & Health', tag: 'Kesehatan & Kosmetik' },
  { name: 'PT. Intivesta Elang Perkasa', type: 'Investment & Finance', tag: 'Investasi & Bisnis' },
  { name: 'Dapur Atlet Ragunan', type: 'Jakarta Selatan', tag: 'Dapur Institusi' },
  { name: 'Dapur SPPG', type: 'Kota Depok', tag: 'Dapur Institusi' },
  { name: 'Dapur SPPG', type: 'Kab. Purwakarta', tag: 'Dapur Institusi' },
  { name: 'Koperasi Merah Putih', type: 'Bekasi & Cibubur', tag: 'Koperasi Karyawan' },
  { name: 'Gendhis Catering', type: 'Katering Komersial', tag: 'Kuliner & Horeka' },
  { name: 'Pasar Parung Bogor', type: 'Sentra Sembako', tag: 'Distribusi Pangan' },
];

export const AREAS = ['Purwakarta', 'Depok', 'Bekasi', 'Cikarang'];

// ISI DI SINI: daftar toko & cabang. Contoh format:
// { name: 'Metamart Jatirangga', line: 'Metamart', address: 'Jl. ...', hours: '08.00 - 21.00', wa: '62812xxxx', maps: 'https://maps.google.com/?q=...' }
export const STORES = [];
