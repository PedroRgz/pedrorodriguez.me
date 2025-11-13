/**
 * app.js - Lógica principal de la aplicación
 * Portfolio de Pedro Rodriguez
 */

// ========== RENDERIZAR PROYECTOS ==========
function renderProjects(filter = 'destacados') {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  const filteredProjects = filter === 'todos' 
    ? projects 
    : projects.filter(p => p.category.includes(filter));
  
  filteredProjects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    setTimeout(() => card.classList.add('visible'), index * 100);
    
    const linksHTML = [];
    if (project.links) {
      if (project.links.code) {
        linksHTML.push(`<a href="${project.links.code}" class="project-link code" target="_blank" rel="noopener noreferrer">Código</a>`);
      }
      if (project.links.demo) {
        linksHTML.push(`<a href="${project.links.demo}" class="project-link demo" target="_blank" rel="noopener noreferrer">Demo</a>`);
      }
      if (project.links.notebook) {
        linksHTML.push(`<a href="${project.links.notebook}" class="project-link notebook" target="_blank" rel="noopener noreferrer">Notebook</a>`);
      }
    }
    
    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <span class="project-year">${project.year}</span>
      </div>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-links">
        ${linksHTML.join('')}
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// ========== RENDERIZAR TIMELINE ==========
function renderTimeline() {
  const timelineEl = document.getElementById('timeline');
  if (!timelineEl) return;

  timelineEl.innerHTML = '';

  timeline.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'timeline-card';
    setTimeout(() => card.classList.add('visible'), index * 150);

    card.innerHTML = `
      <h3 class="timeline-title">${item.title}</h3>
      <p class="timeline-subtitle">${item.subtitle}</p>
      <p class="timeline-description">${item.description}</p>
      <div class="timeline-tags">
        ${item.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
      </div>
    `;
    
    timelineEl.appendChild(card);
  });
}

// ========== RENDERIZAR HABILIDADES ==========
function renderSkills() {
  const container = document.getElementById('technicalSkills');
  if (!container) return;
  
  container.innerHTML = '';
  
  technicalSkills.forEach((skill, index) => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.style.setProperty('--skill-width', skill.percentage + '%');
    
    skillItem.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-percentage">${skill.percentage}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress"></div>
      </div>
    `;
    
    container.appendChild(skillItem);
    
    setTimeout(() => {
      skillItem.classList.add('animate');
    }, index * 100 + 500);
  });
}

// ========== FILTROS DE PROYECTOS ==========
function initProjectFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

// ========== NAVEGACIÓN TIMELINE ==========
function initTimelineNavigation() {
  const timelineLeft = document.getElementById('timelineLeft');
  const timelineRight = document.getElementById('timelineRight');
  const timelineWrapper = document.getElementById('timelineWrapper');

  if (timelineLeft && timelineWrapper) {
    timelineLeft.addEventListener('click', () => {
      timelineWrapper.scrollBy({ left: -400, behavior: 'smooth' });
    });
  }

  if (timelineRight && timelineWrapper) {
    timelineRight.addEventListener('click', () => {
      timelineWrapper.scrollBy({ left: 400, behavior: 'smooth' });
    });
  }
}

// ========== MENU HAMBURGUESA ==========
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

// ========== EFECTO SCROLL EN HEADER ==========
function initHeaderScroll() {
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    
    ticking = true;
    window.requestAnimationFrame(() => {
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll);
}

// ========== INTERSECTION OBSERVER PARA SECCIONES ==========
function initSectionObserver() {
  const sections = document.querySelectorAll('section:not(.hero)');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));
}

// ========== RESALTAR ENLACES DEL MENÚ SEGÚN LA SECCIÓN ==========
function initActiveNavLinks() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!navLinks.length) return;

  const sectionIds = Array.from(navLinks).map(link => link.dataset.section);
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    // Find all intersecting entries
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      // Pick the entry with the highest intersection ratio
      const mostVisible = visibleEntries.reduce((max, entry) => 
        entry.intersectionRatio > max.intersectionRatio ? entry : max);
      const targetId = mostVisible.target.id;
      navLinks.forEach(link => {
        if (link.dataset.section === targetId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -20% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ========== INICIALIZACIÓN PRINCIPAL ==========
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar contenido
  renderProjects('destacados');
  renderTimeline();
  renderSkills();
  
  // Inicializar interacciones
  initProjectFilters();
  initTimelineNavigation();
  initMobileMenu();
  initHeaderScroll();
  initSectionObserver();
  initActiveNavLinks();
});
