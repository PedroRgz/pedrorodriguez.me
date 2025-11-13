/**
 * particles-config.js - Configuración del efecto de partículas de fondo
 * Portfolio de Pedro Rodriguez
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      "particles": {
        "number": { 
          "value": 60, 
          "density": { 
            "enable": true, 
            "value_area": 800 
          } 
        },
        "color": { 
          "value": "#05668d" 
        },
        "shape": { 
          "type": "circle", 
          "stroke": { 
            "width": 0, 
            "color": "#000000" 
          } 
        },
        "opacity": { 
          "value": 0.2, 
          "random": false 
        },
        "size": { 
          "value": 4, 
          "random": true 
        },
        "line_linked": { 
          "enable": false 
        },
        "move": { 
          "enable": true, 
          "speed": 1.5, 
          "direction": "none", 
          "out_mode": "out" 
        }
      },
      "interactivity": {
        "events": {
          "onhover": { 
            "enable": true, 
            "mode": "repulse" 
          },
          "onclick": { 
            "enable": true, 
            "mode": "push" 
          }
        },
        "modes": {
          "repulse": { 
            "distance": 100 
          },
          "push": { 
            "particles_nb": 4 
          }
        }
      },
      "retina_detect": true,
      "background": { "color": "#f5f7fa" }
    });
  }
});
