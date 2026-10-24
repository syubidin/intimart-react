import { Link, useParams } from 'react-router-dom';
import { LINES, CONTACT } from '../data';
import { NotFound } from '../components.jsx';
import { Reveal, waLink, useTitle } from '../lib.jsx';

export default function Business() {
  const { slug } = useParams();
  const line = LINES.find((l) => l.slug === slug);
  useTitle(line?.name);

  if (!line) return <NotFound />;

  return (
    <div key={slug}>
      {/* Tab navigation */}
      <section className="wrap" style={{ paddingBottom: 0 }}>
        <nav className="tabs" aria-label="Pilih lini bisnis">
          {LINES.map((l) => (
            <Link
              key={l.slug}
              to={`/bisnis/${l.slug}`}
              aria-current={l.slug === slug ? 'page' : undefined}
            >
              <img src={l.logo} alt="" style={{ height: 22, width: 'auto' }} />
              {l.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* Hero section */}
      <section className="wrap line-hero">
        <div className="split">
          <Reveal key={`hero-text-${slug}`}>
            <p className="eyebrow">{line.tag}</p>
            <h1>{line.name}</h1>
            <p className="lead">{line.desc}</p>
            <div className="row">
              <Link to={`/produk?lini=${line.slug}`} className="btn btn-blue btn-lg">
                Lihat Katalog Produk
              </Link>
              <Link
                to={`/mitra?minat=${line.slug === 'metagrow' ? 'metagrow-agen' : line.slug}`}
                className="btn btn-red btn-lg"
              >
                Jadi Mitra →
              </Link>
            </div>
            {line.agent && (
              <p style={{ marginTop: '1.2rem', fontSize: '.95rem', color: 'var(--green-d)', fontWeight: 600 }}>
                ✓ Program keagenan terbuka untuk wilayah Jabodetabek &amp; Purwakarta
              </p>
            )}
          </Reveal>
          <Reveal key={`hero-logo-${slug}`} className="logo-card">
            <img src={line.logo} alt={`Logo ${line.name}`} style={{ maxHeight: 150, width: 'auto', objectFit: 'contain' }} />
          </Reveal>
        </div>
      </section>

      {/* Product groups (Deep Blue Contained Curve) */}
      <section className="blue curve" style={{ margin: '2rem 0' }}>
        <div className="wrap" style={{ padding: 'clamp(4rem, 7vw, 6rem) 0' }}>
          <div className="split top">
            <Reveal key={`groups-${slug}`} stag>
              <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Produk &amp; Layanan</p>
              <h2 style={{ color: '#fff', marginBottom: '1.8rem' }}>Yang kami sediakan</h2>
              <div style={{ display: 'grid', gap: '1.8rem' }}>
                {line.groups.map((g) => (
                  <div key={g.title} className="group">
                    <h3 style={{ color: 'var(--yellow)', fontSize: '1.15rem', marginBottom: '.7rem', fontWeight: 700 }}>
                      {g.title}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '.55rem' }}>
                      {g.items.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '.7rem', color: '#ffffff', fontSize: '1.02rem', fontWeight: 500 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--yellow)', flexShrink: 0 }} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="small" style={{ color: 'rgba(255,255,255,.75)', marginTop: '1.8rem', fontSize: '.9rem' }}>
                Serta berbagai varian dan produk pilihan berkualitas lainnya.
              </p>
            </Reveal>

            <Reveal key={`photo-${slug}`}>
              <div className="frame" style={{ boxShadow: '0 24px 60px rgba(0,0,0,.35)' }}>
                <img src={line.photo} alt={`Foto produk ${line.name}`} loading="lazy" width="500" height="400" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap">
        <Reveal key={`cta-${slug}`} className="cta">
          <div>
            <h2>Tertarik bermitra dengan {line.name}?</h2>
            <p>Isi formulir singkat kemitraan atau diskusikan kebutuhan Anda bersama tim kami via WhatsApp.</p>
          </div>
          <div className="row">
            <Link to={`/mitra?minat=${line.slug === 'metagrow' ? 'metagrow-agen' : line.slug}`} className="btn btn-blue btn-lg">
              Daftar Mitra Sekarang
            </Link>
            <a
              href={waLink(CONTACT.phones[0].wa, `Halo Intimart, saya tertarik bermitra dengan ${line.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
            >
              Chat WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
