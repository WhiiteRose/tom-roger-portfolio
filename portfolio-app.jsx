/* global React, gsap, ScrollTrigger, ScrollToPlugin */
/* global SplitText, LineReveal, CursorDot, Loader, Nav, Magnetic, ImagePlaceholder, Footer */

const { useEffect, useRef, useState, useLayoutEffect, Fragment } = React;

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ============================================================
   HERO — massive name reveal + scroll cue
   ============================================================ */
function Hero() {
  const rootRef = useRef(null);
  const yearRef = useRef(null);
  const scrollLineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // initial reveal — chars rise, lines slide up
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'expo.out' } });
      tl.to('.hero-char',  { yPercent: 0, duration: 1.4, stagger: 0.012 })
        .to('.hero-line',  { yPercent: 0, duration: 1.1, stagger: 0.08 }, '-=1.1')
        .from('.hero-meta', { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 }, '-=0.7')
        .from('.hero-scrollcue', { opacity: 0, y: 10, duration: 0.6 }, '-=0.4');

      // parallax + fade on scroll
      gsap.to('.hero-title', {
        yPercent: -22,
        scale: 0.94,
        opacity: 0.0,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 }
      });
      gsap.to('.hero-bg-word', {
        xPercent: -8, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 }
      });
      // image parallax — slow zoom + lift
      gsap.fromTo('.hero-img',
        { scale: 1.04, yPercent: 0 },
        {
          scale: 1.16, yPercent: -12, ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 }
        });

      // bouncing scroll cue
      gsap.to(scrollLineRef.current, {
        scaleY: 0.35, transformOrigin: 'top center',
        duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-screen w-full overflow-hidden bg-ink text-milk">
      {/* full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src="images/hero.jpg"
          alt=""
          className="hero-img w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        {/* readability gradient — strong bottom, soft top */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(10,9,8,0.65) 0%, rgba(10,9,8,0.15) 28%, rgba(10,9,8,0.20) 55%, rgba(10,9,8,0.85) 100%)'
        }} />
        {/* vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(120% 80% at 50% 50%, transparent 40%, rgba(10,9,8,0.55) 100%)'
        }} />
      </div>

      {/* outlined background word */}
      <div className="hero-bg-word pointer-events-none absolute inset-x-0 top-[16vh] flex justify-center select-none z-[1]">
        <span className="outline-word display text-[36vw] leading-[0.78] tracking-ultra opacity-[0.07] text-milk">portfolio</span>
      </div>

      {/* main title */}
      <div className="hero-title relative z-10 min-h-screen flex flex-col justify-between pt-24 md:pt-28 pb-12 md:pb-14 px-6 md:px-12">
        <div>
        <p className="eyebrow opacity-60 mb-6 reveal-mask"><span className="reveal-line" style={{transform:'translateY(110%)', display:'inline-block'}}>↳ Portfolio — Tom Roger · 2026</span></p>

        <h1 className="display text-[18vw] md:text-[16vw] leading-[0.84] tracking-ultra">
          <span className="block reveal-mask">
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>B</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>u</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>i</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>l</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>d</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>i</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>n</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>g</span>
          </span>
          <span className="block reveal-mask">
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>w</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>e</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>b</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)', width:'0.35em'}}> </span>
            <span className="display-italic text-red">
              <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>t</span>
              <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>h</span>
              <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>i</span>
              <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>n</span>
              <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>g</span>
              <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>s</span>
            </span>
          </span>
          <span className="block reveal-mask">
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>t</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>h</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>a</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>t</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)', width:'0.35em'}}> </span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>m</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>o</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>v</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>e</span>
            <span className="hero-char inline-block" style={{transform:'translateY(110%)'}}>.</span>
          </span>
        </h1>
        </div>

        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6">
            <p className="font-serif text-2xl md:text-3xl leading-snug text-pretty reveal-mask">
              <span className="hero-line inline-block" style={{transform:'translateY(110%)'}}>
                Fullstack web & mobile engineer
              </span><br/>
              <span className="hero-line inline-block" style={{transform:'translateY(110%)'}}>
                with a security mindset.
              </span>
            </p>
            <p className="hero-meta mt-4 font-mono text-[11px] tracking-[0.16em] uppercase opacity-50">
              Epitech — Class of 2026
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 flex md:justify-end">
            <Magnetic as="a" href="#work" className="hero-meta inline-flex items-center bg-ink text-milk rounded-full px-7 py-4 font-mono text-[11px] tracking-[0.16em] uppercase">
              <span className="w-2 h-2 rounded-full bg-red inline-block animate-pulse mr-4" />
              See Selected Work →
            </Magnetic>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-scrollcue absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase z-10">
        <span>Scroll</span>
        <span ref={scrollLineRef} className="w-px h-10 bg-milk" />
      </div>
    </section>
  );
}

