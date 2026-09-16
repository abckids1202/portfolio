(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fxButton = document.querySelector('.effects-toggle');
  let enabled = !reduced.matches;
  try { enabled = localStorage.getItem('portfolio-effects') === 'off' ? false : enabled; } catch (_) {}
  function setEffects(value) {
    enabled = value;
    document.body.classList.toggle('effects-off', !value);
    fxButton.setAttribute('aria-pressed', String(value));
    fxButton.querySelector('.effects-state').textContent = value ? 'ON' : 'OFF';
  }
  setEffects(enabled);
  fxButton.addEventListener('click', () => {
    setEffects(!enabled);
    try { localStorage.setItem('portfolio-effects', enabled ? 'on' : 'off'); } catch (_) {}
  });
  reduced.addEventListener('change', event => { if (event.matches) setEffects(false); });
  const particles = document.querySelector('.particles');
  for (let i = 0; i < 22; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.cssText = `--left:${(i * 37) % 100}%;--duration:${12 + i % 9}s;--delay:-${i * 1.7}s`;
    particles.append(particle);
  }
  const menuButton = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.nav-menu');
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  const dropdowns = [...document.querySelectorAll('.dropdown')];
  dropdowns.forEach(details => details.addEventListener('toggle', () => {
    if (details.open) dropdowns.forEach(other => { if (other !== details) other.open = false; });
  }));
  document.addEventListener('click', event => {
    dropdowns.forEach(details => { if (!details.contains(event.target)) details.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      dropdowns.forEach(details => { if (details.open) { details.open = false; details.querySelector('summary').focus(); } });
      if (menu.classList.contains('active')) { menu.classList.remove('active'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.focus(); }
    }
  });
  const biomeSwitcher = document.querySelector('[data-biome-switcher]');
  if (biomeSwitcher) {
    const biomes = [
      { key: 'overworld', name: 'Overworld', description: 'Cherry grove', image: '/static/images/cherry-world.png' },
      { key: 'nether', name: 'Nether', description: 'Crimson citadel', image: '/static/images/biome-nether.png' },
      { key: 'end', name: 'The End', description: 'Astral islands', image: '/static/images/biome-end.png' },
      { key: 'ice', name: 'Frozen peaks', description: 'Aurora lake', image: '/static/images/biome-ice.png' },
      { key: 'lush', name: 'Lush cave', description: 'Crystal falls', image: '/static/images/biome-lush.png' }
    ];
    const hero = document.querySelector('.hero');
    const backdrop = document.querySelector('.world-backdrop');
    const worldLabel = document.querySelector('.world-label');
    const sceneBiome = document.querySelector('.scene-biome');
    const name = biomeSwitcher.querySelector('.biome-name');
    const description = biomeSwitcher.querySelector('.biome-description');
    const count = biomeSwitcher.querySelector('.biome-count');
    const dots = [...biomeSwitcher.querySelectorAll('[data-biome-dot]')];
    let biomeIndex = 0;
    let pointerStart = null;
    function showBiome(next) {
      biomeIndex = (next + biomes.length) % biomes.length;
      const biome = biomes[biomeIndex];
      document.body.dataset.biome = biome.key;
      document.body.style.setProperty('--biome-image', `url("${biome.image}")`);
      name.textContent = biome.name;
      description.textContent = biome.description;
      count.textContent = `${String(biomeIndex + 1).padStart(2, '0')} / ${String(biomes.length).padStart(2, '0')}`;
      worldLabel.textContent = `${biome.name.toUpperCase()} / ${biome.description.toUpperCase()}`;
      sceneBiome.textContent = biome.description;
      dots.forEach((dot, index) => {
        dot.setAttribute('aria-selected', String(index === biomeIndex));
        dot.classList.toggle('active', index === biomeIndex);
      });
      backdrop.classList.remove('biome-changing');
      requestAnimationFrame(() => backdrop.classList.add('biome-changing'));
    }
    biomeSwitcher.querySelector('[data-biome-prev]').addEventListener('click', () => showBiome(biomeIndex - 1));
    biomeSwitcher.querySelector('[data-biome-next]').addEventListener('click', () => showBiome(biomeIndex + 1));
    dots.forEach(dot => dot.addEventListener('click', () => showBiome(Number(dot.dataset.biomeDot))));
    biomeSwitcher.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); showBiome(biomeIndex - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showBiome(biomeIndex + 1); }
    });
    hero.addEventListener('pointerdown', event => { pointerStart = event.clientX; });
    hero.addEventListener('pointerup', event => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      if (Math.abs(distance) > 55) showBiome(biomeIndex + (distance < 0 ? 1 : -1));
      pointerStart = null;
    });
    showBiome(0);
  }
  const slideshow = document.querySelector('.slideshow-container');
  if (!slideshow) return;
  const slides = [...slideshow.querySelectorAll('.slide')];
  let index = 0;
  slideshow.setAttribute('aria-label', 'Projects and reflections');
  slideshow.querySelectorAll('.prev, .next, .slide-indicators').forEach(el => el.remove());
  const toolbar = document.createElement('div');
  toolbar.className = 'journal-toolbar';
  toolbar.innerHTML = '<span>PROJECTS & REFLECTIONS</span><output class="page-counter" aria-live="polite"></output>';
  slideshow.prepend(toolbar);
  const controls = document.createElement('div');
  controls.className = 'journal-controls';
  controls.innerHTML = '<button class="pixel-button previous" type="button">← Previous</button><div class="slide-indicators" aria-label="Choose a page"></div><button class="pixel-button next-page" type="button">Next →</button>';
  slideshow.append(controls);
  const dots = slides.map((slide, i) => {
    const button = document.createElement('button');
    const heading = slide.querySelector('h1,h2');
    button.type = 'button';
    button.setAttribute('aria-label', `Page ${i + 1}: ${heading ? heading.textContent.trim() : 'Reflection'}`);
    button.title = button.getAttribute('aria-label');
    button.addEventListener('click', () => show(i));
    controls.querySelector('.slide-indicators').append(button);
    return button;
  });
  function show(next, scroll = true) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.classList.toggle('active', i === index); slide.hidden = i !== index; });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    toolbar.querySelector('output').textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (scroll && slideshow.getBoundingClientRect().top < 0) slideshow.scrollIntoView({ behavior: enabled && !reduced.matches ? 'smooth' : 'instant', block: 'start' });
  }
  controls.querySelector('.previous').addEventListener('click', () => show(index - 1));
  controls.querySelector('.next-page').addEventListener('click', () => show(index + 1));
  slideshow.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
  });
  show(0, false);
})();
