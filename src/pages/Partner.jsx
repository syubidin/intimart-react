import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CONTACT, LINES } from '../data';
import { Reveal, Field, waLink, useTitle } from '../lib.jsx';

const MINAT = [
  ['metagrow-agen', 'Agen Telur & Sembako MetaGrow'],
  ['metagrow', 'Mitra Sembako MetaGrow (Retail / Grosir)'],
  ['metamart', 'Mitra Metamart (Minimarket & ATK)'],
  ['metafashion', 'Mitra MetaFashion (Pakaian Ex-Import)'],
  ['lainnya', 'Kerja sama korporasi / lainnya'],
];
const WILAYAH = [['Jabodetabek', 0], ['Purwakarta', 1], ['Lainnya', 0]];

// Professional SVG Icons
const PriceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const BoxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const HandshakeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BENEFITS = [
  { icon: <PriceIcon />, title: 'Harga Grosir Produsen', desc: 'Dapatkan harga kompetitif langsung dari produsen utama.' },
  { icon: <TruckIcon />, title: 'Logistik Terjadwal', desc: 'Jaringan distribusi terpercaya di Jabodetabek & Purwakarta.' },
  { icon: <BoxIcon />, title: 'Kualitas & Stok Terjamin', desc: 'Pasokan stabil untuk mendukung kelancaran usaha Anda.' },
  { icon: <HandshakeIcon />, title: 'Pendampingan Berkelanjutan', desc: 'Dukungan tim profesional dari awal pendaftaran hingga operasional.' },
];

