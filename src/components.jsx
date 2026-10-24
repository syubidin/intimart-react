import { useEffect, useRef, useState, Suspense } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { CONTACT, LINES, SOCIAL } from './data';
import { reduced } from './lib.jsx';

export const Wordmark = ({ small }) => (
  <span className={`wm${small ? ' sm' : ''}`}><b>Intimart</b><i>Elang Perkasa</i></span>
);

const NAV = [
  ['/', 'Beranda'],
  ['/tentang', 'Tentang'],
  ['/bisnis/metamart', 'Lini Bisnis'],
  ['/produk', 'Produk'],
  ['/lokasi', 'Lokasi'],
  ['/kontak', 'Kontak'],
];

// Floating WhatsApp button
function WAFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  const wa = CONTACT.phones[0];
  return (
    <div className="wa-float" aria-label="Chat WhatsApp">
      <span className="wa-float-label">Chat WhatsApp</span>
      <a
        className="wa-float-btn"
        href={`https://wa.me/${wa.wa}?text=${encodeURIComponent('Halo Intimart Elang Perkasa, saya ingin bertanya.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

// Scroll progress bar
function ScrollBar() {
  const bar = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const prog = total > 0 ? window.scrollY / total : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${prog})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-bar" ref={bar} aria-hidden="true" />;
}

export function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const main = useRef(null);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    if (!reduced() && main.current) {
      animate(main.current, { opacity: [0, 1], translateY: [16, 0], duration: 550, ease: 'outQuad' });
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <ScrollBar />
      <a className="skip" href="#isi">Lewati ke konten</a>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav-in">
          <Link to="/" className="brand" aria-label="Beranda Intimart Elang Perkasa">
            <Wordmark small />
          </Link>
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(!open)}
          >
            <span className="sr">Menu</span>
            <i /><i /><i />
          </button>
          <nav id="menu" className={`links${open ? ' open' : ''}`} aria-label="Utama">
            {NAV.map(([to, t]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive || (to.startsWith('/bisnis') && pathname.startsWith('/bisnis')) ? 'active' : ''
                }
              >
                {t}
              </NavLink>
            ))}
            <Link to="/mitra" className="btn btn-red">Jadi Mitra</Link>
          </nav>
        </div>
      </header>
      <main id="isi" ref={main}>
        <Suspense fallback={<div className="wrap" style={{ minHeight: '60vh' }} aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WAFloat />
    </>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div>
          <Wordmark />
          <p className="muted-w">Kami hadir untuk bersinergi melengkapi kebutuhan masyarakat & usaha Anda. Bagian dari I.W. Group.</p>
          <div className="foot-logos">
            {LINES.map((l) => (
              <Link key={l.slug} to={`/bisnis/${l.slug}`} aria-label={l.name}>
                <img src={l.logo} alt={l.name} loading="lazy" height="32" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3>Kantor Utama</h3>
          <p>{CONTACT.address}</p>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        </div>
        <div>
          <h3>Hubungi Kami</h3>
          {CONTACT.phones.map((p) => (
            <p key={p.wa}>
              <b style={{ color: 'rgba(255,255,255,.9)', display: 'block', marginBottom: '.1rem' }}>{p.area}</b>
              <a href={`tel:+${p.wa}`}>{p.display}</a>
            </p>
          ))}
          {SOCIAL.instagram && (
            <p><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></p>
          )}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
            <Link to="/mitra" className="btn btn-yellow btn-sm">Jadi Mitra</Link>
            <Link to="/kontak" className="btn btn-ghost-w btn-sm">Hubungi Kami</Link>
          </div>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} PT Intimart Elang Perkasa · I.W. Group · Semua hak dilindungi.</p>
    </footer>
  );
}

export const NotFound = () => (
  <section className="not-found wrap">
    <div className="num" aria-hidden="true">404</div>
    <h1>Halaman tidak ditemukan</h1>
    <p style={{ color: 'var(--muted)', maxWidth: '40ch', textAlign: 'center' }}>
      Halaman yang Anda cari tidak ada atau sudah dipindahkan.
    </p>
    <Link className="btn btn-blue btn-lg" to="/">← Kembali ke Beranda</Link>
  </section>
);
