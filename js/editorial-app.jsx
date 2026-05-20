/* global React, ReactDOM, PR_DATA */
const { useState, useEffect, useRef, useMemo } = React;
const { PROFILE, FILTERS, PROJECTS, TIMELINE, TECH_SKILLS, SOFT_SKILLS, CERTIFICATIONS } = window.PR_DATA;

/* =========================================================
   Tweak defaults (persisted by host)
   ========================================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#F06543",
  "fontPairing": "sans",
  "showGrid": true
} /*EDITMODE-END*/;

// Tomato · Mustard · School-bus yellow · Dark amethyst
const ACCENT_OPTIONS = ["#F06543", "#FFD95C", "#FFC300", "#25003D"];
const FONT_PAIRINGS = {
  editorial: {
    label: "Editorial",
    display: '"Newsreader", Georgia, serif',
    sans: '"Geist", -apple-system, system-ui, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace'
  },
  modern: {
    label: "Modern",
    display: '"Instrument Serif", Georgia, serif',
    sans: '"Geist", -apple-system, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace'
  },
  sans: {
    label: "Sans",
    display: '"Geist", -apple-system, system-ui, sans-serif',
    sans: '"Geist", -apple-system, system-ui, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace'
  }
};

/* =========================================================
   Helpers
   ========================================================= */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .rw, .draw-rule");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Walk a children tree into flat [{text, style, className}] segments. */
function flattenSegments(node, inherited = { style: null, className: null }) {
  if (node == null || node === false || node === true) return [];
  if (typeof node === "string" || typeof node === "number") {
    return [{ text: String(node), style: inherited.style, className: inherited.className }];
  }
  if (Array.isArray(node)) {
    return node.flatMap((n) => flattenSegments(n, inherited));
  }
  if (React.isValidElement(node)) {
    const merged = {
      style: { ...(inherited.style || {}), ...(node.props.style || {}) },
      className: [inherited.className, node.props.className].filter(Boolean).join(" ") || null
    };
    return flattenSegments(node.props.children, merged);
  }
  return [];
}

/* Word-by-word mask reveal. Children may include accent-styled spans. */
function RevealWords({ children, stagger = 60, baseDelay = 0, as = "span", className = "" }) {
  const segments = flattenSegments(children);
  // Split each segment text on whitespace, preserving inline style/className per token.
  const tokens = segments.flatMap((seg) =>
  seg.text.split(/(\s+)/).filter(Boolean).map((t) => ({
    text: t,
    style: seg.style,
    className: seg.className
  }))
  );
  const Tag = as;
  let wordIdx = 0;
  return (
    <Tag className={className}>
      {tokens.map((tk, i) => {
        if (/^\s+$/.test(tk.text)) return <span key={i} className="rw-space"> </span>;
        const delay = baseDelay + wordIdx * stagger;
        wordIdx++;
        return (
          <span key={i} className="rw" style={{ transitionDelay: `${delay}ms` }}>
            <span style={{ ...(tk.style || {}), transitionDelay: `${delay}ms` }} className={tk.className || undefined}>
              {tk.text}
            </span>
          </span>);

      })}
    </Tag>);

}

/* Cycling typewriter — types and deletes one item at a time. */
function Typewriter({ items, typeSpeed = 65, deleteSpeed = 35, hold = 1600, className = "" }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting

  useEffect(() => {
    const word = items[idx % items.length];
    let timeout;
    if (phase === "typing") {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), hold);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        setIdx((i) => i + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, idx, items, typeSpeed, deleteSpeed, hold]);

  return (
    <span className={`tw ${className}`}>
      <span>{text}</span>
      <span className="caret" aria-hidden="true"></span>
    </span>);

}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join(",")]);
  return active;
}

