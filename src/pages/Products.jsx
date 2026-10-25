import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LINES, CONTACT, PRODUCTS } from '../data';
import { Reveal, waLink, useTitle } from '../lib.jsx';

// Search icon SVG
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const EmptyIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/>
  </svg>
);

// Product card component
function ProductCard({ item, onOrder }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <li className={`card prod-card ${item.l.color}`} key={item.l.slug + item.n}>
      {item.img && !imgErr ? (
        <div style={{ overflow: 'hidden', borderRadius: '16px 16px 0 0', flexShrink: 0 }}>
          <img
            className="prod-img"
            src={item.img}
            alt={item.n}
            loading="lazy"
            onError={() => setImgErr(true)}
            style={{ borderRadius: '16px 16px 0 0' }}
          />
        </div>
      ) : (
        <div style={{
          width: '100%',
          aspectRatio: '16/10',
          background: 'linear-gradient(135deg, var(--soft) 0%, var(--soft2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px 16px 0 0',
          flexShrink: 0,
        }}>
          <img src={item.l.logo} alt="" style={{ height: 40, width: 'auto', opacity: .4 }} />
        </div>
      )}
      <div className="prod-body">
        <span className={`tagc ${item.l.color}`}>{item.l.name}</span>
        <h3>{item.n}</h3>
        <p className="muted" style={{ fontSize: '.88rem' }}>{item.g}</p>
        <a
          className="btn btn-blue btn-sm"
          target="_blank"
          rel="noopener noreferrer"
          href={waLink(
            CONTACT.phones[0].wa,
            `Halo Intimart, saya ingin memesan/menanyakan: ${item.n} (${item.l.name}). Mohon info ketersediaan dan harganya.`
          )}
          style={{ marginTop: 'auto' }}
        >
          Pesan via WhatsApp
        </a>
      </div>
    </li>
  );
}

export default function Products() {
  useTitle('Produk');
  const [sp, setSp] = useSearchParams();
  const [search, setSearch] = useState('');

  const activeFilter = LINES.some((l) => l.slug === sp.get('lini')) ? sp.get('lini') : 'all';

  const filtered = useMemo(() => {
    let list = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter((i) => i.l.slug === activeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.n.toLowerCase().includes(q) ||
          i.g.toLowerCase().includes(q) ||
          i.l.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeFilter, search]);

  return (
    <>
      {/* Header */}
      <section className="wrap" style={{ paddingBottom: '1rem', paddingTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <div className="split top">
          <Reveal>
            <p className="eyebrow">Katalog Produk</p>
            <h1>Produk Kami</h1>
            <p className="lead">
              Pilih produk dari katalog 3 lini bisnis PT Intimart Elang Perkasa lalu pesan langsung lewat WhatsApp. Tim kami bantu cek ketersediaan stok, harga grosir, dan jadwal pengiriman.
            </p>
          </Reveal>

          {/* Responsive Visual Card in Products Hero */}
          <Reveal>
            <div style={{
              background: '#ffffff',
              border: '1.5px solid var(--border)',
              borderRadius: 24,
              padding: 'clamp(1.4rem, 3vw, 1.8rem)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
                <span style={{
                  background: 'var(--soft)',
                  color: 'var(--blue)',
                  fontWeight: 800,
                  fontSize: '.78rem',
                  padding: '.35rem .85rem',
                  borderRadius: 999,
                  textTransform: 'uppercase',
                  letterSpacing: '.04em',
                }}>
                  Pemesanan Cepat &amp; Mudah
                </span>
                <span style={{ fontSize: '.84rem', color: 'var(--blue)', fontWeight: 700 }}>
                  24+ Pilihan Produk
                </span>
              </div>

              <div>
                <b style={{ fontSize: '1.12rem', color: 'var(--ink)', display: 'block', marginBottom: '.3rem' }}>
                  Katalog Terpadu Multi-Lini
                </b>
                <p style={{ color: 'var(--muted)', fontSize: '.88rem', lineHeight: 1.55, margin: 0 }}>
                  Telur segar &amp; sembako dari <strong>MetaGrow</strong>, kebutuhan harian &amp; ATK dari <strong>Metamart</strong>, serta pakaian ex-import dari <strong>MetaFashion</strong>.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '.6rem',
                borderTop: '1px solid var(--border)',
                paddingTop: '.9rem',
                textAlign: 'center',
              }}>
                <div style={{ background: 'var(--soft)', borderRadius: 12, padding: '.6rem .4rem' }}>
                  <b style={{ color: 'var(--blue)', fontSize: '1rem', display: 'block' }}>Grosir</b>
                  <span style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 600 }}>&amp; Retail</span>
                </div>
                <div style={{ background: 'var(--soft)', borderRadius: 12, padding: '.6rem .4rem' }}>
                  <b style={{ color: 'var(--green-d)', fontSize: '1rem', display: 'block' }}>100%</b>
                  <span style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 600 }}>Mutu Terjamin</span>
                </div>
                <div style={{ background: 'var(--soft)', borderRadius: 12, padding: '.6rem .4rem' }}>
                  <b style={{ color: 'var(--red)', fontSize: '1rem', display: 'block' }}>Rutin</b>
                  <span style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 600 }}>Pengiriman</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Filter tabs */}
        <div className="tabs" role="group" aria-label="Filter lini bisnis" style={{ marginTop: '2rem' }}>
          {[{ slug: 'all', name: 'Semua Produk', logo: null }, ...LINES].map((l) => (
            <button
              key={l.slug}
              aria-pressed={activeFilter === l.slug}
              onClick={() => {
                setSp(l.slug === 'all' ? {} : { lini: l.slug });
                setSearch('');
              }}
            >
              {l.logo && <img src={l.logo} alt="" style={{ height: 18, width: 'auto' }} />}
              {l.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="search-wrap">
          <SearchIcon />
          <input
            type="search"
            className="search-input"
            placeholder="Cari produk... (contoh: telur, kemeja, beras)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari produk"
          />
        </div>

        {/* Count */}
        <p className="prod-count">
          Menampilkan <strong>{filtered.length}</strong> produk
          {search && ` untuk "${search}"`}
          {activeFilter !== 'all' && ` dari ${LINES.find(l => l.slug === activeFilter)?.name}`}
        </p>
      </section>

      {/* Product grid */}
      <section className="wrap" style={{ paddingTop: 0 }}>
        <ul className="prod" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {filtered.length > 0 ? (
            filtered.map((item) => <ProductCard key={item.l.slug + item.n} item={item} />)
          ) : (
            <li className="no-results">
              <EmptyIcon />
              <h3 style={{ color: 'var(--muted)', fontWeight: 700 }}>Produk tidak ditemukan</h3>
              <p>Coba kata kunci lain atau hubungi kami untuk pertanyaan stok khusus.</p>
              <a
                className="btn btn-blue"
                href={`https://wa.me/${CONTACT.phones[0].wa}?text=${encodeURIComponent(`Halo Intimart, saya mencari produk: ${search}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya via WhatsApp
              </a>
            </li>
          )}
        </ul>
      </section>

      {/* CTA */}
      <section className="wrap">
        <Reveal className="cta">
          <div>
            <h2>Butuh produk dalam jumlah besar?</h2>
            <p>Kami melayani pembelian grosir dan korporat untuk semua lini produk.</p>
          </div>
          <a
            href={`https://wa.me/${CONTACT.phones[0].wa}?text=${encodeURIComponent('Halo Intimart, saya ingin menanyakan pembelian grosir/korporat.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-blue btn-lg"
          >
            Hubungi Grosir
          </a>
        </Reveal>
      </section>
    </>
  );
}
