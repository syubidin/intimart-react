import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const waLink = (num, text) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

export const useTitle = (t) =>
  useEffect(() => {
    document.title = t
      ? `${t} | PT Intimart Elang Perkasa`
      : 'PT Intimart Elang Perkasa | Metamart, MetaGrow & MetaFashion';
  }, [t]);

// Smooth parallax scrolling hook (desktop/tablet only to avoid mobile overlapping)
export function useParallax() {
  useEffect(() => {
    if (reduced()) return;
    let rafId = 0;
    const handleScroll = () => {
      if (window.innerWidth < 860) {
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          el.style.transform = 'none';
        });
        return;
      }
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const elements = document.querySelectorAll('[data-parallax]');
        elements.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax') || '0.12');
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
            const offset = (scrolled - (el.offsetTop || 0)) * speed;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          }
        });
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

// Muncul saat di-scroll (anime.js + IntersectionObserver). stag = animasikan anak-anaknya berurutan.
export function Reveal({ as: Tag = 'div', stag = false, className = '', children, ...p }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stag ? Array.from(el.children) : [el];

    if (reduced() || !('IntersectionObserver' in window)) {
      targets.forEach((t) => {
        t.style.opacity = '1';
        t.style.transform = 'none';
      });
      return;
    }

    // Check if element is already within the viewport on mount/update
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      animate(targets, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 750,
        ease: 'outExpo',
        delay: stag ? stagger(70) : 0,
      });
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        animate(targets, {
          opacity: [0, 1],
          translateY: [32, 0],
          duration: 850,
          ease: 'outExpo',
          delay: stag ? stagger(80) : 0,
        });
        io.disconnect();
      },
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [stag, children]);

  return (
    <Tag ref={ref} className={`reveal${stag ? ' kids' : ''} ${className}`} {...p}>
      {children}
    </Tag>
  );
}

export function Count({ to, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (reduced() || !('IntersectionObserver' in window)) {
      el.textContent = to + suffix;
      return;
    }
    const o = { v: 0 };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      animate(o, {
        v: to,
        duration: 1600,
        ease: 'outExpo',
        onUpdate: () => {
          el.textContent = Math.round(o.v) + suffix;
        },
      });
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
      {error && (
        <p className="err" id={`${id}-err`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
