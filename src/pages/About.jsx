import { TEAM, LEGAL, LINES } from '../data';
import { Reveal, useTitle } from '../lib.jsx';
import { Link } from 'react-router-dom';

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const FilePdfIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const MILESTONES = [
  { year: '2021', event: 'I.W. Group mulai beroperasi di wilayah Jabodetabek.' },
  { year: '2024', event: 'Ekspansi ke berbagai lini bisnis baru termasuk retail dan fesyen.' },
  { year: '2025', event: 'PT Intimart Elang Perkasa resmi berdiri (Mei 2025) dengan 3 brand utama.' },
];

export default function About() {
  useTitle('Tentang Kami');
  return (
    <>
      {/* Banner */}
      <img
        className="banner"
        src="/images/banner-retail.webp"
        alt=""
        width="1200"
        height="300"
      />

      {/* Intro */}
      <section className="wrap">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.2rem' }}>
            <div>
              <p className="eyebrow">Who We Are</p>
              <h1>Tentang Intimart Elang Perkasa</h1>
            </div>
            <a
              href="/docs/Company-Profile-PT-Intimart-Elang-Perkasa.pdf"
              download="Company-Profile-PT-Intimart-Elang-Perkasa.pdf"
              className="btn btn-red"
              style={{ gap: '.6rem' }}
              aria-label="Unduh Company Profile PT Intimart Elang Perkasa format PDF"
            >
              <DownloadIcon />
              <span>Unduh Company Profile (PDF)</span>
            </a>
          </div>
        </Reveal>
        <Reveal stag className="two" style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
            PT. Intimart Elang Perkasa merupakan salah satu bentuk visi dan komitmen I.W. Group
            yang fokus pada retail minimarket, ATK, fesyen, dan penyediaan bahan pangan utama
            bagi masyarakat.
          </p>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
            Perumusan visi, misi, dan mimpi perusahaan sudah dilakukan sejak lama dan dibentuk
            pada pertengahan 2025. Kami beroperasi di bawah brand <strong>Metamart</strong>,{' '}
            <strong>MetaGrow</strong>, dan <strong>MetaFashion</strong>.
          </p>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
            Sejak 2021, I.W. Group memiliki berbagai lini bisnis: migas, pengembangan properti,
            kecantikan, serta konsultasi keuangan & investasi, dengan ekspansi tiap tahun
            di wilayah Jabodetabek.
          </p>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Perjalanan Kami</p>
          <h2>Milestones</h2>
        </Reveal>
        <Reveal stag>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 39,
              top: 0, bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, var(--blue), var(--blue-l))',
              borderRadius: 2,
            }} aria-hidden="true" />
            {MILESTONES.map(({ year, event }) => (
              <div key={year} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 80,
                  height: 40,
                  background: 'var(--blue)',
                  color: '#fff',
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '.9rem',
                  flexShrink: 0,
                  boxShadow: '0 4px 16px rgba(11,74,173,.3)',
                  zIndex: 1,
                }}>
                  {year}
                </div>
                <div style={{
                  background: 'var(--soft)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '1rem 1.4rem',
                  flex: 1,
                  fontSize: '1rem',
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
                }}>
                  {event}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Visi & Misi */}
      <section className="blue curve">
        <div className="wrap" style={{ paddingTop: 'clamp(3rem,7vw,6rem)', paddingBottom: 'clamp(3rem,7vw,6rem)' }}>
          <div className="two">
            <Reveal>
              <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Visi</p>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginBottom: '1rem' }}>Menjadi mitra pilihan.</h2>
              <p style={{ color: 'rgba(255,255,255,.85)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Menjadi mitra pilihan untuk kebutuhan sehari-hari & bahan pangan untuk masyarakat
                desa hingga badan usaha.
              </p>
            </Reveal>
            <Reveal>
              <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Misi</p>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginBottom: '1rem' }}>Komitmen kami.</h2>
              <ol className="ol" style={{ color: 'rgba(255,255,255,.85)', lineHeight: 1.8, fontSize: '1rem' }}>
                <li>Memastikan pemilihan barang dari produsen utama dengan harga bermutu.</li>
                <li>Memberikan pelayanan penjualan yang terintegrasi dari awal hingga akhir.</li>
                <li>Memastikan harga yang terbaik dan bersaing.</li>
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brand Lines */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Brand Kami</p>
          <h2>Tiga Brand, Satu Grup</h2>
        </Reveal>
        <Reveal stag className="bento">
          {LINES.map((l) => (
            <Link key={l.slug} to={`/bisnis/${l.slug}`} className={`card line ${l.color}`}>
              <img className="lg" src={l.logo} alt={l.name} loading="lazy" />
              <h3>{l.name}</h3>
              <p className="muted">{l.tag}</p>
              <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>{l.desc}</p>
              <span className="more">Selengkapnya →</span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* Company Profile PDF Download Card */}
      <section className="wrap">
        <Reveal>
          <div className="compro-card">
            <div className="compro-card-info">
              <span className="compro-badge">
                <span aria-hidden="true" />
                Dokumen Resmi Perusahaan
              </span>
              <h3>Unduh Company Profile Lengkap</h3>
              <p>
                Dapatkan informasi resmi dan komprehensif mengenai profil PT Intimart Elang Perkasa,
                struktur I.W. Group, legalitas hukum, serta portofolio unit bisnis <strong>Metamart</strong>,{' '}
                <strong>MetaGrow</strong>, dan <strong>MetaFashion</strong> dalam format PDF siap cetak.
              </p>
              <div className="compro-specs">
                <span className="compro-spec-pill">
                  <FilePdfIcon /> Format PDF Resmi
                </span>
                <span className="compro-spec-pill">
                  ⚡ Ukuran: ~2.8 MB
                </span>
                <span className="compro-spec-pill">
                  📅 Edisi Resmi 2025/2026
                </span>
              </div>
            </div>

            <div className="compro-actions">
              <a
                href="/docs/Company-Profile-PT-Intimart-Elang-Perkasa.pdf"
                download="Company-Profile-PT-Intimart-Elang-Perkasa.pdf"
                className="btn btn-red btn-lg"
                style={{ gap: '.6rem' }}
                aria-label="Unduh Company Profile PT Intimart Elang Perkasa format PDF"
              >
                <DownloadIcon />
                <span>Unduh PDF Sekarang</span>
              </a>
              <a
                href="/docs/Company-Profile-PT-Intimart-Elang-Perkasa.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
                style={{ gap: '.5rem' }}
                aria-label="Buka Company Profile di tab browser baru"
              >
                <span>Buka di Tab Baru</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Team */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Meet the Team</p>
          <h2>Orang di balik Intimart</h2>
        </Reveal>
        <Reveal stag className="team">
          {TEAM.map((t) => (
            <figure className="person" key={t.img}>
              <div className="frame sq">
                <img
                  src={`/images/team-${t.img}.webp`}
                  alt={`Foto ${t.name}`}
                  loading="lazy"
                  width="300"
                  height="300"
                />
              </div>
              <figcaption>
                <b>{t.name}</b>
                <i>{t.role}</i>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      {/* Legal */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Legalitas</p>
          <h2>Resmi & Terdaftar</h2>
          <p className="muted" style={{ maxWidth: '56ch', lineHeight: 1.7 }}>
            Akta Pendirian Nomor 24 tanggal 19 Mei 2025, Notaris Anastasia Chandra, S.H., M.Kn.
          </p>
        </Reveal>
        <Reveal stag className="legal">
          {LEGAL.map((l, i) => (
            <div key={l.k} className={`seal s${i % 2}`}>
              <b>{l.k}</b>
              <span>{l.v}</span>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
