// Vercel Serverless Function: POST /api/contact -> kirim email ke PT lewat SMTP Gmail.
import nodemailer from 'nodemailer';

const hits = new Map(); // rate limit best-effort (per instance). Untuk skala besar pakai Upstash/Vercel KV.
const WINDOW = 10 * 60 * 1000;
const MAX = 5;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const line = (s, max) => String(s ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max); // cegah header injection

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const fail = (code, error) => res.status(code).json({ ok: false, error });

  if (req.method !== 'POST') return fail(405, 'Method tidak diizinkan.');

  // Hanya terima dari domain sendiri
  const origin = req.headers.origin;
  if (origin) {
    try { if (new URL(origin).host !== req.headers.host) return fail(403, 'Asal permintaan tidak valid.'); }
    catch { return fail(403, 'Asal permintaan tidak valid.'); }
  }
  if (!String(req.headers['content-type'] || '').includes('application/json')) return fail(415, 'Format tidak didukung.');

  // Rate limit
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (recent.length >= MAX) return fail(429, 'Terlalu banyak pesan. Coba lagi beberapa menit lagi.');
  recent.push(now);
  hits.set(ip, recent);

  const b = req.body && typeof req.body === 'object' ? req.body : {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: bot dibuat "berhasil" diam-diam

  const name = line(b.name, 80);
  const email = line(b.email, 120);
  const phone = line(b.phone, 30);
  const subject = line(b.subject, 120) || 'Pesan dari website';
  const message = String(b.message ?? '').trim().slice(0, 3000);

  if (name.length < 2) return fail(400, 'Nama minimal 2 karakter.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail(400, 'Format email tidak valid.');
  if (message.length < 10) return fail(400, 'Pesan minimal 10 karakter.');

  const { SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) { console.error('SMTP env belum diset'); return fail(500, 'Layanan email belum dikonfigurasi.'); }

  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await transporter.sendMail({
      from: `"Website Intimart" <${SMTP_USER}>`,
      to: MAIL_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `[Website] ${subject}`,
      text: `Nama: ${name}\nEmail: ${email}\nTelepon: ${phone || '-'}\n\n${message}`,
      html: `<h2>Pesan baru dari website</h2><p><b>Nama:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Telepon:</b> ${esc(phone || '-')}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Gagal kirim email:', err?.message);
    return fail(502, 'Pesan gagal dikirim. Silakan coba lagi atau hubungi kami lewat WhatsApp.');
  }
}
