/* ============================================================
   MAIN.JS — Cursor personalizado · Animaciones de scroll
   ============================================================ */

/* ══════════════════════════════════
   CURSOR PERSONALIZADO
══════════════════════════════════ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mx = 0, my = 0;   // posición real del mouse
let rx = 0, ry = 0;   // posición suavizada del anillo

// El punto sigue al mouse de forma inmediata
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = (mx - 5) + 'px';
  cursor.style.top  = (my - 5) + 'px';
});

// El anillo sigue con un pequeño lag (interpolación lineal)
function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// El anillo se agranda al pasar por links/botones
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width   = '56px';
    ring.style.height  = '56px';
    ring.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width   = '36px';
    ring.style.height  = '36px';
    ring.style.opacity = '1';
  });
});

/* ══════════════════════════════════
   ANIMACIONES DE ENTRADA AL SCROLL
══════════════════════════════════ */

// Estado inicial: elementos ocultos
document.querySelectorAll('.skill-card, .project-card').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Observer: cuando un elemento entra en viewport, se revela
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Pequeño delay escalonado según el índice del elemento visible
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target); // solo animar una vez
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
  observer.observe(el);
});
