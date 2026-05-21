(() => {
  // js/editorial-app.jsx
  var { useState, useEffect, useRef, useMemo } = React;
  var { PROFILE, FILTERS, PROJECTS, TIMELINE, TECH_SKILLS, SOFT_SKILLS, CERTIFICATIONS } = window.PR_DATA;
  var TWEAK_DEFAULTS = (
    /*EDITMODE-BEGIN*/
    {
      "theme": "light",
      "accent": "#F06543",
      "fontPairing": "sans",
      "showGrid": true
    }
  );
  var ACCENT_OPTIONS = ["#F06543", "#FFD95C", "#FFC300", "#25003D"];
  var FONT_PAIRINGS = {
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
        style: { ...inherited.style || {}, ...node.props.style || {} },
        className: [inherited.className, node.props.className].filter(Boolean).join(" ") || null
      };
      return flattenSegments(node.props.children, merged);
    }
    return [];
  }
  function RevealWords({ children, stagger = 60, baseDelay = 0, as = "span", className = "" }) {
    const segments = flattenSegments(children);
    const tokens = segments.flatMap(
      (seg) => seg.text.split(/(\s+)/).filter(Boolean).map((t) => ({
        text: t,
        style: seg.style,
        className: seg.className
      }))
    );
    const Tag = as;
    let wordIdx = 0;
    return /* @__PURE__ */ React.createElement(Tag, { className }, tokens.map((tk, i) => {
      if (/^\s+$/.test(tk.text)) return /* @__PURE__ */ React.createElement("span", { key: i, className: "rw-space" }, " ");
      const delay = baseDelay + wordIdx * stagger;
      wordIdx++;
      return /* @__PURE__ */ React.createElement("span", { key: i, className: "rw", style: { transitionDelay: `${delay}ms` } }, /* @__PURE__ */ React.createElement("span", { style: { ...tk.style || {}, transitionDelay: `${delay}ms` }, className: tk.className || void 0 }, tk.text));
    }));
  }
  function Typewriter({ items, typeSpeed = 65, deleteSpeed = 35, hold = 1600, className = "" }) {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState("");
    const [phase, setPhase] = useState("typing");
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
    return /* @__PURE__ */ React.createElement("span", { className: `tw ${className}` }, /* @__PURE__ */ React.createElement("span", null, text), /* @__PURE__ */ React.createElement("span", { className: "caret", "aria-hidden": "true" }));
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
  function Nav() {
    const scrolled = useScrolled();
    const [open, setOpen] = useState(false);
    const active = useActiveSection(["hero", "work", "about", "experience", "skills", "contact"]);
    const links = [
      { id: "work", label: "Work" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Skills" }
    ];
    return /* @__PURE__ */ React.createElement("header", { className: `nav ${scrolled ? "scrolled" : ""} ${open ? "nav-mobile-open" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "nav-inner" }, /* @__PURE__ */ React.createElement("a", { href: "#hero", className: "brand", onClick: () => setOpen(false) }, /* @__PURE__ */ React.createElement("span", { className: "mark", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "p" }, "P"), /* @__PURE__ */ React.createElement("span", { className: "r" }, "r")), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "who" }, "Pedro Rodr\xEDguez"), " \xA0/\xA0 ", /* @__PURE__ */ React.createElement("b", null, "Portfolio \u201926"))), /* @__PURE__ */ React.createElement("nav", { id: "primary-navigation", className: "nav-links", "aria-label": "Primary navigation" }, links.map(
      (l) => /* @__PURE__ */ React.createElement(
        "a",
        {
          key: l.id,
          href: `#${l.id}`,
          className: active === l.id ? "active" : "",
          onClick: () => setOpen(false)
        },
        l.label
      )
    )), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "nav-cta", onClick: () => setOpen(false) }, "Get in touch \u2197"), /* @__PURE__ */ React.createElement("button", { className: "nav-burger", "aria-label": "Menu", "aria-expanded": open, "aria-controls": "primary-navigation", onClick: () => setOpen((o) => !o) }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null))));
  }
  function Hero() {
    return /* @__PURE__ */ React.createElement("section", { id: "hero", className: "hero" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "hero-grid" }, /* @__PURE__ */ React.createElement("div", { className: "hero-left" }, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Available \u2014 M\xE9rida, M\xE9xico \xB7 UTC\u22126"), /* @__PURE__ */ React.createElement("h1", null, /* @__PURE__ */ React.createElement(RevealWords, { stagger: 90, baseDelay: 120 }, "Pedro"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(RevealWords, { stagger: 90, baseDelay: 280, className: "nowrap" }, /* @__PURE__ */ React.createElement("span", null, "Rodr\xEDguez"), /* @__PURE__ */ React.createElement("span", { className: "amp" }, "."))), /* @__PURE__ */ React.createElement("div", { className: "hero-roles" }, /* @__PURE__ */ React.createElement("span", { className: "role-rotator", style: { minWidth: "14ch" } }, /* @__PURE__ */ React.createElement(Typewriter, { items: ["Physician", "Data Scientist", "ML / LLMs Builder", "Problem Solver"] })))), /* @__PURE__ */ React.createElement("div", { className: "hero-right" }, /* @__PURE__ */ React.createElement("p", { className: "hero-intro reveal" }, "I\u2019m a general practitioner with a ", /* @__PURE__ */ React.createElement("em", { style: { fontStyle: "italic", color: "var(--accent)" } }, "neuroscience focus"), " who turned self-directed coding into a data science practice. I translate clinical and business questions into datasets, ML prototypes, and decision-support tools."), /* @__PURE__ */ React.createElement("div", { className: "hero-cta" }, /* @__PURE__ */ React.createElement("a", { href: "#work", className: "btn btn-primary" }, "View selected work ", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "btn btn-ghost" }, "Get in touch")), /* @__PURE__ */ React.createElement("div", { className: "hero-meta" }, /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Focus"), /* @__PURE__ */ React.createElement("span", { className: "val" }, "Medicine \xD7 Code \xD7 Data")), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Status"), /* @__PURE__ */ React.createElement("span", { className: "val" }, "Open to roles & collabs")), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Based in"), /* @__PURE__ */ React.createElement("span", { className: "val" }, "M\xE9rida, M\xE9xico")), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Currently"), /* @__PURE__ */ React.createElement("span", { className: "val" }, "CAIS M\xE9dica \xB7 GP"))))), /* @__PURE__ */ React.createElement("div", { className: "status-strip" }, /* @__PURE__ */ React.createElement("div", { className: "stat" }, /* @__PURE__ */ React.createElement("span", { className: "num" }, "10+"), /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "Projects shipped")), /* @__PURE__ */ React.createElement("div", { className: "stat" }, /* @__PURE__ */ React.createElement("span", { className: "num" }, "2"), /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "Cloud certs")), /* @__PURE__ */ React.createElement("div", { className: "stat" }, /* @__PURE__ */ React.createElement("span", { className: "num" }, "M.D."), /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "Universidad Aut\xF3noma de Yucat\xE1n")), /* @__PURE__ */ React.createElement("div", { className: "stat" }, /* @__PURE__ */ React.createElement("span", { className: "num" }, "\u221E"), /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "Hypotheses to validate")))));
  }
  function Projects() {
    const [filter, setFilter] = useState("destacados");
    const [openId, setOpenId] = useState(null);
    const visible = useMemo(() => {
      if (filter === "todos") return PROJECTS;
      if (filter === "destacados") return PROJECTS.filter((p) => p.areas.includes("destacados"));
      return PROJECTS.filter((p) => p.areas.includes(filter));
    }, [filter]);
    return /* @__PURE__ */ React.createElement("section", { id: "work" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "section-head reveal" }, /* @__PURE__ */ React.createElement("span", { className: "mono label" }, "01 / Selected Work"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70 }, "Things I\u2019ve built \u2014"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70, baseDelay: 200 }, "shipped or in progress.")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Case studies and applied projects that show how I gather data, model it, and turn it into decisions. Click any row to expand."))), /* @__PURE__ */ React.createElement("div", { className: "filters reveal" }, FILTERS.map(
      (f) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: f.id,
          className: `filter-chip ${filter === f.id ? "active" : ""}`,
          onClick: () => {
            setFilter(f.id);
            setOpenId(null);
          }
        },
        f.label
      )
    )), /* @__PURE__ */ React.createElement("ul", { className: "project-list reveal" }, visible.map((p, i) => {
      const isOpen = openId === p.id;
      const toggleProject = () => setOpenId(isOpen ? null : p.id);
      const onProjectKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleProject();
        }
      };
      return /* @__PURE__ */ React.createElement(
        "li",
        {
          key: p.id,
          className: `project-row ${isOpen ? "open" : ""}`,
          role: "button",
          tabIndex: 0,
          "aria-expanded": isOpen,
          onClick: toggleProject,
          onKeyDown: onProjectKeyDown
        },
        /* @__PURE__ */ React.createElement("div", { className: "project-head" }, /* @__PURE__ */ React.createElement("span", { className: "project-num" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", { className: "project-title" }, p.title), /* @__PURE__ */ React.createElement("span", { className: "project-year" }, p.year), /* @__PURE__ */ React.createElement("span", { className: "project-arrow", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M3 11L11 3M11 3H4.5M11 3V9.5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" })))),
        /* @__PURE__ */ React.createElement("div", { className: "project-detail" }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "body" }, p.description), /* @__PURE__ */ React.createElement("div", { className: "tags" }, p.tags.map((t) => /* @__PURE__ */ React.createElement("span", { key: t, className: "tag" }, t))), /* @__PURE__ */ React.createElement("div", { className: "links" }, p.code && /* @__PURE__ */ React.createElement("a", { href: p.code, target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation() }, "Source \u2197"), p.notebook && /* @__PURE__ */ React.createElement("a", { href: p.notebook, target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation() }, "Notebook \u2197"), p.demo && /* @__PURE__ */ React.createElement("a", { href: p.demo, target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation() }, "Demo \u2197"))))
      );
    }))));
  }
  function About() {
    return /* @__PURE__ */ React.createElement("section", { id: "about" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "section-head reveal" }, /* @__PURE__ */ React.createElement("span", { className: "mono label" }, "02 / About"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70 }, "Hybrid by training,"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70, baseDelay: 200 }, "analytical by habit.")))), /* @__PURE__ */ React.createElement("div", { className: "about-grid" }, /* @__PURE__ */ React.createElement("div", { className: "about-text reveal" }, /* @__PURE__ */ React.createElement("p", null, "I started as a self-taught developer and turned curiosity into ", /* @__PURE__ */ React.createElement("em", null, "production work"), ": streamlining clinical workflows with macros and structured data, building ML pipelines, shaping executive dashboards."), /* @__PURE__ */ React.createElement("p", null, "I thrive under pressure, collaborate well with multidisciplinary teams, and treat every challenge as a hypothesis to validate.")), /* @__PURE__ */ React.createElement("div", { className: "about-side reveal" }, /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Discipline"), /* @__PURE__ */ React.createElement("span", { className: "val" }, "General Practitioner with a neuroscience-focused medical education.")), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Stack"), /* @__PURE__ */ React.createElement("span", { className: "val" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, "Python"), /* @__PURE__ */ React.createElement("span", { className: "pill" }, "Pandas"), /* @__PURE__ */ React.createElement("span", { className: "pill" }, "Scikit-learn"), /* @__PURE__ */ React.createElement("span", { className: "pill" }, "SQL"), /* @__PURE__ */ React.createElement("span", { className: "pill" }, "Plotly / Dash"), /* @__PURE__ */ React.createElement("span", { className: "pill" }, "Azure"), /* @__PURE__ */ React.createElement("span", { className: "pill" }, "Swift"))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Looking for"), /* @__PURE__ */ React.createElement("span", { className: "val" }, "Roles bridging clinical insight with analytics and product strategy.")), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("span", { className: "key" }, "Languages"), /* @__PURE__ */ React.createElement("span", { className: "val" }, "Spanish (native), English (professional)."))))));
  }
  function Experience() {
    return /* @__PURE__ */ React.createElement("section", { id: "experience" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "section-head reveal" }, /* @__PURE__ */ React.createElement("span", { className: "mono label" }, "03 / Experience & Education"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70 }, "A clinical track,"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70, baseDelay: 200 }, "a data trajectory.")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Clinical practice, data-driven initiatives, and continuous education that support a hybrid profile."))), /* @__PURE__ */ React.createElement("ul", { className: "timeline-list reveal" }, TIMELINE.map(
      (t, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: `timeline-row ${t.kind}` }, /* @__PURE__ */ React.createElement("div", { className: "year" }, t.year, /* @__PURE__ */ React.createElement("span", { className: "kind-label" }, t.kind === "education" ? "Education" : "Role")), /* @__PURE__ */ React.createElement("div", { className: "dot" }, /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h3", null, t.title), /* @__PURE__ */ React.createElement("p", { className: "org" }, t.org), /* @__PURE__ */ React.createElement("p", { className: "desc" }, t.description), /* @__PURE__ */ React.createElement("div", { className: "tags" }, t.tags.map((tg) => /* @__PURE__ */ React.createElement("span", { key: tg, className: "tag" }, tg)))))
    ))));
  }
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
    return /* @__PURE__ */ React.createElement("div", { ref, className: "skill-bar", style: { "--lvl": s.level / 100 } }, /* @__PURE__ */ React.createElement("span", { className: "name" }, s.name), /* @__PURE__ */ React.createElement("span", { className: "num" }, s.level, "%"), /* @__PURE__ */ React.createElement("span", { className: "track" }, /* @__PURE__ */ React.createElement("span", { className: "fill", style: { transitionDelay: `${idx * 60}ms` } })));
  }
  function Skills() {
    return /* @__PURE__ */ React.createElement("section", { id: "skills" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "section-head reveal" }, /* @__PURE__ */ React.createElement("span", { className: "mono label" }, "04 / Skills"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70 }, "Tools, methods,"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70, baseDelay: 200 }, "and ways of working.")))), /* @__PURE__ */ React.createElement("div", { className: "skills-grid" }, /* @__PURE__ */ React.createElement("div", { className: "skills-col reveal" }, /* @__PURE__ */ React.createElement("h3", null, "Technical"), TECH_SKILLS.map((s, i) => /* @__PURE__ */ React.createElement(SkillBar, { key: s.name, s, idx: i }))), /* @__PURE__ */ React.createElement("div", { className: "skills-col reveal" }, /* @__PURE__ */ React.createElement("h3", null, "Soft skills"), /* @__PURE__ */ React.createElement("ul", { className: "soft-list" }, SOFT_SKILLS.map((s) => /* @__PURE__ */ React.createElement("li", { key: s }, s)))), /* @__PURE__ */ React.createElement("div", { className: "skills-col reveal" }, /* @__PURE__ */ React.createElement("h3", null, "Certifications"), /* @__PURE__ */ React.createElement("ul", { className: "cert-list" }, CERTIFICATIONS.map(
      (c) => /* @__PURE__ */ React.createElement("li", { key: c.name }, /* @__PURE__ */ React.createElement("span", { className: "nm" }, c.name), /* @__PURE__ */ React.createElement("span", { className: "yr" }, c.year))
    ))))));
  }
  function Contact() {
    return /* @__PURE__ */ React.createElement("section", { id: "contact" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "contact-wrap reveal" }, /* @__PURE__ */ React.createElement("span", { className: "kicker" }, "05 / Contact"), /* @__PURE__ */ React.createElement("h2", null, /* @__PURE__ */ React.createElement(RevealWords, { stagger: 70 }, "Let\u2019s build"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, "something "), /* @__PURE__ */ React.createElement("span", { className: "tw-accent" }, /* @__PURE__ */ React.createElement(
      Typewriter,
      {
        items: ["useful", "emotional", "amazing", "impossible", "original"],
        typeSpeed: 85,
        deleteSpeed: 45,
        hold: 1800
      }
    )), /* @__PURE__ */ React.createElement("span", null, ".")), /* @__PURE__ */ React.createElement("a", { className: "contact-email", href: `mailto:${PROFILE.email}` }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), PROFILE.email), /* @__PURE__ */ React.createElement("div", { className: "contact-links" }, /* @__PURE__ */ React.createElement("a", { href: PROFILE.github, target: "_blank", rel: "noopener noreferrer" }, "GitHub \u2197"), /* @__PURE__ */ React.createElement("a", { href: PROFILE.linkedin, target: "_blank", rel: "noopener noreferrer" }, "LinkedIn \u2197"), /* @__PURE__ */ React.createElement("a", { href: PROFILE.notion, target: "_blank", rel: "noopener noreferrer" }, "Notion \u2197"), /* @__PURE__ */ React.createElement("a", { href: "https://www.kaggle.com/pedrorgz", target: "_blank", rel: "noopener noreferrer" }, "Kaggle \u2197")))));
  }
  function Footer() {
    return /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("span", null, "\xA9 2026 Pedro Rodr\xEDguez \xB7 All rights reserved"), /* @__PURE__ */ React.createElement("span", null, "Designed & coded with care \xB7 M\xE9rida, MX")));
  }
  function PortfolioTweaks({ t, setTweak }) {
    return /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: "Theme" }, /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "Mode",
        value: t.theme,
        onChange: (v) => setTweak("theme", v),
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" }
        ]
      }
    )), /* @__PURE__ */ React.createElement(TweakSection, { label: "Accent" }, /* @__PURE__ */ React.createElement(
      TweakColor,
      {
        label: "Accent color",
        value: t.accent,
        onChange: (v) => setTweak("accent", v),
        options: ACCENT_OPTIONS
      }
    )), /* @__PURE__ */ React.createElement(TweakSection, { label: "Typography" }, /* @__PURE__ */ React.createElement(
      TweakSelect,
      {
        label: "Font pairing",
        value: t.fontPairing,
        onChange: (v) => setTweak("fontPairing", v),
        options: Object.entries(FONT_PAIRINGS).map(([k, v]) => ({ value: k, label: v.label }))
      }
    )), /* @__PURE__ */ React.createElement(TweakSection, { label: "Grid overlay" }, /* @__PURE__ */ React.createElement(
      TweakToggle,
      {
        value: t.showGrid,
        onChange: (v) => setTweak("showGrid", v),
        label: "Show 12-col guide"
      }
    )));
  }
  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    useReveal();
    useEffect(() => {
      const html = document.documentElement;
      html.setAttribute("data-theme", t.theme);
      html.style.setProperty("--accent", t.accent);
      html.style.setProperty("--accent-soft", `${t.accent}24`);
      const yellowish = ["#FFD95C", "#FFC300"].includes(t.accent.toUpperCase());
      html.style.setProperty("--accent-ink", yellowish ? "#25003D" : "#FFFFFF");
      const fp = FONT_PAIRINGS[t.fontPairing] || FONT_PAIRINGS.editorial;
      html.style.setProperty("--font-display", fp.display);
      html.style.setProperty("--font-sans", fp.sans);
      html.style.setProperty("--font-mono", fp.mono);
    }, [t.theme, t.accent, t.fontPairing]);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, t.showGrid && /* @__PURE__ */ React.createElement("div", { className: "bg-grid", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("a", { className: "skip", href: "#hero" }, "Skip to content"), /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(Projects, null), /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement(Experience, null), /* @__PURE__ */ React.createElement(Skills, null), /* @__PURE__ */ React.createElement(Contact, null), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement(PortfolioTweaks, { t, setTweak }));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
