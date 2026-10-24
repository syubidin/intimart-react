import { useState } from 'react';
import { CONTACT } from '../data';
import { Reveal, Field, waLink, useTitle } from '../lib.jsx';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', website: '' };

// Icon components
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const WAIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Contact() {
  useTitle('Hubungi Kami');
  const [v, setV] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [st, setSt] = useState({ s: 'idle', m: '' });
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (v.name.trim().length < 2) er.name = 'Nama minimal 2 karakter.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) er.email = 'Format email tidak valid.';
    if (v.message.trim().length < 10) er.message = 'Pesan minimal 10 karakter.';
    setErr(er);
    if (Object.keys(er).length) return;
    setSt({ s: 'sending', m: '' });
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || 'Pesan gagal dikirim.');
      setSt({ s: 'ok', m: 'Terima kasih! Pesan Anda sudah terkirim ke tim kami.' });
      setV(EMPTY);
    } catch (x) {
      setSt({ s: 'err', m: x.message });
    }
  };

  const fe = (k) => ({
    'aria-invalid': !!err[k],
    'aria-describedby': err[k] ? `${k}-err` : undefined,
  });

  return (
    <>
      {/* Hero Strip with Page 15 Theme */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-d) 0%, var(--blue) 100%)',
        padding: 'clamp(3.5rem,7vw,5.5rem) 0 clamp(4.5rem,10vw,7.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: '-5%', top: '-20%',
          width: '50%', aspectRatio: '1',
          background: 'radial-gradient(circle, rgba(251,191,15,.2), transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} aria-hidden="true" />

        <div className="wrap">
          <div className="split top">
            <Reveal>
              <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Hubungi Kami</p>
              <h1 style={{ color: '#fff', maxWidth: '14ch' }}>Ada pertanyaan? Kami siap membantu.</h1>
              <p style={{ color: 'rgba(255,255,255,.88)', maxWidth: '50ch', marginTop: '1rem', fontSize: '1.15rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                "Kami Hadir untuk Bersinergi Melengkapi Kebutuhan Masyarakat &amp; Usaha Anda."
              </p>
              <p style={{ color: 'rgba(255,255,255,.75)', maxWidth: '50ch', marginTop: '.6rem', fontSize: '.95rem', paddingBottom: '.8rem' }}>
                Kirim pesan via formulir di bawah atau hubungi hotline WhatsApp kami langsung untuk respons instan.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.15)', paddingTop: '.8rem', fontSize: '.82rem', color: 'rgba(255,255,255,.7)' }}>
                Jam Operasional: Senin – Sabtu, 08.00 – 17.00 WIB
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="wrap split top" style={{ marginTop: 'clamp(-2rem,-5vw,-3rem)', paddingBottom: '5rem' }}>
        {/* Info panel with High Contrast Cards */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div className="contact-info-item">
              <div className="contact-icon" aria-hidden="true"><MapPinIcon /></div>
              <div>
                <b>Kantor Utama</b>
                <p>{CONTACT.address}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon" aria-hidden="true"><MailIcon /></div>
              <div>
                <b>Email Resmi</b>
                <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              </div>
            </div>

            {CONTACT.phones.map((p) => (
              <div key={p.wa} className="contact-info-item">
                <div className="contact-icon" aria-hidden="true"><WAIcon /></div>
                <div>
                  <b>Hotline WhatsApp ({p.area})</b>
                  <p>
                    <a
                      href={waLink(p.wa, 'Halo Intimart Elang Perkasa, saya ingin bertanya.')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.display}
                    </a>
                  </p>
                </div>
              </div>
            ))}

            {/* Quick WA buttons */}
            <div style={{ marginTop: '.8rem', display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
              <p style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                Topik Cepat via WhatsApp
              </p>
              {[
                { label: 'Pertanyaan Produk & Katalog', msg: 'Halo Intimart, saya ingin menanyakan produk.' },
                { label: 'Informasi Program Kemitraan', msg: 'Halo Intimart, saya ingin tahu lebih lanjut tentang program kemitraan.' },
                { label: 'Pemesanan Sembako / Grosir', msg: 'Halo Intimart, saya ingin menanyakan pembelian grosir sembako.' },
              ].map(({ label, msg }) => (
                <a
                  key={label}
                  href={waLink(CONTACT.phones[0].wa, msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.8rem',
                    padding: '.85rem 1.25rem',
                    background: '#fff',
                    borderRadius: 14,
                    border: '1.5px solid var(--border)',
                    fontSize: '.92rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform .2s, border-color .2s, box-shadow .2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--blue)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <span style={{ color: 'var(--green-d)', fontSize: '1.2rem', display: 'flex' }} aria-hidden="true"><WAIcon /></span>
                  {label}
                  <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: '.85rem' }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Contact form */}
        <Reveal>
          <form
            className="form card"
            onSubmit={submit}
            noValidate
            style={{ boxShadow: 'var(--shadow-xl)', border: '1.5px solid var(--border)', background: '#fff' }}
          >
            <div style={{ marginBottom: '.8rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>Kirim Pesan Email</h2>
              <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                Formulir ini langsung terkirim ke inbox resmi tim PT Intimart Elang Perkasa.
              </p>
            </div>

            {st.s === 'ok' && (
              <div style={{
                background: '#edfff3',
                border: '1px solid #8ce2a6',
                borderRadius: 12,
                padding: '1rem',
                color: 'var(--green-d)',
                fontWeight: 600,
                fontSize: '.95rem',
              }} role="status">
                ✓ {st.m}
              </div>
            )}
            {st.s === 'err' && (
              <div style={{
                background: '#fff0ef',
                border: '1px solid #fca5a5',
                borderRadius: 12,
                padding: '1rem',
                color: 'var(--red)',
                fontWeight: 600,
                fontSize: '.95rem',
              }} role="alert">
                ✕ {st.m}
              </div>
            )}

            <Field id="name" label="Nama lengkap *" error={err.name}>
              <input
                id="name"
                value={v.name}
                onChange={set('name')}
                placeholder="Nama Anda atau perusahaan"
                autoComplete="name"
                required
                {...fe('name')}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <Field id="email" label="Alamat email *" error={err.email}>
                <input
                  id="email"
                  type="email"
                  value={v.email}
                  onChange={set('email')}
                  placeholder="email@domain.com"
                  autoComplete="email"
                  required
                  {...fe('email')}
                />
              </Field>

              <Field id="phone" label="Nomor telepon / WhatsApp">
                <input
                  id="phone"
                  type="tel"
                  value={v.phone}
                  onChange={set('phone')}
                  placeholder="0812-xxxx-xxxx"
                  autoComplete="tel"
                />
              </Field>
            </div>

            <Field id="subject" label="Subjek pesan">
              <input
                id="subject"
                value={v.subject}
                onChange={set('subject')}
                placeholder="Contoh: Pertanyaan produk sembako, kerjasama kemitraan"
              />
            </Field>

            <Field id="message" label="Pesan *" error={err.message}>
              <textarea
                id="message"
                rows="5"
                value={v.message}
                onChange={set('message')}
                placeholder="Tuliskan pesan, pertanyaan, atau rincian kebutuhan Anda..."
                required
                {...fe('message')}
              />
            </Field>

            {/* Honeypot */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                value={v.website}
                onChange={set('website')}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="row" style={{ marginTop: '.5rem' }}>
              <button
                type="submit"
                className="btn btn-blue btn-lg"
                disabled={st.s === 'sending'}
                style={{ minWidth: 160 }}
              >
                {st.s === 'sending' ? 'Mengirim...' : 'Kirim Pesan →'}
              </button>
              <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>
                * Wajib diisi
              </span>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}
