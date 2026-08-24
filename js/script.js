const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Reveal on intersect, but also reveal anything already scrolled past above the
// viewport — on reload the browser restores scroll position, and those elements
// never intersect, so they would stay at opacity 0 forever.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-item').forEach((el) => observer.observe(el));

document.querySelector('.scroll-btn').addEventListener('click', () => {
  document.querySelector('.sections').scrollIntoView({
    behavior: reduceMotion.matches ? 'auto' : 'smooth',
  });
});