/* ============================================================
   MANIFESTO — infinite ticker, dual rows, velocity-aware
   ============================================================ */
function Manifesto() {
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const dur1 = 90, dur2 = 75;
      const t1 = gsap.to(t1Ref.current, { xPercent: -50, duration: dur1, ease: 'none', repeat: -1 });
      const t2 = gsap.to(t2Ref.current, { xPercent: 50,  duration: dur2, ease: 'none', repeat: -1 });
      // velocity boost on scroll — gentle, capped at 2.5×
      ScrollTrigger.create({
        trigger: '#manifesto',
        start: 'top bottom', end: 'bottom top',
        onUpdate: (st) => {
          const v = Math.min(Math.abs(st.getVelocity()) / 1400, 1.5);
          gsap.to([t1, t2], { timeScale: 1 + v, duration: 0.4, ease: 'power2.out' });
          gsap.to([t1, t2], { timeScale: 1, duration: 1.6, ease: 'power2.out', delay: 0.5 });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const wordsA = [];
  for (let i = 0; i < 4; i++) {
    wordsA.push({ t: 'Design' }, { t: 'build', red: true }, { t: '·' }, { t: 'Ship' }, { t: 'repeat', red: true }, { t: '—' });
  }
  // Render words twice so we can scroll xPercent: -50 for a seamless loop
  const renderRowA = () => (
    <>
      {wordsA.map((w, i) => (
        <span key={'a-' + i} className={w.red ? 'display-italic text-red' : ''}>{w.t}</span>
      ))}
      {wordsA.map((w, i) => (
        <span key={'b-' + i} className={w.red ? 'display-italic text-red' : ''} aria-hidden="true">{w.t}</span>
      ))}
    </>
  );

  const wordsB = [];
  for (let i = 0; i < 6; i++) {
    wordsB.push('· Web', '· Mobile', '· Security', '· Motion-first', '· Detail-obsessed');
  }
  const renderRowB = () => (
    <>
      {wordsB.map((w, i) => <span key={'a-' + i}>{w}</span>)}
      {wordsB.map((w, i) => <span key={'b-' + i} aria-hidden="true">{w}</span>)}
    </>
  );

  return (
    <section id="manifesto" className="bg-ink text-milk py-28 md:py-40 overflow-hidden border-y hr-milk relative">
      <div className="absolute inset-0 dotgrid-dark opacity-30 pointer-events-none" />
      <div className="relative">
        <div className="overflow-hidden">
          <div ref={t1Ref} className="ticker display text-[12vw] md:text-[9vw] leading-[1] uppercase tracking-tightest whitespace-nowrap" style={{willChange:'transform'}}>
            {renderRowA()}
          </div>
        </div>
        <div className="overflow-hidden mt-6">
          <div ref={t2Ref} className="ticker font-serif italic text-[8vw] md:text-[5vw] leading-[1] whitespace-nowrap opacity-80" style={{willChange:'transform', transform:'translateX(-50%)'}}>
            {renderRowB()}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT — sticky portrait + scrolling reveal lines
   ============================================================ */
function About() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-line').forEach((el) => {
        gsap.fromTo(el,
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1.0, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });
      // portrait reveals via clip-path
      gsap.fromTo('.about-portrait',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: '.about-portrait', start: 'top 80%' }
        }
      );
      // counters
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 2.0, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          onUpdate: () => { el.textContent = Math.round(obj.v); }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative bg-milk text-ink py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-16 md:mb-24">
          <p className="eyebrow"><span className="text-red">●</span>  About — N° 002</p>
          <p className="eyebrow opacity-60 hidden md:block">↳ A quick introduction</p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <div className="about-portrait">
                <div className="ph-cover relative w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <img src="images/portrait.png" alt="Tom Roger" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
                </div>
              </div>
              <div className="mt-6 font-mono text-[11px] tracking-[0.16em] uppercase opacity-60 flex justify-between">
                <span>↳ Tom Roger — 2026</span>
                <span>Paris, FR</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-8 md:pl-8">
            <h2 className="display text-[12vw] md:text-[8vw] leading-[0.9] tracking-ultra mb-12">
              <span className="block reveal-mask"><span className="about-line inline-block">A student</span></span>
              <span className="block reveal-mask"><span className="about-line inline-block">building the</span></span>
              <span className="block reveal-mask"><span className="about-line inline-block display-italic text-red">web like it</span></span>
              <span className="block reveal-mask"><span className="about-line inline-block">should be.</span></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[64rem]">
              <p className="text-xl md:text-2xl leading-snug text-pretty">
                I'm Tom — a fifth-year Epitech Lyon student (class of <span className="display-italic text-red">2026</span>) building modern web & mobile apps with a strong focus on <em className="display-italic">UI/UX</em>, performance and secure-by-design development.
              </p>
              <p className="text-xl md:text-2xl leading-snug text-pretty">
                I move comfortably between <em className="display-italic">React, Next.js, TypeScript</em> on the web and <em className="display-italic">Flutter</em> on mobile — backed by a security-minded approach borrowed from pentesting, forensics & OSINT.
              </p>
            </div>

            {/* counters */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t hr-ink pt-10">
              {[
                { n: 5,  label: 'Years at Epitech' },
                { n: 10, label: 'Public repos' },
                { n: 8,  label: 'Featured projects' },
                { n: 20, label: 'Stack proficiencies' },
              ].map((c, i) => (
                <div key={i} className="flex flex-col">
                  <span className="display text-6xl md:text-7xl tracking-ultra">
                    <span data-count={c.n}>0</span>
                    {c.label === 'Years at Epitech' ? '' : '+'}
                  </span>
                  <span className="eyebrow opacity-60 mt-3">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SELECTED WORK — horizontal scroll pinned section
   ============================================================ */
const PROJECTS = [
  { n:'01', title:'Zentry',    client:'Personal · Landing page',      year:'2025', tags:['React','GSAP','Tailwind'],            desc:'Cinematic landing page exploration with video transitions and a HUD-driven navigation system.',           ratio:'16/10', src:'images/zentry-selected.png', repo:'https://github.com/WhiiteRose/Zentry' },
  { n:'02', title:'3Drobot',   client:'Personal · WebGL',             year:'2024', tags:['React','Spline','Tailwind','Vite'],   desc:'Interactive 3D scene built with Spline & AOS — exploring product-style web 3D in React.',                ratio:'4/5',   src:'images/3dRobot.png', repo:'https://github.com/WhiiteRose/3Drobot' },
  { n:'03', title:'Apple',     client:'Personal · Product page',      year:'2025', tags:['R3F','Three.js','GSAP','Tailwind 4'], desc:'Scroll-animated 3D product page — full timeline choreography around a real-time MacBook model.',          ratio:'16/10', src:'images/Apple.png', repo:'https://github.com/WhiiteRose/Apple' },
  { n:'04', title:'NeoMovie',  client:'Personal · Fullstack',         year:'2024', tags:['React','Node.js','MongoDB','Docker'], desc:'Premium responsive movie explorer — full-stack, Dockerized, browse films, series & actors.',             ratio:'16/10', src:'images/NeoMovie.png', repo:'https://github.com/WhiiteRose/NeoMovie' },
];

function WorkShowcase() {
  const root = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trackEl = track.current;
      // total horizontal distance
      const getX = () => trackEl.scrollWidth - window.innerWidth + 96;
      let tween;
      const build = () => {
        if (tween) tween.scrollTrigger && tween.scrollTrigger.kill();
        if (tween) tween.kill();
        tween = gsap.to(trackEl, {
          x: () => -getX(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + getX(),
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
      };
      build();

      // numbers parallax (each card meta number translates as card enters)
      gsap.utils.toArray('.proj-card').forEach((card) => {
        const img = card.querySelector('.ph-cover');
        if (img) {
          gsap.fromTo(img, { scale: 1.12 }, {
            scale: 1.0, ease: 'none',
            scrollTrigger: {
              trigger: card, containerAnimation: tween,
              start: 'left right', end: 'right left', scrub: true
            }
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="relative bg-milk text-ink overflow-hidden">
      <div className="h-screen flex flex-col">
        {/* header strip */}
        <div className="flex items-end justify-between px-6 md:px-12 pt-32 pb-10">
          <div>
            <p className="eyebrow"><span className="text-red">●</span> Selected Work — N° 003</p>
            <h2 className="display text-[10vw] md:text-[7vw] leading-[0.86] tracking-ultra mt-4">
              Selected <span className="display-italic text-red">work.</span>
            </h2>
          </div>
          <div className="hidden md:flex items-end gap-10 font-mono text-[11px] tracking-[0.16em] uppercase opacity-70">
            <div>
              <div className="opacity-50">Scroll</div>
              <div>↓ to drift →</div>
            </div>
            <div>
              <div className="opacity-50">Count</div>
              <div>{PROJECTS.length} pinned · 10 total</div>
            </div>
          </div>
        </div>

        {/* horizontal track */}
        <div className="flex-1 flex items-center overflow-hidden pl-6 md:pl-12">
          <div ref={track} className="hscroll-track gap-8 md:gap-14 items-stretch pr-24" style={{height:'70vh'}}>
            {PROJECTS.map((p) => (
              <a key={p.n} href={p.repo} target="_blank" rel="noreferrer" className="proj-card group relative shrink-0 flex flex-col" style={{ width: p.ratio === '4/5' ? '38vh' : '120vh' }} data-cursor>
                <div className="relative h-full">
                  <div className="absolute inset-0">
                    {p.src ? (
                      <img src={p.src} alt={p.title} className="ph-cover w-full h-full object-cover" />
                    ) : (
                      <ImagePlaceholder
                        ratio={p.ratio}
                        label={`${p.title.toLowerCase()} — hero`}
                        dim="3840 × 2160"
                        tone="dark"
                      />
                    )}
                  </div>
                  <span className="meta-arrow absolute bottom-4 right-4 w-12 h-12 rounded-full bg-milk text-ink flex items-center justify-center">↗</span>
                </div>
                <div className="pt-5 flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="text-2xl md:text-3xl tracking-tight font-medium">{p.title}</h3>
                    <p className="eyebrow opacity-60 mt-1">{p.client}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {p.tags.map((t) => (
                      <span key={t} className="eyebrow border border-ink/20 rounded-full px-3 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}

            {/* end card — view all */}
            <a className="shrink-0 flex flex-col items-center justify-center bg-ink text-milk rounded-3xl px-16" style={{ width:'45vh', height:'auto' }} data-cursor>
              <div className="display text-7xl leading-none text-center">All<br/><span className="display-italic text-red">work</span></div>
              <span className="eyebrow opacity-70 mt-6">↳ Full index below</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INDEX — list of all projects, image follows cursor on hover
   ============================================================ */
const INDEX_ITEMS = [
  { n:'01', title:'Zentry',     cat:'Landing · Motion',         year:'2025', repo:'https://github.com/WhiiteRose/Zentry',    hover:'images/ZentryHoover.png',    caption:'Cinematic gaming landing — GSAP & video transitions' },
  { n:'02', title:'Apple',      cat:'3D · Product page',        year:'2025', repo:'https://github.com/WhiiteRose/Apple',     hover:'images/AppleHoover.png',     caption:'Scroll-animated MacBook with R3F & Three.js' },
  { n:'03', title:'NeoMovie',   cat:'Fullstack · Streaming',    year:'2024', repo:'https://github.com/WhiiteRose/NeoMovie',  hover:'images/NeoMovieHoover.png',  caption:'Premium movie explorer — full-stack & Dockerized' },
  { n:'04', title:'Splyt',      cat:'Product landing · Motion', year:'2025', repo:'https://github.com/WhiiteRose/Splyt',     hover:'images/SplytHoover.png',     caption:'Caffeinated milkshake — ScrollTrigger choreography' },
  { n:'05', title:'3Drobot',    cat:'WebGL · Spline',           year:'2024', repo:'https://github.com/WhiiteRose/3Drobot',   hover:'images/3dRobot.png',         caption:'Interactive 3D scene built in Spline & AOS' },
  { n:'06', title:'SecMe',      cat:'Mobile · Flutter · Security', year:'2025', repo:'#',                                    hover:'images/SecMeHoover.png',     caption:'Flutter mobile app — secure-by-design architecture' },
];

function Index() {
  const root = useRef(null);
  const preview = useRef(null);
  const previewImg = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // rows rise in
      gsap.utils.toArray('.idx-row').forEach((row) => {
        gsap.fromTo(row,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 92%' }
          });
      });

      // preview follow
      const onMove = (e) => {
        gsap.to(preview.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' });
      };
      const onEnter = (e) => {
        const idx = e.currentTarget.dataset.idx;
        // swap which preview slide is shown
        if (preview.current) {
          preview.current.querySelectorAll('[data-preview-idx]').forEach((el) => {
            el.style.opacity = el.dataset.previewIdx === idx ? '1' : '0';
          });
        }
        gsap.to(preview.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
      };
      const onLeave = () => {
        gsap.to(preview.current, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'power3.out' });
      };

      window.addEventListener('mousemove', onMove);
      gsap.utils.toArray('.idx-row').forEach((row) => {
        row.addEventListener('mouseenter', onEnter);
        row.addEventListener('mouseleave', onLeave);
      });

      return () => {
        window.removeEventListener('mousemove', onMove);
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="index" ref={root} className="relative bg-milk text-ink py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="eyebrow mb-3"><span className="text-red">●</span> Index — N° 004</p>
            <h2 className="display text-[10vw] md:text-[7vw] leading-[0.86] tracking-ultra">
              Full <span className="display-italic text-red">archive.</span>
            </h2>
          </div>
          <p className="hidden md:block eyebrow opacity-60 max-w-[20rem] text-right">↳ Every project, sortable. Hover any row for a peek.</p>
        </div>

        <ul className="border-t hr-ink">
          {INDEX_ITEMS.map((it, i) => (
            <li
              key={it.n + it.title}
              data-idx={i}
              className="idx-row group border-b hr-ink py-6 md:py-8 flex items-baseline gap-6 cursor-pointer hover:px-4 transition-[padding] duration-500"
              data-cursor
              onClick={() => { if (it.repo && it.repo !== '#') window.open(it.repo, '_blank'); }}
            >
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase opacity-60 w-12">{it.n}</span>
              <span className="display text-[9vw] md:text-[5.5vw] leading-[1] tracking-ultra flex-1 group-hover:translate-x-2 transition-transform duration-700">
                {it.title}
              </span>
              <span className="hidden md:block eyebrow opacity-60 w-44">{it.cat}</span>
              <span className="eyebrow opacity-60 w-14 text-right">{it.year}</span>
              <span className="meta-arrow w-10 h-10 rounded-full bg-ink text-milk flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <Magnetic as="a" href="https://github.com/WhiiteRose" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-ink/30 hover:bg-ink hover:text-milk rounded-full px-8 py-4 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-500">
            ↳ See full archive on GitHub
          </Magnetic>
        </div>
      </div>

      {/* floating preview */}
      <div ref={preview} className="pointer-events-none fixed top-0 left-0 z-[80] hidden md:block overflow-hidden rounded-lg" style={{ width: 260, height: 340, opacity: 0, transform: 'translate(-50%,-50%) scale(0.6)', willChange:'transform', background:'#0A0908' }}>
        {INDEX_ITEMS.map((it, i) => it.hover ? (
          <div
            key={it.n + it.title}
            data-preview-idx={i}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: 0 }}
          >
            <img
              src={it.hover}
              alt={`${it.title} preview`}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* readability gradient */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(10,9,8,0.85) 0%, rgba(10,9,8,0.05) 22%, rgba(10,9,8,0.05) 65%, rgba(10,9,8,0.95) 100%)'
            }} />
            {/* title top */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 text-milk">
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase opacity-70">{it.n}</span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase opacity-70">{it.year}</span>
            </div>
            <div className="absolute top-7 left-3 right-3 text-milk">
              <h4 className="display text-[20px] leading-[0.95] tracking-tight">{it.title}</h4>
            </div>
            {/* caption bottom */}
            <div className="absolute bottom-3 left-3 right-3 text-milk">
              <p className="text-[10.5px] leading-[1.35] opacity-90 text-pretty">{it.caption}</p>
            </div>
          </div>
        ) : null)}
      </div>
    </section>
  );
}

/* ============================================================
   STACK — scroll-revealed grid, with rotating seal
   ============================================================ */
const STACK = [
  ['Languages',  ['TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'Haskell', 'Bash', 'SQL']],
  ['Web',        ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'HTML & CSS']],
  ['Backend',    ['Node.js', 'NestJS', 'Supabase', 'PostgreSQL', 'MongoDB', 'Firebase']],
  ['Mobile',     ['Flutter', 'Dart']],
  ['Motion / 3D', ['GSAP', 'ScrollTrigger', 'AOS', 'Spline', 'Three.js / R3F']],
  ['AI / Data',  ['PyTorch', 'Python']],
  ['Tooling',    ['Vite', 'Docker', 'Git', 'GitHub', 'Linux']],
  ['Security',   ['Pentesting', 'Forensics', 'OSINT', 'Secure-by-design']],
];

function Stack() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.stack-row').forEach((row, i) => {
        gsap.fromTo(row,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, ease: 'expo.out', delay: i * 0.04,
            scrollTrigger: { trigger: row, start: 'top 90%' }
          });
      });
      gsap.fromTo('.stack-title-line',
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06,
          scrollTrigger: { trigger: '.stack-heading', start: 'top 80%' }
        });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={root} className="relative bg-ink text-milk py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 dotgrid-dark opacity-30 pointer-events-none" />
      <div className="relative max-w-[1800px] mx-auto">
        <div className="flex items-start justify-between mb-16 md:mb-24">
          <div className="stack-heading">
            <p className="eyebrow opacity-70 mb-3"><span className="text-red">●</span> Stack — N° 005</p>
            <h2 className="display text-[10vw] md:text-[7vw] leading-[0.86] tracking-ultra">
              <span className="block reveal-mask"><span className="stack-title-line inline-block">Tools of</span></span>
              <span className="block reveal-mask"><span className="stack-title-line inline-block display-italic text-red">the trade.</span></span>
            </h2>
          </div>

          {/* spinning seal */}
          <div className="hidden md:flex w-40 h-40 lg:w-48 lg:h-48 rounded-full border border-milk/30 items-center justify-center relative shrink-0">
            <svg className="absolute inset-0 spin-slow" viewBox="0 0 100 100">
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="6.4" fill="#F5F2EC" letterSpacing="2">
                <textPath href="#circ">SEEKING END-OF-STUDY ROLE · 2026 · SEEKING END-OF-STUDY ROLE · 2026 · </textPath>
              </text>
            </svg>
            <span className="w-3 h-3 bg-red rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {STACK.map(([cat, items]) => (
            <div key={cat} className="stack-row border-t hr-milk pt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <p className="eyebrow opacity-60">{cat}</p>
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-6 gap-y-3 text-2xl md:text-3xl tracking-tight">
                {items.map((t) => (
                  <span key={t} className="ul-link" data-cursor>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* services / process strip */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t hr-milk pt-10">
          {[
            ['01', 'Web Development',       'React · Next · TypeScript — fast, opinionated, motion-first interfaces.'],
            ['02', 'Mobile Development',    'Flutter apps with clean component systems & native-feel motion.'],
            ['03', 'Security Mindset',      'Pentest, forensics & OSINT — secure-by-design from day one.'],
          ].map(([n, t, d]) => (
            <div key={n} className="flex flex-col gap-3">
              <span className="eyebrow opacity-60">{n} — Focus</span>
              <h4 className="text-2xl md:text-3xl tracking-tight">{t}</h4>
              <p className="opacity-70 text-pretty">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT — sticky reveal with huge type + magnetic CTA
   ============================================================ */
function Contact() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.contact-line').forEach((el) => {
        gsap.fromTo(el,
          { yPercent: 120, rotate: 4 },
          {
            yPercent: 0, rotate: 0, duration: 1.3, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative bg-milk text-ink py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <p className="eyebrow mb-8"><span className="text-red">●</span> Contact — N° 006</p>
        <h2 className="display text-[18vw] md:text-[14vw] leading-[0.84] tracking-ultra">
          <span className="block reveal-mask"><span className="contact-line inline-block">Got an</span></span>
          <span className="block reveal-mask"><span className="contact-line inline-block display-italic text-red">idea?</span></span>
          <span className="block reveal-mask"><span className="contact-line inline-block">Let's talk.</span></span>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <Magnetic as="a" href="mailto:tomroger.emailpro@gmail.com" className="inline-flex items-center gap-10 bg-ink text-milk rounded-full pl-10 pr-8 py-4">
              <span className="text-xl md:text-2xl">Get in touch</span>
              <span className="w-14 h-14 rounded-full bg-red flex items-center justify-center text-2xl shrink-0">→</span>
            </Magnetic>
          </div>
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4 font-mono text-[11px] tracking-[0.16em] uppercase">
            <div>
              <div className="opacity-50 mb-1">Based</div>
              <div>Paris, FR<br/>Mobile across France · Remote-friendly</div>
            </div>
            <div>
              <div className="opacity-50 mb-1">Status</div>
              <div><span className="inline-block w-2 h-2 rounded-full bg-red mr-2 animate-pulse" />Seeking end-of-study role — 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // refresh ScrollTrigger after fonts load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, [loading]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <CursorDot />
      <Nav />
      <main className="relative">
        <Hero />
        <Manifesto />
        <About />
        <WorkShowcase />
        <Index />
        <Stack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
