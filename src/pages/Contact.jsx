import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../data';
import { Reveal, Field, waLink, useTitle } from '../lib.jsx';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', website: '' };

// Icon components
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const WAIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
      {/* Hero strip */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-d) 0%, var(--blue) 100%)',
        padding: 'clamp(3rem,7vw,5.5rem) 0 clamp(4rem,10vw,7rem)',
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
          <Reveal>
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Hubungi Kami</p>
            <h1 style={{ color: '#fff', maxWidth: '14ch' }}>Ada pertanyaan? Kami siap membantu.</h1>
            <p style={{ color: 'rgba(255,255,255,.78)', maxWidth: '50ch', marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.75 }}>
              Kirim pesan email atau chat langsung via WhatsApp. Tim kami akan merespons secepatnya.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Main content */}
      <section className="wrap split top" style={{ marginTop: 'clamp(-2rem,-5vw,-3rem)' }}>
        {/* Info panel */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Contact info cards */}
            <div className="contact-info-item">
              <div className="contact-icon"><MapPinIcon /></div>
              <div>
                <b>Kantor Utama</b>
                <p>{CONTACT.address}</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon"><MailIcon /></div>
              <div>
                <b>Email</b>
                <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              </div>
            </div>
            {CONTACT.phones.map((p) => (
              <div key={p.wa} className="contact-info-item">
                <div className="contact-icon"><WAIcon /></div>
                <div>
                  <b>{p.area}</b>
                  <p>
                    <a
                      href={waLink(p.wa, 'Halo Intimart Elang Perkasa, saya ingin bertanya.')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.display}
                    </a>
                    {' '}(WhatsApp)
                  </p>
                </div>
              </div>
            ))}

            {/* Quick WA buttons */}
            <div style={{ marginTop: '.5rem', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
              <p style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                Topik Cepat
              </p>
              {[
                { label: 'Pertanyaan Produk', msg: 'Halo Intimart, saya ingin menanyakan produk.' },
                { label: 'Info Kemitraan', msg: 'Halo Intimart, saya ingin tahu lebih lanjut tentang program kemitraan.' },
                { label: 'Pemesanan Grosir', msg: 'Halo Intimart, saya ingin menanyakan pembelian grosir.' },
              ].map(({ label, msg }) => (
                <a
                  key={label}
                  href={waLink(CONTACT.phones[0].wa, msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.7rem',
                    padding: '.75rem 1.1rem',
                    background: '#f0fff6',
                    border: '1.5px solid #b7f5cf',
                    borderRadius: 14,
                    color: 'var(--green-d)',
                    fontWeight: 600,
                    fontSize: '.9rem',
                    textDecoration: 'none',
                    transition: 'background .2s, transform .2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#ddfaeb'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f0fff6'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <WAIcon /> {label}
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
            style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)' }}
          >
            <h2 style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>Kirim Pesan</h2>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '.5rem' }}>
              Semua field bertanda * wajib diisi.
            </p>
            <Field id="name" label="Nama lengkap *" error={err.name}>
              <input id="name" value={v.name} onChange={set('name')} maxLength={80} autoComplete="name" {...fe('name')} placeholder="Nama Anda" />
            </Field>
            <Field id="email" label="Email *" error={err.email}>
              <input id="email" type="email" value={v.email} onChange={set('email')} maxLength={120} autoComplete="email" {...fe('email')} placeholder="email@contoh.com" />
            </Field>
            <Field id="phone" label="No. telepon (opsional)">
              <input id="phone" type="tel" value={v.phone} onChange={set('phone')} maxLength={30} autoComplete="tel" placeholder="+62 8xx-xxxx-xxxx" />
            </Field>
            <Field id="subject" label="Subjek (opsional)">
              <input id="subject" value={v.subject} onChange={set('subject')} maxLength={120} placeholder="Topik pesan Anda" />
            </Field>
            <Field id="message" label="Pesan *" error={err.message}>
              <textarea id="message" rows="5" value={v.message} onChange={set('message')} maxLength={3000} {...fe('message')} placeholder="Tuliskan pesan Anda di sini..." />
            </Field>
            {/* Honeypot */}
            <div className="hp" aria-hidden="true">
              <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} /></label>
            </div>
            <button className="btn btn-red" type="submit" disabled={st.s === 'sending'} style={{ width: '100%' }}>
              {st.s === 'sending' ? 'Mengirim…' : 'Kirim Pesan →'}
            </button>
            {st.m && (
              <p className={`status ${st.s}`} role="status" aria-live="polite">{st.m}</p>
            )}
          </form>
        </Reveal>
      </section>

      {/* CTA Mitra */}
      <section className="wrap">
        <Reveal className="cta">
          <div>
            <h2>Ingin menjadi mitra bisnis kami?</h2>
            <p>Isi formulir kemitraan dan tim kami bantu prosesnya.</p>
          </div>
          <Link to="/mitra" className="btn btn-blue btn-lg">Daftar Jadi Mitra →</Link>
        </Reveal>
      </section>
    </>
  );
}
