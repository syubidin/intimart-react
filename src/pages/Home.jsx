import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import { LINES, PARTNERS, AREAS, CONTACT } from '../data';
import { Reveal, Count, reduced, waLink, useTitle } from '../lib.jsx';

const HEAD = 'Mitra pilihan untuk kebutuhan sehari-hari & bahan pangan'.split(' ');

const STATS = [
  { val: 3, label: 'Lini bisnis unggulan', suffix: '' },
  { val: AREAS.length, label: 'Wilayah layanan MetaGrow', suffix: '' },
  { val: 2025, label: 'PT resmi didirikan', suffix: '' },
  { val: 2021, label: 'I.W. Group beroperasi', suffix: '' },
];

export default function Home() {
  useTitle('');
  const hero = useRef(null);

  useEffect(() => {
    const root = hero.current;
    if (!root) return;
    const words = root.querySelectorAll('.w');
    if (reduced()) {
      words.forEach((w) => (w.style.opacity = 1));
      root.querySelectorAll('.fade').forEach((e) => (e.style.opacity = 1));
      return;
    }
    animate(words, {
      opacity: [0, 1],
      translateY: [60, 0],
      rotate: [3, 0],
      duration: 1100,
      ease: 'outExpo',
      delay: stagger(65, { start: 100 }),
    });
    animate(root.querySelectorAll('.fade'), {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 1000,
      ease: 'outExpo',
      delay: stagger(130, { start: 650 }),
    });
    // Chip float animation
    animate(root.querySelectorAll('.chip'), {
      translateY: [-8, 8],
      duration: 3400,
      ease: 'inOutSine',
      alternate: true,
      loop: true,
      delay: stagger(500),
    });
    // Parallax orbs on scroll
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--sy', Math.min(window.scrollY, 800));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" ref={hero}>
        <div className="hero-bg-orb orb1" aria-hidden="true" />
        <div className="hero-bg-orb orb2" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div>
            <div className="hero-badge fade">
              <span aria-hidden="true" />
              PT Intimart Elang Perkasa · I.W. Group
            </div>
            <h1 aria-label={HEAD.join(' ')}>
              {HEAD.map((w, i) => (
                <span className="w" key={i} aria-hidden="true">{w}&nbsp;</span>
              ))}
            </h1>
            <p className="lead fade">
              Dari masyarakat desa hingga badan usaha, kami menyediakan minimarket & ATK,
              sembako, dan fesyen pilihan dengan harga bermutu dan bersaing.
            </p>
            <div className="row fade">
              <Link to="/mitra" className="btn btn-red btn-lg">Jadi Mitra →</Link>
              <Link to="/produk" className="btn btn-ghost btn-lg">Lihat Produk</Link>
            </div>
          </div>
          <div className="cluster fade" aria-hidden="true">
            {LINES.map((l) => (
              <div className="chip" key={l.slug}>
                <img className="chip-img" src={l.logo} alt="" loading="eager" />
                <div className="chip-text">
                  <b>{l.name}</b>
                  {l.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats wrap">
        <Reveal stag className="stat-row">
          {STATS.map(({ val, label, suffix }) => (
            <div className="stat-item" key={label}>
              <b><Count to={val} suffix={suffix} /></b>
              <span>{label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ===== LINI BISNIS ===== */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Lini Bisnis Kami</p>
          <h2>Tiga brand, satu komitmen.</h2>
          <p className="lead">Setiap brand dirancang untuk melayani segmen kebutuhan yang berbeda namun saling melengkapi.</p>
        </Reveal>
        <Reveal stag className="bento">
          {LINES.map((l) => (
            <Link key={l.slug} to={`/bisnis/${l.slug}`} className={`card line ${l.color}`}>
              <img className="lg" src={l.logo} alt={l.name} loading="lazy" />
              <h3>{l.name}</h3>
              <p className="muted">{l.tag}</p>
              <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>{l.desc}</p>
              <span className="more">Selengkapnya →</span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ===== SIAPA KAMI ===== */}
      <section className="blue curve">
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>
              <span style={{ background: 'var(--yellow)', width: 24, height: 2, display: 'inline-block', borderRadius: 2 }} />
              Siapa Kami
            </p>
            <h2 style={{ color: '#fff' }}>Dibangun dengan visi dan komitmen nyata.</h2>
            <p style={{ color: 'rgba(255,255,255,.82)', lineHeight: 1.8 }}>
              PT Intimart Elang Perkasa adalah wujud visi I.W. Group yang berfokus pada retail
              minimarket, ATK, fesyen, dan penyediaan bahan pangan utama bagi masyarakat.
              Dibentuk pertengahan 2025 dan beroperasi di bawah brand Metamart, MetaGrow, dan MetaFashion.
            </p>
            <div className="row" style={{ marginTop: '1.5rem' }}>
              <Link to="/tentang" className="btn btn-yellow">Kenali Kami</Link>
              <Link to="/kontak" className="btn btn-ghost-w">Hubungi Kami</Link>
            </div>
          </Reveal>
          <Reveal className="frame">
            <img
              src="/images/photo-basket.webp"
              alt="Keranjang belanja berisi sayur dan kebutuhan harian"
              loading="lazy"
              width="436"
              height="344"
            />
          </Reveal>
        </div>
      </section>

      {/* ===== MITRA & KLIEN ===== */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Mitra & Klien</p>
          <h2>Dipercaya bisnis dan dapur komunitas.</h2>
        </Reveal>
      </section>
      <div className="marquee" aria-label="Daftar mitra dan klien">
        <ul className="track">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <li key={i} aria-hidden={i >= PARTNERS.length}>{p}</li>
          ))}
        </ul>
      </div>

      {/* ===== CTA MITRA ===== */}
      <section className="wrap">
        <Reveal className="cta">
          <div>
            <h2>Ingin menjadi mitra kami?</h2>
            <p>
              Bergabunglah sebagai agen atau mitra MetaGrow, Metamart, MetaFashion, dan program
              kerja sama lainnya. Tim kami siap balas lewat WhatsApp.
            </p>
          </div>
          <div className="row" style={{ gap: '1rem' }}>
            <Link to="/mitra" className="btn btn-blue btn-lg">Daftar Mitra →</Link>
            <a
              href={`https://wa.me/${CONTACT.phones[0].wa}?text=${encodeURIComponent('Halo Intimart, saya tertarik menjadi mitra.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Chat WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
