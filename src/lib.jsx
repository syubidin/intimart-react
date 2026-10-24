import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const waLink = (num, text) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
export const useTitle = (t) => useEffect(() => { document.title = t ? `${t} | PT Intimart Elang Perkasa` : 'PT Intimart Elang Perkasa | Metamart, MetaGrow & MetaFashion'; }, [t]);

// Muncul saat di-scroll (anime.js + IntersectionObserver). stagger = animasikan anak-anaknya berurutan.
export function Reveal({ as: Tag = 'div', stag = false, className = '', children, ...p }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stag ? Array.from(el.children) : [el];
    if (reduced() || !('IntersectionObserver' in window)) { targets.forEach((t) => (t.style.opacity = 1)); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      animate(targets, { opacity: [0, 1], translateY: [40, 0], duration: 900, ease: 'outExpo', delay: stag ? stagger(90) : 0 });
      io.disconnect();
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [stag]);
  return <Tag ref={ref} className={`reveal${stag ? ' kids' : ''} ${className}`} {...p}>{children}</Tag>;
}

export function Count({ to, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (reduced() || !('IntersectionObserver' in window)) { el.textContent = to + suffix; return; }
    const o = { v: 0 };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      animate(o, { v: to, duration: 1600, ease: 'outExpo', onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="err" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}
