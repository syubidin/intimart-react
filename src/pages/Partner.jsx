import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CONTACT, LINES } from '../data';
import { Reveal, Field, waLink, useTitle } from '../lib.jsx';

const MINAT = [
  ['metagrow-agen', 'Agen Telur MetaGrow'],
  ['metagrow', 'Mitra Sembako MetaGrow (retail/grosir)'],
  ['metamart', 'Mitra Metamart (minimarket & ATK)'],
  ['metafashion', 'Mitra MetaFashion'],
  ['lainnya', 'Kerja sama lainnya'],
];
const WILAYAH = [['Jabodetabek', 0], ['Purwakarta', 1], ['Lainnya', 0]];

const BENEFITS = [
  { icon: '💰', title: 'Harga Kompetitif', desc: 'Dapatkan harga grosir langsung dari sumber.' },
  { icon: '🚚', title: 'Pengiriman Terjangkau', desc: 'Jaringan pengiriman ke berbagai wilayah.' },
  { icon: '📦', title: 'Stok Terjamin', desc: 'Ketersediaan produk yang konsisten.' },
  { icon: '🤝', title: 'Dukungan Penuh', desc: 'Tim kami siap mendampingi mitra.' },
];

export default function Partner() {
  useTitle('Jadi Mitra');
  const [sp] = useSearchParams();
  const pre = MINAT.some(([k]) => k === sp.get('minat')) ? sp.get('minat') : 'metagrow-agen';
  const [v, setV] = useState({ nama: '', minat: pre, wilayah: 'Jabodetabek', kota: '', catatan: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

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
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-d) 0%, var(--blue) 100%)',
        padding: 'clamp(3rem,7vw,5.5rem) 0 clamp(4rem,10vw,7rem)',
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
          <Reveal>
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Program Kemitraan</p>
            <h1 style={{ color: '#fff', maxWidth: '14ch' }}>Bergabung & Tumbuh Bersama Kami</h1>
            <p style={{ color: 'rgba(255,255,255,.78)', maxWidth: '50ch', marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.75 }}>
              Isi formulir singkat, tim kami buka WhatsApp dengan pesan yang sudah terisi. Tinggal kirim.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="wrap" style={{ marginTop: 'clamp(-2rem,-4vw,-3rem)' }}>
        <div className="split top">
          {/* Left: benefits + line cards */}
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Benefit grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}>
                {BENEFITS.map(({ icon, title, desc }) => (
                  <div key={title} style={{
                    background: '#fff',
                    border: '1.5px solid var(--border)',
                    borderRadius: 16,
                    padding: '1.2rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div style={{ fontSize: '1.6rem', marginBottom: '.4rem' }}>{icon}</div>
                    <b style={{ color: 'var(--ink)', display: 'block', marginBottom: '.25rem', fontSize: '.95rem' }}>{title}</b>
                    <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>

              {/* Line cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                <p style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  Tersedia untuk semua lini:
                </p>
                {LINES.map((l) => (
                  <div key={l.slug} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.8rem',
                    padding: '.8rem 1rem',
                    background: 'var(--soft)',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                  }}>
                    <img src={l.logo} alt={l.name} style={{ height: 28, width: 'auto' }} />
                    <div>
                      <b style={{ fontSize: '.95rem' }}>{l.name}</b>
                      <p style={{ color: 'var(--muted)', fontSize: '.82rem', margin: 0 }}>{l.tag}</p>
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
              style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)' }}
            >
              <div style={{ marginBottom: '.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>Formulir Kemitraan</h2>
                <p style={{ color: 'var(--muted)', fontSize: '.88rem' }}>
                  Isi dan klik "Lanjut ke WhatsApp" — pesan langsung terkirim.
                </p>
              </div>

              <Field id="nama" label="Nama lengkap *" error={err.nama}>
                <input
                  id="nama"
                  value={v.nama}
                  onChange={set('nama')}
                  maxLength={80}
                  autoComplete="name"
                  aria-describedby={err.nama ? 'nama-err' : undefined}
                  aria-invalid={!!err.nama}
                  placeholder="Nama Anda"
                />
              </Field>

              <Field id="minat" label="Minat kemitraan">
                <select id="minat" value={v.minat} onChange={set('minat')}>
                  {MINAT.map(([k, t]) => <option key={k} value={k}>{t}</option>)}
                </select>
              </Field>

              <Field id="wilayah" label="Wilayah">
                <select id="wilayah" value={v.wilayah} onChange={set('wilayah')}>
                  {WILAYAH.map(([w]) => <option key={w}>{w}</option>)}
                </select>
              </Field>

              <Field id="kota" label="Kota / kecamatan *" error={err.kota}>
                <input
                  id="kota"
                  value={v.kota}
                  onChange={set('kota')}
                  maxLength={80}
                  autoComplete="address-level2"
                  aria-describedby={err.kota ? 'kota-err' : undefined}
                  aria-invalid={!!err.kota}
                  placeholder="Contoh: Bekasi Barat, Depok Timur"
                />
              </Field>

              <Field id="catatan" label="Catatan tambahan (opsional)">
                <textarea
                  id="catatan"
                  rows="3"
                  value={v.catatan}
                  onChange={set('catatan')}
                  maxLength={400}
                  placeholder="Informasi tambahan yang ingin Anda sampaikan..."
                />
              </Field>

              <button className="btn btn-red btn-lg" type="submit" style={{ width: '100%' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Lanjut ke WhatsApp
              </button>

              <p style={{ fontSize: '.82rem', color: 'var(--muted)', textAlign: 'center' }}>
                Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi otomatis.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