/* =========================================================
   Nav
   ========================================================= */

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(["hero", "work", "about", "experience", "skills", "contact"]);

  const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" }];


  return (
    <header className={`nav ${scrolled ? "scrolled" : ""} ${open ? "nav-mobile-open" : ""}`}>
      <div className="nav-inner">
        <a href="#hero" className="brand" onClick={() => setOpen(false)}>
          <span className="mark" aria-hidden="true">
            <span className="p">P</span>
            <span className="r">r</span>
          </span>
          <span><span className="who">Pedro Rodríguez</span> &nbsp;/&nbsp; <b>Portfolio ’26</b></span>
        </a>
        <nav id="primary-navigation" className="nav-links" aria-label="Primary navigation">
          {links.map((l) =>
          <a key={l.id} href={`#${l.id}`}
          className={active === l.id ? "active" : ""}
          onClick={() => setOpen(false)}>
              {l.label}
            </a>
          )}
        </nav>
        <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
          Get in touch ↗
        </a>
        <button className="nav-burger" aria-label="Menu" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>);

}

/* =========================================================
   Hero
   ========================================================= */

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <span className="eyebrow">Available — Mérida, México · UTC−6</span>
            <h1>
              <RevealWords stagger={90} baseDelay={120}>Pedro</RevealWords><br />
              <RevealWords stagger={90} baseDelay={280} className="nowrap">
                <span>Rodríguez</span><span className="amp">.</span>
              </RevealWords>
            </h1>
            <div className="hero-roles">
              <span className="role-rotator" style={{ minWidth: "14ch" }}>
                <Typewriter items={["Physician", "Data Scientist", "ML / LLMs Builder", "Problem Solver"]} />
              </span>
            </div>
          </div>
          <div className="hero-right">
            <p className="hero-intro reveal">
              I’m a general practitioner with a <em style={{ fontStyle: "italic", color: "var(--accent)" }}>neuroscience focus</em> who turned self-directed coding into a data science practice. I translate clinical and business questions into datasets, ML prototypes, and decision-support tools.
            </p>
            <div className="hero-cta">
              <a href="#work" className="btn btn-primary">
                View selected work <span className="arrow">→</span>
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
            </div>
            <div className="hero-meta">
              <div className="field">
                <span className="key">Focus</span>
                <span className="val">Medicine × Code × Data</span>
              </div>
              <div className="field">
                <span className="key">Status</span>
                <span className="val">Open to roles & collabs</span>
              </div>
              <div className="field">
                <span className="key">Based in</span>
                <span className="val">Mérida, México</span>
              </div>
              <div className="field">
                <span className="key">Currently</span>
                <span className="val">CAIS Médica · GP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="status-strip">
          <div className="stat">
            <span className="num">10+</span>
            <span className="lbl">Projects shipped</span>
          </div>
          <div className="stat">
            <span className="num">2</span>
            <span className="lbl">Cloud certs</span>
          </div>
          <div className="stat">
            <span className="num">M.D.</span>
            <span className="lbl">Universidad Autónoma de Yucatán</span>
          </div>
          <div className="stat">
            <span className="num">∞</span>
            <span className="lbl">Hypotheses to validate</span>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   Work / Projects
   ========================================================= */

