import { CONTACT, STORES, AREAS } from '../data';
import { Reveal, waLink, useTitle } from '../lib.jsx';

const mapsSearch = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Embed URL untuk kantor pusat (Jatirangga, Jatisampurna, Bekasi)
const OFFICE_MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4!2d106.9879!3d-6.4065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699f394a8d9f!2sJatirangga%2C+Jatisampurna%2C+Kota+Bekasi!5e0!3m2!1sid!2sid!4v1699000000000!5m2!1sid!2sid`;

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function Locations() {
  useTitle('Lokasi Toko & Cabang');

  return (
    <>
      {/* Hero with Visual Card */}
      <section className="wrap" style={{ paddingBottom: '2rem', paddingTop: 'clamp(2.5rem, 6vw, 4rem)' }}>
        <div className="split top">
          <Reveal>
            <p className="eyebrow">Temukan Kami</p>
            <h1>Lokasi Kantor &amp; Cabang</h1>
            <p className="lead">
              Kunjungi kantor pusat kami di Kota Bekasi atau pantau titik distribusi dan jangkauan logistik MetaGrow di Jabodetabek &amp; Purwakarta.
            </p>
            <div className="row">
              <a href={CONTACT.mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-lg">
                Petunjuk Arah Maps →
              </a>
              <a
                href={waLink(CONTACT.phones[0].wa, 'Halo Intimart, saya ingin bertanya lokasi kantor atau toko.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
              >
                Chat WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kantor Utama + Peta */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Peta Terintegrasi</p>
          <h2>Kantor Utama</h2>
        </Reveal>
        <div className="loc-grid" style={{ marginTop: '1.5rem' }}>
          <Reveal className="office-card">
            <div>
              <h3>PT Intimart Elang Perkasa - Head Office</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.7rem', color: 'rgba(255,255,255,.85)' }}>
                <MapPinIcon />
                <span style={{ fontSize: '.9rem' }}>{CONTACT.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', color: 'rgba(255,255,255,.85)' }}>
                <MailIcon />
                <a href={`mailto:${CONTACT.email}`} style={{ color: '#fff', fontSize: '.9rem' }}>{CONTACT.email}</a>
              </div>
              {CONTACT.phones.map((p) => (
                <div key={p.wa} style={{ display: 'flex', alignItems: 'center', gap: '.7rem', color: 'rgba(255,255,255,.85)' }}>
                  <PhoneIcon />
                  <span style={{ fontSize: '.9rem' }}>
                    <b style={{ color: 'rgba(255,255,255,.6)', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.04em', display: 'block' }}>{p.area}</b>
                    <a href={`tel:+${p.wa}`} style={{ color: '#fff' }}>{p.display}</a>
                  </span>
                </div>
              ))}
            </div>
            <div className="row">
              <a
                className="btn btn-yellow"
                href={CONTACT.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka di Google Maps
              </a>
              <a
                className="btn btn-ghost-w"
                href={waLink(CONTACT.phones[0].wa, 'Halo Intimart, saya ingin mengetahui lokasi kantor Anda.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya via WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="map-embed">
              <iframe
                src={OFFICE_MAPS_EMBED}
                title="Peta lokasi kantor PT Intimart Elang Perkasa, Jatirangga Bekasi"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wilayah Layanan MetaGrow (Contained Blue Curve) */}
      <section className="blue curve" style={{ margin: '3rem 0' }}>
        <div className="wrap" style={{ padding: 'clamp(4rem, 7vw, 6rem) 0' }}>
          <Reveal>
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Jangkauan Layanan</p>
            <h2 style={{ color: '#fff' }}>Wilayah Layanan MetaGrow</h2>
            <p style={{ color: 'rgba(255,255,255,.85)', maxWidth: '56ch', marginBottom: '1.8rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              MetaGrow hadir melayani kebutuhan sembako grosir &amp; retail di wilayah-wilayah berikut.
              Hubungi kami untuk informasi jadwal pengiriman dan pasokan ke daerah Anda.
            </p>
          </Reveal>
          <Reveal stag as="ul" className="areas">
            {AREAS.map((a) => <li key={a}>{a}</li>)}
          </Reveal>
          <Reveal>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={waLink(CONTACT.phones[0].wa, 'Halo MetaGrow, saya ingin menanyakan ketersediaan layanan pengiriman di wilayah saya.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow btn-lg"
              >
                Cek Layanan Pengiriman Wilayah Saya
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Toko & Cabang */}
      <section className="wrap">
        <Reveal>
          <p className="eyebrow">Ekspansi Bisnis</p>
          <h2>Toko &amp; Cabang</h2>
          <p className="lead">
            {STORES.length
              ? 'Kunjungi toko kami di lokasi terdekat.'
              : 'Sedang dalam tahap persiapan pembukaan cabang baru. Ikuti terus informasi terkini dari kami.'}
          </p>
        </Reveal>
        {STORES.length > 0 && (
          <Reveal stag className="bento">
            {STORES.map((s) => (
              <div key={s.name} className="card">
                <span className="tagc">{s.line}</span>
                <h3>{s.name}</h3>
                <p className="muted">{s.address}</p>
                <p className="small">Buka: {s.hours}</p>
                <div className="row" style={{ marginTop: 'auto' }}>
                  {s.maps && (
                    <a
                      className="btn btn-blue"
                      href={s.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Peta
                    </a>
                  )}
                  {s.wa && (
                    <a
                      className="btn btn-ghost"
                      href={waLink(s.wa, `Halo ${s.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        )}
      </section>
    </>
  );
}
