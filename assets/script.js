
(() => {
  'use strict';
  const phone = '5514991747353';
  const message = 'Olá! Vi o seu site e gostaria de solicitar um orçamento para Fotografia / Vídeo / Social Media.';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) closeMenu();
    else {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('menu-open');
    }
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.gallery-item');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    items.forEach(item => {
      item.classList.toggle('hidden', filter !== 'todos' && item.dataset.category !== filter);
    });
  }));

  const dialog = document.getElementById('lightbox');
  const dialogImage = document.getElementById('lightbox-image');
  const dialogCaption = document.getElementById('lightbox-caption');
  const closeButton = dialog.querySelector('.lightbox-close');
  items.forEach(item => item.addEventListener('click', () => {
    dialogImage.src = item.dataset.full;
    dialogImage.alt = item.querySelector('img').alt;
    dialogCaption.textContent = item.dataset.caption || '';
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dialog.open) dialog.close();
  });

  document.getElementById('ano').textContent = new Date().getFullYear();
})();
