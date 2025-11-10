/* Portfolio JS - Pedro Rodriguez */
const YEAR_EL = document.getElementById('year');
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

// ===== Utilidades para transiciones y animaciones =====

// Utilidad: transición con View Transitions si existe
function transition(fn) {
  if (document.startViewTransition) return document.startViewTransition(fn);
  return fn();
}

// Aparición escalonada: setea --i y activa .visible
function applyStagger(selector = '.fade-in') {
  const els = document.querySelectorAll(selector);
  els.forEach((el, i) => el.style.setProperty('--i', i));
  requestAnimationFrame(() => els.forEach(el => el.classList.add('visible')));
}

// Observer para "fade-in on view"
function ioFadeIn(selector = '.fade-in') {
  const els = document.querySelectorAll(selector);
  if (!('IntersectionObserver' in window) || !els.length) { 
    applyStagger(selector); 
    return; 
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  els.forEach(el => io.observe(el));
}

// Parallax sutil en hero
(function heroParallax(){
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  // Apply will-change dynamically for better performance
  hero.style.willChange = 'transform';
  
  let last = -1;
  let rafPending = false;
  const onScroll = () => {
    const y = Math.min(1, window.scrollY / 400);
    if (Math.abs(y - last) < 0.01) return;
    last = y;
    hero.style.transform = `translateY(${y * -10}px)`;
    rafPending = false;
  };
  
  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
})();

// Mapa sugerido de niveles (ajustable)
const SKILL_LEVELS = {
  'Python': 90, 'SQL': 85, 'Git & GitHub': 85, 'Azure ML & fundamentos de Azure': 75,
  'Machine Learning (scikit-learn)': 75, 'Análisis y visualización de datos': 80,
  'Dash/Plotly': 80, 'Swift (iOS)': 65
};

// Convierte listas .list.tags en barras accesibles si no hay .skill-meter
function upgradeSkills() {
  const container = document.querySelector('#habilidades');
  if (!container) return;

  const tags = container.querySelectorAll('.list.tags li');
  if (!tags.length) return;

  // Si ya existen medidores, no tocar
  if (container.querySelector('.skill-meter')) return;

  const ul = document.createElement('ul');
  ul.className = 'skills-list';

  tags.forEach(li => {
    const name = (li.textContent || '').trim();
    const lvl = SKILL_LEVELS[name] ?? 75;
    const item = document.createElement('li');
    item.className = 'skill-item fade-in';

    // Create elements safely without innerHTML
    const skillRow = document.createElement('div');
    skillRow.className = 'skill-row';
    
    const skillName = document.createElement('span');
    skillName.className = 'skill-name';
    skillName.textContent = name;
    
    const skillLevel = document.createElement('span');
    skillLevel.className = 'skill-level';
    skillLevel.setAttribute('aria-hidden', 'true');
    skillLevel.textContent = '0%';
    
    skillRow.appendChild(skillName);
    skillRow.appendChild(skillLevel);
    
    const skillMeter = document.createElement('div');
    skillMeter.className = 'skill-meter';
    skillMeter.setAttribute('role', 'meter');
    skillMeter.setAttribute('aria-label', name);
    skillMeter.setAttribute('aria-valuemin', '0');
    skillMeter.setAttribute('aria-valuemax', '100');
    skillMeter.setAttribute('aria-valuenow', lvl);
    
    const skillProgress = document.createElement('span');
    skillProgress.className = 'skill-progress';
    skillProgress.style.setProperty('--w', lvl + '%');
    skillProgress.setAttribute('data-width', lvl);
    
    skillMeter.appendChild(skillProgress);
    
    item.appendChild(skillRow);
    item.appendChild(skillMeter);
    ul.appendChild(item);
  });

  // Reemplaza el bloque original de tags por la nueva lista
  const parent = tags[0] ? tags[0].closest('.list.tags') : null;
  if (parent && parent instanceof Element) {
    parent.replaceWith(ul);
  }
}

// Anima contadores a partir del data-width de .skill-progress
let skillsObserver = null;

function animateCounters() {
  const items = document.querySelectorAll('.skill-item');
  if (!items.length) return;

  // Cleanup existing observer if any
  if (skillsObserver) {
    skillsObserver.disconnect();
  }

  skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const levelEl = target.querySelector('.skill-level');
      const barEl = target.querySelector('.skill-progress');
      const targetVal = parseInt(barEl?.getAttribute('data-width') || '0', 10);

      let current = 0;
      const step = Math.max(1, Math.round(targetVal / 30));

      function tick(){
        // Check if elements still exist in DOM
        if (!document.body.contains(target) || !levelEl || !barEl) return;
        
        current = Math.min(targetVal, current + step);
        levelEl.textContent = current + '%';
        barEl.style.inset = `0 ${100 - current}% 0 0`;
        if (current < targetVal) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      skillsObserver.unobserve(target);
    });
  }, { threshold: 0.3 });

  items.forEach(i => skillsObserver.observe(i));
}

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('show');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// ------- Projects: modular data + optional GitHub auto-fetch -------
const AUTO_FETCH_GITHUB = true;      // Cambiar a false si se quiere sólo la lista local
const GITHUB_USER = 'PedroRgz';
let LOCAL_PROJECTS = [];
let allProjects = []; // Module-scoped variable instead of global

