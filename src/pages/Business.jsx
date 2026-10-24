import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import { LINES, CONTACT } from '../data';
import { NotFound } from '../components.jsx';
import { Reveal, waLink, reduced, useTitle } from '../lib.jsx';

const LINE_COLORS = {
  red: { accent: 'var(--red)', bg: '#fff5f5' },
  green: { accent: 'var(--green)', bg: '#f0fff5' },
  blue: { accent: 'var(--blue)', bg: '#f0f4ff' },
};

export default function Business() {
  const { slug } = useParams();
  const line = LINES.find((l) => l.slug === slug);
  useTitle(line?.name);

  if (!line) return <NotFound />;

  const colors = LINE_COLORS[line.color] || LINE_COLORS.blue;

  return (
    <>
      {/* Tab navigation */}
      <section className="wrap" style={{ paddingBottom: 0 }}>
        <nav className="tabs" aria-label="Pilih lini bisnis">
          {LINES.map((l) => (
            <Link
              key={l.slug}
              to={`/bisnis/${l.slug}`}
              aria-current={l.slug === slug ? 'page' : undefined}
            >
              <img src={l.logo} alt="" style={{ height: 20, width: 'auto' }} />
              {l.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* Hero section */}
      <section className="wrap line-hero">
        <div className="split">
          <Reveal>
            <p className="eyebrow">{line.tag}</p>
            <h1>{line.name}</h1>
            <p className="lead">{line.desc}</p>
            <div className="row">
              <Link to={`/produk?lini=${line.slug}`} className="btn btn-blue btn-lg">
                Lihat Produk
              </Link>
              <Link
                to={`/mitra?minat=${line.agent ? 'metagrow-agen' : line.slug}`}
                className="btn btn-red btn-lg"
              >
                Jadi Mitra
              </Link>
            </div>
            {line.agent && (
              <p style={{ marginTop: '1rem', fontSize: '.9rem', color: 'var(--muted)' }}>
                ✓ Program agen tersedia untuk wilayah Jabodetabek & Purwakarta
              </p>
            )}
          </Reveal>
          <Reveal className="logo-card">
            <img src={line.logo} alt={`Logo ${line.name}`} style={{ maxHeight: 140, width: 'auto' }} />
          </Reveal>
        </div>
      </section>

      {/* Product groups */}
      <section className="blue curve">
        <div className="wrap" style={{ paddingTop: 'clamp(3rem,7vw,6rem)', paddingBottom: 'clamp(3rem,7vw,6rem)' }}>
          <div className="split">
            <Reveal stag>
              <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Produk & Layanan</p>
              <h2 style={{ color: '#fff', marginBottom: '2rem' }}>Yang kami sediakan</h2>
              {line.groups.map((g) => (
                <div key={g.title} className="group">
                  <h3 style={{ color: 'var(--yellow)', fontSize: '1.1rem', marginBottom: '.6rem' }}>{g.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '.5rem' }}>
                    {g.items.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', color: 'rgba(255,255,255,.9)', fontSize: '1rem' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)', flexShrink: 0 }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="small" style={{ color: 'rgba(255,255,255,.55)', marginTop: '1.5rem' }}>dan produk pilihan lainnya.</p>
            </Reveal>
            <Reveal>
              <div className="frame">
                <img src={line.photo} alt={`Foto produk ${line.name}`} loading="lazy" width="500" height="400" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap">
        <Reveal className="cta">
          <div>
            <h2>Tertarik bermitra dengan {line.name}?</h2>
            <p>Isi formulir singkat dan tim kami akan menghubungi Anda via WhatsApp.</p>
          </div>
          <div className="row">
            <Link to={`/mitra?minat=${line.agent ? 'metagrow-agen' : line.slug}`} className="btn btn-blue btn-lg">
              Daftar Mitra
            </Link>
            <a
              href={waLink(CONTACT.phones[0].wa, `Halo Intimart, saya tertarik bermitra dengan ${line.name}.`)}
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