export default function Partner() {
  useTitle('Jadi Mitra');
  const [sp] = useSearchParams();
  const pre = MINAT.some(([k]) => k === sp.get('minat')) ? sp.get('minat') : 'metagrow-agen';
  const [v, setV] = useState({ nama: '', minat: pre, wilayah: 'Jabodetabek', kota: '', catatan: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => {
    const val = e.target.value;
    setV((prev) => ({ ...prev, [k]: val }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (v.nama.trim().length < 2) er.nama = 'Nama minimal 2 karakter.';
    if (v.kota.trim().length < 2) er.kota = 'Isi kota/kecamatan Anda.';
    setErr(er);
    if (Object.keys(er).length) return;
    const minat = MINAT.find(([k]) => k === v.minat)[1];
    const phone = CONTACT.phones[WILAYAH.find(([w]) => w === v.wilayah)[1]];
    const text = `Halo Intimart Elang Perkasa, saya ingin bergabung sebagai mitra.\n\nNama: ${v.nama.trim()}\nMinat: ${minat}\nWilayah: ${v.wilayah}\nKota/Kecamatan: ${v.kota.trim()}\nCatatan: ${v.catatan.trim() || '-'}`;
    window.open(waLink(phone.wa, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Hero Strip with Partnership Trust Card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-d) 0%, var(--blue) 100%)',
        padding: 'clamp(3.5rem,7vw,5.5rem) 0 clamp(4.5rem,10vw,7.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: '-10%', bottom: '-30%',
          width: '60%', aspectRatio: '1',
          background: 'radial-gradient(circle, rgba(251,191,15,.15), transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} aria-hidden="true" />
        <div className="wrap">
          <div className="split top">
            <Reveal>
              <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Program Kemitraan</p>
              <h1 style={{ color: '#fff', maxWidth: '14ch' }}>Bergabung &amp; Tumbuh Bersama Kami</h1>
              <p style={{ color: 'rgba(255,255,255,.82)', maxWidth: '52ch', marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.75 }}>
                Peluang kemitraan dan keagenan resmi untuk semua unit usaha: sembako MetaGrow, minimarket &amp; ATK Metamart, serta fesyen MetaFashion.
              </p>
              <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: '50ch', fontSize: '.95rem' }}>
                Isi formulir di bawah dan data Anda akan langsung terformat rapi di WhatsApp customer service kami.
              </p>
            </Reveal>

            {/* Visual Hero Card - High Contrast & Prominent */}
            <Reveal>
              <div style={{
                background: '#ffffff',
                border: '2px solid rgba(255,255,255,.9)',
                borderRadius: 24,
                padding: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                color: 'var(--ink)',
                boxShadow: '0 24px 60px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
                  <span style={{
                    background: 'var(--yellow)',
                    color: 'var(--blue-d)',
                    fontWeight: 800,
                    fontSize: '.82rem',
                    padding: '.4rem 1.1rem',
                    borderRadius: 999,
                    letterSpacing: '.04em',
                    boxShadow: '0 4px 14px rgba(251,191,15,.35)',
                  }}>
                    Peluang Usaha Terbuka
                  </span>
                  <span style={{
                    fontSize: '.85rem',
                    color: 'var(--green-d)',
                    fontWeight: 700,
                    background: '#edfff3',
                    border: '1px solid #8ce2a6',
                    padding: '.3rem .8rem',
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.35rem',
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                    100+ Mitra Aktif
                  </span>
                </div>

                <div>
                  <b style={{ color: 'var(--ink)', fontSize: '1.3rem', display: 'block', marginBottom: '.35rem' }}>
                    Sinergi Multi-Lini Bisnis
                  </b>
                  <p style={{ color: 'var(--muted)', fontSize: '.93rem', margin: 0, lineHeight: 1.65 }}>
                    Dukungan pasokan teratur dengan harga grosir langsung dari produsen, jaminan mutu stok, dan pembinaan bisnis berkelanjutan.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '.55rem', flexWrap: 'wrap' }}>
                  {LINES.map((l) => (
                    <span key={l.slug} style={{
                      background: 'var(--soft)',
                      border: '1px solid var(--border)',
                      padding: '.35rem .85rem',
                      borderRadius: 999,
                      fontSize: '.82rem',
                      fontWeight: 700,
                      color: 'var(--blue)',
                    }}>
                      ✓ {l.name}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '.6rem',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '1rem',
                  textAlign: 'center',
                }}>
                  <div style={{ background: 'var(--soft)', borderRadius: 12, padding: '.6rem .3rem' }}>
                    <b style={{ color: 'var(--blue)', fontSize: '1.05rem', display: 'block' }}>Grosir</b>
                    <span style={{ fontSize: '.72rem', color: 'var(--muted)', fontWeight: 600 }}>Produsen</span>
                  </div>
                  <div style={{ background: 'var(--soft)', borderRadius: 12, padding: '.6rem .3rem' }}>
                    <b style={{ color: 'var(--green-d)', fontSize: '1.05rem', display: 'block' }}>Terjadwal</b>
                    <span style={{ fontSize: '.72rem', color: 'var(--muted)', fontWeight: 600 }}>Logistik Rutin</span>
                  </div>
                  <div style={{ background: 'var(--soft)', borderRadius: 12, padding: '.6rem .3rem' }}>
                    <b style={{ color: 'var(--red)', fontSize: '1.05rem', display: 'block' }}>Cepat</b>
                    <span style={{ fontSize: '.72rem', color: 'var(--muted)', fontWeight: 600 }}>Daftar via WA</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="wrap" style={{ marginTop: 'clamp(-2rem,-4vw,-3rem)', paddingBottom: '5rem' }}>
        <div className="split top">
          {/* Left: benefits + line cards */}
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Benefit grid with Professional Icons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
              }}>
                {BENEFITS.map(({ icon, title, desc }) => (
                  <div key={title} style={{
                    background: '#fff',
                    border: '1.5px solid var(--border)',
                    borderRadius: 18,
                    padding: '1.4rem',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                  }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--soft)',
                      color: 'var(--blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '.9rem',
                    }}>
                      {icon}
                    </div>
                    <b style={{ color: 'var(--ink)', display: 'block', marginBottom: '.35rem', fontSize: '.98rem' }}>{title}</b>
                    <p style={{ color: 'var(--muted)', fontSize: '.88rem', margin: 0, lineHeight: 1.55 }}>{desc}</p>
                  </div>
                ))}
              </div>

              {/* Line cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                <p style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  Pilihan Kemitraan Tersedia:
                </p>
                {LINES.map((l) => (
                  <div key={l.slug} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: '#fff',
                    borderRadius: 16,
                    border: '1.5px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <img src={l.logo} alt={l.name} style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
                    <div style={{ minWidth: 0 }}>
                      <b style={{ fontSize: '1rem', color: 'var(--ink)' }}>{l.name}</b>
                      <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: 0 }}>{l.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal>
            <form
              className="form card"
              onSubmit={submit}
              noValidate
              style={{ boxShadow: 'var(--shadow-xl)', border: '1.5px solid var(--border)', background: '#fff' }}
            >
              <div style={{ marginBottom: '.8rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>Formulir Kemitraan</h2>
                <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                  Isi data Anda dan klik "Lanjut ke WhatsApp" — pesan langsung terformat otomatis.
                </p>
              </div>

              <Field id="nama" label="Nama lengkap atau Usaha *" error={err.nama}>
                <input
                  id="nama"
                  value={v.nama}
                  onChange={set('nama')}
                  placeholder="Contoh: Budi Santoso / Toko Berkah"
                  autoComplete="name"
                  required
                />
              </Field>

              <Field id="minat" label="Pilihan Minat Kemitraan *">
                <select id="minat" value={v.minat} onChange={set('minat')}>
                  {MINAT.map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field id="wilayah" label="Wilayah Hotline">
                  <select id="wilayah" value={v.wilayah} onChange={set('wilayah')}>
                    {WILAYAH.map(([w]) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </Field>

                <Field id="kota" label="Kota / Kecamatan *" error={err.kota}>
                  <input
                    id="kota"
                    value={v.kota}
                    onChange={set('kota')}
                    placeholder="Contoh: Jatisampurna, Bekasi"
                    required
                  />
                </Field>
              </div>

              <Field id="catatan" label="Rincian Kebutuhan / Catatan (Opsional)">
                <textarea
                  id="catatan"
                  rows="3"
                  value={v.catatan}
                  onChange={set('catatan')}
                  placeholder="Tuliskan estimasi volume, pertanyaan, atau rincian usaha Anda..."
                />
              </Field>

              <button
                type="submit"
                className="btn btn-red btn-lg"
                style={{ width: '100%', marginTop: '.8rem' }}
              >
                Lanjut ke WhatsApp →
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
