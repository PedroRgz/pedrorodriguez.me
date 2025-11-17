/**
 * particles-background.js - Fondo de partículas personalizado sin dependencias externas
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const config = {
    count: 80,
    maxDistance: 150,
    dotColor: 'rgba(5, 102, 141, 0.5)'
  };
  const lineColorBase = '5, 102, 141';

  const particles = [];
  let width = window.innerWidth;
  let height = window.innerHeight;
  let animationFrame = null;

  function setCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() < 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.dotColor;
      ctx.fill();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < config.count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lineColorBase}, ${1 - distance / config.maxDistance})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    animationFrame = requestAnimationFrame(animate);
  }

  function handleResize() {
    // No cancelar la animación, solo ajustar el canvas
    const oldWidth = width;
    const oldHeight = height;
    
    setCanvasSize();
    
    // Ajustar posiciones de partículas proporcionalmente en lugar de reiniciar
    const scaleX = width / oldWidth;
    const scaleY = height / oldHeight;
    
    particles.forEach(particle => {
      particle.x *= scaleX;
      particle.y *= scaleY;
    });
  }

  // Usar debounce más largo para evitar reinicializaciones frecuentes
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 300);
  });

  setCanvasSize();
  initParticles();
  animate();
});
