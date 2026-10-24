import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import { LINES, PARTNERS, AREAS, CONTACT } from '../data';
import { Reveal, Count, reduced, useTitle, useParallax } from '../lib.jsx';

const STATS = [
  { val: 3, label: 'Lini bisnis unggulan', suffix: '' },
  { val: AREAS.length, label: 'Wilayah layanan MetaGrow', suffix: '' },
  { val: 2025, label: 'PT resmi didirikan', suffix: '' },
  { val: 2021, label: 'I.W. Group beroperasi', suffix: '' },
];

const BuildingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
    <path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" />
    <path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
  </svg>
);

export default function Home() {
  useTitle('');
  useParallax();
  const hero = useRef(null);

  useEffect(() => {
    const root = hero.current;
    if (!root) return;
    const words = root.querySelectorAll('.w');
    if (reduced()) {
      words.forEach((w) => (w.style.opacity = '1'));
      root.querySelectorAll('.fade').forEach((e) => (e.style.opacity = '1'));
      return;
    }
    animate(words, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      ease: 'outExpo',
      delay: stagger(90, { start: 100 }),
    });
    animate(root.querySelectorAll('.fade'), {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 900,
      ease: 'outExpo',
      delay: stagger(120, { start: 400 }),
    });
    // Floating chips micro-animation
    animate(root.querySelectorAll('.chip'), {
      translateY: [-6, 6],
      duration: 3200,
      ease: 'inOutSine',
      alternate: true,
      loop: true,
      delay: stagger(400),
    });
  }, []);

  return (
    <>
      {/* ===== HERO (Matching Company Profile Cover) ===== */}
      <section className="hero" ref={hero}>
        <div className="hero-bg-orb orb1" data-parallax="0.08" aria-hidden="true" />
        <div className="hero-bg-orb orb2" data-parallax="-0.08" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div>
            {/* Main title from Company Profile */}
            <h1 className="hero-company-name">
              <span className="w">Intimart</span>{' '}
              <span className="w accent-word">Elang Perkasa</span>
            </h1>

            <p className="lead fade">
              Mitra pilihan untuk kebutuhan sehari-hari &amp; bahan pangan untuk masyarakat desa
              hingga badan usaha. Beroperasi di bawah brand <strong>Metamart</strong>,{' '}
              <strong>MetaGrow</strong>, dan <strong>MetaFashion</strong>.
            </p>

            <div className="row fade">
              <Link to="/produk" className="btn btn-blue btn-lg">Lihat Produk</Link>
              <Link to="/mitra" className="btn btn-red btn-lg">Jadi Mitra →</Link>
            </div>
          </div>

          {/* 3 Brand Chips with logos */}
          <div className="cluster fade" data-parallax="0.05" aria-label="Brand Intimart Elang Perkasa">
            {LINES.map((l) => (
              <Link
                to={`/bisnis/${l.slug}`}
                className="chip"
                key={l.slug}
                aria-label={`Buka lini ${l.name}`}
              >
                <img className="chip-img" src={l.logo} alt={l.name} loading="eager" />
                <div className="chip-text">
                  <b>{l.name}</b>
                  <span>{l.tag}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS (Large Count-up Numbers) ===== */}
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
          <h2>Tiga brand, satu komitmen bersinergi.</h2>
          <p className="lead">
            Setiap lini bisnis dirancang untuk melayani segmen kebutuhan yang berbeda dengan standar mutu tinggi dan harga bersaing.
          </p>
        </Reveal>
        <Reveal stag className="bento">
          {LINES.map((l) => (
            <Link key={l.slug} to={`/bisnis/${l.slug}`} className={`card line ${l.color}`}>
              <img className="lg" src={l.logo} alt={l.name} loading="lazy" />
              <h3>{l.name}</h3>
              <p className="muted">{l.tag}</p>
              <p style={{ fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.6 }}>{l.desc}</p>
              <span className="more">Pelajari Selengkapnya →</span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ===== SIAPA KAMI (Contained Blue Section) ===== */}
      <section className="blue curve" style={{ margin: '2rem 0' }}>
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>
              Siapa Kami
            </p>
            <h2 style={{ color: '#fff' }}>Dibangun dengan visi dan komitmen nyata.</h2>
            <p style={{ color: 'rgba(255,255,255,.88)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              PT Intimart Elang Perkasa adalah salah satu bentuk visi dan komitmen kami, I.W. Group,
              yang berfokus pada retail minimarket, ATK, fesyen, dan penyediaan bahan pangan utama bagi masyarakat.
            </p>
            <p style={{ color: 'rgba(255,255,255,.78)', lineHeight: 1.8, marginTop: '1rem', fontSize: '.98rem' }}>
              Perumusan visi, misi, dan mimpi-mimpi perusahaan ini sudah dilakukan sejak lama dan dibentuk
              pada pertengahan tahun 2025, kami beroperasi di bawah brand Metamart, MetaGrow, dan MetaFashion.
            </p>
            <div className="row" style={{ marginTop: '2rem' }}>
              <Link to="/tentang" className="btn btn-yellow btn-lg">Kenali Kami Lebih Dekat</Link>
              <Link to="/kontak" className="btn btn-ghost-w btn-lg">Hubungi Kantor</Link>
            </div>
          </Reveal>
          <Reveal className="frame" data-parallax="-0.04">
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

      {/* ===== MITRA & KLIEN (List Partner Cards) ===== */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Our Partners &amp; Clients</p>
          <h2>Dipercaya bisnis, retailer, dan dapur komunitas.</h2>
          <p className="lead">
            Jaringan kemitraan terpercaya yang telah tumbuh bersama PT Intimart Elang Perkasa di berbagai sektor.
          </p>
        </Reveal>
        <Reveal stag className="partners-grid">
          {PARTNERS.map((p) => (
            <div className="partner-card" key={p.name}>
              <div className="partner-badge" aria-hidden="true">
                <BuildingIcon />
              </div>
              <div className="partner-info">
                <b>{p.name}</b>
                <span>
                  <span className="partner-tag">{p.tag}</span>
                  {p.type}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ===== CTA MITRA ===== */}
      <section className="wrap" style={{ marginTop: '2rem' }}>
        <Reveal className="cta">
          <div>
            <h2>Ingin menjadi mitra kami?</h2>
            <p>
              Bergabunglah sebagai agen atau mitra MetaGrow, Metamart, MetaFashion, dan program
              kerja sama lainnya. Tim kami siap merespons cepat lewat WhatsApp.
            </p>
          </div>
          <div className="row" style={{ gap: '1rem' }}>
            <Link to="/mitra" className="btn btn-blue btn-lg">Daftar Mitra Sekarang →</Link>
            <a
              href={`https://wa.me/${CONTACT.phones[0].wa}?text=${encodeURIComponent('Halo Intimart, saya tertarik menjadi mitra.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
            >
              Chat WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