function Projects() {
  const [filter, setFilter] = useState("destacados");
  const [openId, setOpenId] = useState(null);

  const visible = useMemo(() => {
    if (filter === "todos") return PROJECTS;
    if (filter === "destacados") return PROJECTS.filter((p) => p.areas.includes("destacados"));
    return PROJECTS.filter((p) => p.areas.includes(filter));
  }, [filter]);

  return (
    <section id="work">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono label">01 / Selected Work</span>
          <div>
            <h2>
              <RevealWords stagger={70}>Things I’ve built &mdash;</RevealWords><br />
              <RevealWords stagger={70} baseDelay={200}>shipped or in progress.</RevealWords>
            </h2>
            <p className="lede">
              Case studies and applied projects that show how I gather data, model it, and turn it into decisions. Click any row to expand.
            </p>
          </div>
        </div>

        <div className="filters reveal">
          {FILTERS.map((f) =>
          <button key={f.id}
          className={`filter-chip ${filter === f.id ? "active" : ""}`}
          onClick={() => {setFilter(f.id);setOpenId(null);}}>
              {f.label}
            </button>
          )}
        </div>

        <ul className="project-list reveal">
          {visible.map((p, i) => {
            const isOpen = openId === p.id;
            const toggleProject = () => setOpenId(isOpen ? null : p.id);
            const onProjectKeyDown = (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleProject();
              }
            };
            return (
              <li key={p.id}
              className={`project-row ${isOpen ? "open" : ""}`}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={toggleProject}
              onKeyDown={onProjectKeyDown}>
                <div className="project-head">
                  <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="project-title">{p.title}</span>
                  <span className="project-year">{p.year}</span>
                  <span className="project-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div className="project-detail">
                  <span></span>
                  <div>
                    <p className="body">{p.description}</p>
                    <div className="tags">
                      {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="links">
                      {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Source ↗</a>}
                      {p.notebook && <a href={p.notebook} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Notebook ↗</a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Demo ↗</a>}
                    </div>
                  </div>
                </div>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}

/* =========================================================
   About
   ========================================================= */

function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono label">02 / About</span>
          <div>
            <h2>
              <RevealWords stagger={70}>Hybrid by training,</RevealWords><br />
              <RevealWords stagger={70} baseDelay={200}>analytical by habit.</RevealWords>
            </h2>
          </div>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I started as a self-taught developer and turned curiosity into <em>production work</em>: streamlining clinical workflows with macros and structured data, building ML pipelines, shaping executive dashboards.
            </p>
            <p>
              I thrive under pressure, collaborate well with multidisciplinary teams, and treat every challenge as a hypothesis to validate.
            </p>
          </div>
          <div className="about-side reveal">
            <div className="field">
              <span className="key">Discipline</span>
              <span className="val">General Practitioner with a neuroscience-focused medical education.</span>
            </div>
            <div className="field">
              <span className="key">Stack</span>
              <span className="val">
                <span className="pill">Python</span>
                <span className="pill">Pandas</span>
                <span className="pill">Scikit-learn</span>
                <span className="pill">SQL</span>
                <span className="pill">Plotly / Dash</span>
                <span className="pill">Azure</span>
                <span className="pill">Swift</span>
              </span>
            </div>
            <div className="field">
              <span className="key">Looking for</span>
              <span className="val">Roles bridging clinical insight with analytics and product strategy.</span>
            </div>
            <div className="field">
              <span className="key">Languages</span>
              <span className="val">Spanish (native), English (professional).</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   Experience Timeline
   ========================================================= */

function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono label">03 / Experience & Education</span>
          <div>
            <h2>
              <RevealWords stagger={70}>A clinical track,</RevealWords><br />
              <RevealWords stagger={70} baseDelay={200}>a data trajectory.</RevealWords>
            </h2>
            <p className="lede">
              Clinical practice, data-driven initiatives, and continuous education that support a hybrid profile.
            </p>
          </div>
        </div>
        <ul className="timeline-list reveal">
          {TIMELINE.map((t, i) =>
          <li key={i} className={`timeline-row ${t.kind}`}>
              <div className="year">
                {t.year}
                <span className="kind-label">{t.kind === "education" ? "Education" : "Role"}</span>
              </div>
              <div className="dot"><span></span></div>
              <div className="body">
                <h3>{t.title}</h3>
                <p className="org">{t.org}</p>
                <p className="desc">{t.description}</p>
                <div className="tags">
                  {t.tags.map((tg) => <span key={tg} className="tag">{tg}</span>)}
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

/* =========================================================
   Skills
   ========================================================= */

function SkillBar({ s, idx }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("in-view");
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="skill-bar" style={{ "--lvl": s.level / 100 }}>
      <span className="name">{s.name}</span>
      <span className="num">{s.level}%</span>
      <span className="track"><span className="fill" style={{ transitionDelay: `${idx * 60}ms` }}></span></span>
    </div>);

}

function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono label">04 / Skills</span>
          <div>
            <h2>
              <RevealWords stagger={70}>Tools, methods,</RevealWords><br />
              <RevealWords stagger={70} baseDelay={200}>and ways of working.</RevealWords>
            </h2>
          </div>
        </div>
        <div className="skills-grid">
          <div className="skills-col reveal">
            <h3>Technical</h3>
            {TECH_SKILLS.map((s, i) => <SkillBar key={s.name} s={s} idx={i} />)}
          </div>
          <div className="skills-col reveal">
            <h3>Soft skills</h3>
            <ul className="soft-list">
              {SOFT_SKILLS.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="skills-col reveal">
            <h3>Certifications</h3>
            <ul className="cert-list">
              {CERTIFICATIONS.map((c) =>
              <li key={c.name}>
                  <span className="nm">{c.name}</span>
                  <span className="yr">{c.year}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   Contact
   ========================================================= */

function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-wrap reveal">
          <span className="kicker">05 / Contact</span>
          <h2>
            <RevealWords stagger={70}>Let’s build</RevealWords><br />
            <span>something </span>
            <span className="tw-accent">
              <Typewriter
                items={["useful", "emotional", "amazing", "impossible", "original"]}
                typeSpeed={85}
                deleteSpeed={45}
                hold={1800} />
              
            </span>
            <span>.</span>
          </h2>
          <a className="contact-email" href={`mailto:${PROFILE.email}`}>
            <span className="dot"></span>
            {PROFILE.email}
          </a>
          <div className="contact-links">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={PROFILE.notion} target="_blank" rel="noopener noreferrer">Notion ↗</a>
            <a href="https://www.kaggle.com/pedrorgz" target="_blank" rel="noopener noreferrer">Kaggle ↗</a>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   Footer
   ========================================================= */

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© 2026 Pedro Rodríguez · All rights reserved</span>
        <span>Designed & coded with care · Mérida, MX</span>
      </div>
    </footer>);

}

/* =========================================================
   Tweaks Panel
   ========================================================= */

function PortfolioTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio label="Mode" value={t.theme}
        onChange={(v) => setTweak("theme", v)}
        options={[
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }]
        } />
      </TweakSection>
      <TweakSection label="Accent">
        <TweakColor label="Accent color" value={t.accent}
        onChange={(v) => setTweak("accent", v)}
        options={ACCENT_OPTIONS} />
      </TweakSection>
      <TweakSection label="Typography">
        <TweakSelect label="Font pairing" value={t.fontPairing}
        onChange={(v) => setTweak("fontPairing", v)}
        options={Object.entries(FONT_PAIRINGS).map(([k, v]) => ({ value: k, label: v.label }))} />
      </TweakSection>
      <TweakSection label="Grid overlay">
        <TweakToggle value={t.showGrid}
        onChange={(v) => setTweak("showGrid", v)}
        label="Show 12-col guide" />
      </TweakSection>
    </TweaksPanel>);

}

/* =========================================================
   Root
   ========================================================= */

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Apply theme + tokens to documentElement
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", t.theme);
    html.style.setProperty("--accent", t.accent);
    // accent-soft = ~14% alpha of accent (24 hex)
    html.style.setProperty("--accent-soft", `${t.accent}24`);
    // Pick a readable ink for accent backgrounds — dark amethyst on yellows, white otherwise
    const yellowish = ["#FFD95C", "#FFC300"].includes(t.accent.toUpperCase());
    html.style.setProperty("--accent-ink", yellowish ? "#25003D" : "#FFFFFF");
    // pairing
    const fp = FONT_PAIRINGS[t.fontPairing] || FONT_PAIRINGS.editorial;
    html.style.setProperty("--font-display", fp.display);
    html.style.setProperty("--font-sans", fp.sans);
    html.style.setProperty("--font-mono", fp.mono);
  }, [t.theme, t.accent, t.fontPairing]);

  return (
    <React.Fragment>
      {t.showGrid && <div className="bg-grid" aria-hidden="true"></div>}
      <a className="skip" href="#hero">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </main>
      <PortfolioTweaks t={t} setTweak={setTweak} />
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
