/* global React */
const { useEffect, useRef, useState, useLayoutEffect } = React;

/* ============================================================
   HELPERS
   ============================================================ */

// Split a string into per-character spans (preserves spaces as words)
function SplitText({ children, className = '', tag = 'span' }) {
  const Tag = tag;
  const words = String(children).split(' ');
  return (
    <Tag className={className} aria-label={String(children)}>
      {words.map((w, i) => (
        <span className="word reveal-mask" key={i} aria-hidden="true">
          {[...w].map((c, j) => (
            <span className="char" key={j}>{c}</span>
          ))}
          {i < words.length - 1 ? <span className="char">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}

function LineReveal({ children, className = '', delay = 0 }) {
  return (
    <span className={`reveal-mask inline-block ${className}`}>
      <span className="reveal-line" style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

/* ============================================================
   CURSOR DOT (follows mouse, grows on hover of [data-cursor])
   ============================================================ */
function CursorDot() {
  const dotRef = useRef(null);
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) dot.classList.add('lg'); else dot.classList.remove('lg');
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    let raf;
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);
  return <div ref={dotRef} className="cursor-dot" />;
}

/* ============================================================
   LOADER — intro animation, fades out
   ============================================================ */
function Loader({ onDone }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => { onDone && onDone(); }
    });
    const obj = { v: 0 };
    tl.to(obj, {
      v: 100, duration: 1.6, ease: 'power2.out',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(obj.v)).padStart(3, '0');
      }
    })
    .to(ref.current, { yPercent: -100, duration: 1.0, ease: 'expo.inOut', delay: 0.1 });
    return () => tl.kill();
  }, [onDone]);
  return (
    <div ref={ref} className="loader">
      <div className="w-full max-w-[1600px] px-8 md:px-12 flex items-end justify-between">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70">
          <div>Portfolio — V.04</div>
          <div className="mt-1">Loading visuals & motion</div>
        </div>
        <div ref={numRef} className="display text-[18vw] md:text-[14vw] leading-none">000</div>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70 text-right hidden md:block">
          <div>FR / EN</div>
          <div className="mt-1">2026 ©</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NAV — sticky pill, minimal
   ============================================================ */
function Nav() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2,'0');
      const m = String(d.getMinutes()).padStart(2,'0');
      const s = String(d.getSeconds()).padStart(2,'0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const goto = (id) => {
    const el = document.getElementById(id);
    if (el) gsap.to(window, { duration: 1.2, scrollTo: { y: el, offsetY: 0 }, ease: 'expo.inOut' });
    setOpen(false);
  };
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] mix-blend-difference">
        <div className="flex items-center justify-between px-6 md:px-10 py-6 text-milk">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); }} className="flex items-center gap-3" data-cursor>
            <span className="w-2.5 h-2.5 rounded-full bg-red inline-block" />
            <span className="font-mono text-[12px] tracking-[0.18em] uppercase">Tom Roger ©</span>
          </a>
          <nav className="hidden md:flex items-center gap-9 font-mono text-[12px] tracking-[0.14em] uppercase">
            <a className="ul-link" data-cursor href="#work"    onClick={(e)=>{e.preventDefault();goto('work');}}>Work</a>
            <a className="ul-link" data-cursor href="#about"   onClick={(e)=>{e.preventDefault();goto('about');}}>About</a>
            <a className="ul-link" data-cursor href="#stack"   onClick={(e)=>{e.preventDefault();goto('stack');}}>Stack</a>
            <a className="ul-link" data-cursor href="#contact" onClick={(e)=>{e.preventDefault();goto('contact');}}>Contact</a>
          </nav>
          <div className="hidden md:flex items-center gap-3 font-mono text-[12px] tracking-[0.14em] uppercase">
            <span className="w-2 h-2 rounded-full bg-red inline-block animate-pulse" />
            <span>Paris — {time}</span>
          </div>
          <button onClick={() => setOpen(true)} className="md:hidden font-mono text-[12px] tracking-[0.14em] uppercase" data-cursor>Menu</button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[110] bg-ink text-milk flex flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-mono text-[12px] tracking-[0.18em] uppercase">Menu</span>
            <button onClick={() => setOpen(false)} className="font-mono text-[12px] tracking-[0.14em] uppercase">Close</button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 gap-4 display text-[14vw] leading-[0.9]">
            <a onClick={() => goto('work')}>Work</a>
            <a onClick={() => goto('about')}>About</a>
            <a onClick={() => goto('stack')}>Stack</a>
            <a onClick={() => goto('contact')}>Contact</a>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   MAGNETIC BUTTON
   ============================================================ */
function Magnetic({ children, className = '', as: As = 'a', ...props }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el) return;
    const strength = 0.35;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el,    { x: x * strength,       y: y * strength,       duration: 0.6, ease: 'power3.out' });
      gsap.to(inner, { x: x * strength * 0.5, y: y * strength * 0.5, duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => {
      gsap.to(el,    { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' });
      gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <As ref={ref} className={`mag-btn inline-block ${className}`} data-cursor {...props}>
      <span ref={innerRef} className="inline-block">{children}</span>
    </As>
  );
}

/* ============================================================
   IMAGE PLACEHOLDER (16:9, 4:5, 1:1, free) — 4K-ready slot
   ============================================================ */
function ImagePlaceholder({ label = 'image', dim = '3840 × 2160', ratio = '16/9', tone = 'dark', className = '' }) {
  return (
    <div
      className={`ph-img ph-cover ${tone === 'light' ? 'light' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="ph-img-label">↳ {label}</span>
      <span className="ph-img-dim">{dim}</span>
      {/* center mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-current/40 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M2 6 L6 6 L6 2" />
            <path d="M20 6 L16 6 L16 2" />
            <path d="M2 16 L6 16 L6 20" />
            <path d="M20 16 L16 16 L16 20" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-ink text-milk pt-32 pb-10 px-6 md:px-12 relative overflow-hidden">
      <div className="dotgrid-dark absolute inset-0 opacity-40 pointer-events-none" />
      <div className="relative max-w-[1800px] mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-24">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow opacity-60 mb-6">↳ Seeking end-of-study role · 2026</p>
            <h3 className="display text-[12vw] md:text-[8vw] leading-[0.86]">
              Let's build<br/>
              <span className="display-italic text-red">something</span> real.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-end gap-8">
            <div>
              <p className="eyebrow opacity-60 mb-3">Email</p>
              <a className="ul-link text-2xl md:text-3xl" data-cursor href="mailto:tomroger.emailpro@gmail.com">tomroger.emailpro@gmail.com</a>
            </div>
            <div>
              <p className="eyebrow opacity-60 mb-3">Socials</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xl">
                <a className="ul-link" data-cursor href="https://github.com/WhiiteRose" target="_blank" rel="noreferrer">GitHub</a>
                <a className="ul-link" data-cursor href="https://www.linkedin.com/in/tom-roger-2a1a23274" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="ul-link" data-cursor href="CV.html" target="_blank" rel="noreferrer">CV</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t hr-milk pt-8 flex flex-col md:flex-row gap-4 justify-between font-mono text-[11px] tracking-[0.16em] uppercase opacity-60">
          <div>© 2026 — Tom Roger. All Rights Reserved.</div>
          <div className="flex gap-6">
            <span>Made w/ React · Tailwind · GSAP</span>
            <span>v.04</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* expose globals */
Object.assign(window, {
  SplitText, LineReveal, CursorDot, Loader, Nav, Magnetic, ImagePlaceholder, Footer
});