async function loadLocalProjects(){
  try{
    const res = await fetch('projects.json', {cache:'no-cache'});
    if (!res.ok) throw new Error('No se pudo cargar projects.json');
    LOCAL_PROJECTS = await res.json();
  }catch(e){
    console.warn('Aviso:', e.message);
    LOCAL_PROJECTS = [];
  }
}

async function fetchGithubRepos(){
  try{
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('GitHub API no disponible');
    const repos = await res.json();
    // Map a estructura de proyectos mínima
    return repos.map(r => ({
      id: `gh-${r.id}`,
      title: r.name,
      description: r.description || 'Repositorio público',
      year: (r.updated_at || '').slice(0,4),
      urls: { code: r.html_url, demo: null, notebook: null },
      area: inferArea(r),
      tags: inferTags(r)
    }));
  }catch(e){
    console.warn('GitHub fetch error:', e.message);
    return [];
  }
}

function inferArea(repo){
  const n = (repo.name || '').toLowerCase();
  if (n.includes('dash') || n.includes('dashboard')) return 'ciencia-de-datos';
  if (n.includes('ios') || n.includes('watch') || n.includes('swift')) return 'ios';
  if (n.includes('curso') || n.includes('notebook')) return 'notebooks';
  if (n.includes('api') || n.includes('flask') || n.includes('fastapi')) return 'backend';
  return 'programacion';
}
function inferTags(repo){
  const langs = (repo.language ? [repo.language] : []);
  const out = new Set(langs.map(s => s?.toLowerCase()).filter(Boolean));
  const name = (repo.name || '').toLowerCase();
  if (name.includes('dash')) out.add('dash'); 
  if (name.includes('plotly')) out.add('plotly');
  if (name.includes('ios')) out.add('swift');
  if (name.includes('watch')) out.add('watchos');
  return Array.from(out);
}

function dedupeByTitle(arr){
  const seen = new Set();
  return arr.filter(p => { if (seen.has(p.title)) return false; seen.add(p.title); return true; });
}

function buildFilters(projects){
  const filtersEl = document.querySelector('.filters');
  if (!filtersEl) return;
  const areas = Array.from(new Set(projects.map(p => p.area))).sort();
  const all = ['todos', ...areas];
  filtersEl.innerHTML = '';
  all.forEach(a => {
    const chip = document.createElement('button');
    chip.className = 'filter-btn chip' + (a==='todos' ? ' active' : '');
    chip.dataset.filter = a;
    chip.textContent = a.replace('-', ' ');
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;
      // Guard against empty or undefined allProjects
      if (!allProjects || !allProjects.length) return;
      
      transition(() => {
        renderProjects(allProjects, filter);
        // Only call ioFadeIn - it handles stagger internally as fallback
        ioFadeIn('.project-card.fade-in');
      });
    });
    filtersEl.appendChild(chip);
  });
}

function renderProjects(projects, filter='todos'){
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  const subset = filter==='todos' ? projects : projects.filter(p => p.area===filter);
  grid.innerHTML = subset.map(p => cardHTML(p)).join('');
}

function cardHTML(p){
  let links = '';
  if (p.urls?.code) links += `<a href="${p.urls.code}" target="_blank" rel="noopener">Código</a>`;
  if (p.urls?.demo) links += ` · <a href="${p.urls.demo}" target="_blank" rel="noopener">Demo</a>`;
  if (p.urls?.notebook) links += ` · <a href="${p.urls.notebook}" target="_blank" rel="noopener">Notebook</a>`;
  const tags = (p.tags||[]).slice(0,6).map(t => `<span class="tag">${t}</span>`).join('');
  return `<article class="card project-card fade-in">
    <h3>${p.title}</h3>
    <p>${p.description || ''}</p>
    <div class="meta">${tags}</div>
    <p class="meta">${p.year ? 'Año: '+p.year : ''} ${links ? ' · ' + links : ''}</p>
  </article>`;
}

(async function init(){
  await loadLocalProjects();
  let projects = LOCAL_PROJECTS;
  if (AUTO_FETCH_GITHUB){
    const gh = await fetchGithubRepos();
    // Fusiona, respetando 'featured' primero
    const featured = projects.filter(p => p.featured);
    const others = projects.filter(p => !p.featured);
    projects = dedupeByTitle([...featured, ...others, ...gh]);
  }
  // Store in module-scoped variable
  allProjects = projects;
  buildFilters(projects);
  renderProjects(projects);

  // Construir la lista de habilidades antes de activar las animaciones
  upgradeSkills();

  // Activar fade-in tanto en tarjetas de proyectos como en items de habilidades
  ioFadeIn('.project-card.fade-in');
  ioFadeIn('.skill-item.fade-in');

  // Animar contadores/barras de habilidades
  animateCounters();
})();
