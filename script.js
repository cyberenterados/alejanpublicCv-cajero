'use strict';

// Todo el contenido profesional está en HTML y sigue siendo legible sin JavaScript.
document.documentElement.classList.add('js-ready');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const progress = document.querySelector('.reading-progress');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const whatsappButton = document.querySelector('.whatsapp-toggle');
const whatsappPanel = document.querySelector('.whatsapp-panel');

function closeMenu(restoreFocus = false) {
  const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (wasOpen && restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  navigation.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

function setWhatsapp(open, focusTrigger = false) {
  whatsappPanel.hidden = !open;
  whatsappButton.setAttribute('aria-expanded', String(open));
  whatsappButton.setAttribute('aria-label', open ? 'Cerrar contacto de WhatsApp' : 'Abrir contacto de WhatsApp');
  if (open) whatsappPanel.querySelector('.panel-close').focus({ preventScroll: true });
  else if (focusTrigger) whatsappButton.focus({ preventScroll: true });
}
whatsappButton.addEventListener('click', () => setWhatsapp(whatsappPanel.hidden));
whatsappPanel.querySelector('.panel-close').addEventListener('click', () => setWhatsapp(false, true));
document.addEventListener('click', event => {
  if (!whatsappPanel.hidden && !event.target.closest('.whatsapp-widget')) setWhatsapp(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (!whatsappPanel.hidden) setWhatsapp(false, true);
    else closeMenu(true);
  }
});

const filterButtons = [...document.querySelectorAll('.filter')];
const experienceItems = [...document.querySelectorAll('.experience-item')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let visibleCount = 0;
  experienceItems.forEach(item => {
    item.hidden = category !== 'all' && item.dataset.category !== category;
    if (!item.hidden) visibleCount++;
  });
  document.querySelector('.filter-count').textContent = `${visibleCount} ${visibleCount === 1 ? 'experiencia' : 'experiencias'}`;
}));

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  revealItems.forEach(item => revealObserver.observe(item));
} else revealItems.forEach(item => item.classList.add('is-visible'));

const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
let scrollQueued = false;
function updateScroll() {
  const top = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(top / max, 1) : 0})`;
  header.classList.toggle('scrolled', top > 12);
  let current = 'perfil';
  sectionLinks.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target && target.getBoundingClientRect().top <= 180) current = target.id;
  });
  sectionLinks.forEach(link => {
    if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    window.requestAnimationFrame(updateScroll);
    scrollQueued = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScroll, { passive: true });
document.querySelector('#current-year').textContent = String(new Date().getFullYear());
updateScroll();

// Preparar el mensaje sin enviarlo automáticamente.
const messageInput = document.querySelector('#whatsapp-message');
const whatsappSend = document.querySelector('#whatsapp-send');
function updateWhatsappMessage() {
  const message = messageInput.value.trim() || 'Hola Manuel, vi tu CV web y me gustaría conversar sobre una oportunidad laboral.';
  whatsappSend.href = `https://wa.me/5491130094051?text=${encodeURIComponent(message)}`;
}
messageInput.addEventListener('input', updateWhatsappMessage);
document.querySelectorAll('[data-topic]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-topic]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    messageInput.value = button.dataset.topic === 'entrevista'
      ? 'Hola Manuel, vi tu CV web y me gustaría coordinar una entrevista. ¿Podemos conversar?'
      : 'Hola Manuel, vi tu CV web y me gustaría conversar sobre una oportunidad laboral.';
    updateWhatsappMessage();
  });
});
updateWhatsappMessage();

// El diálogo nativo permite cerrar con Escape y mantiene el foco dentro de la vista.
const certificateDialog = document.querySelector('.certificate-dialog');
let certificateTrigger;
document.querySelectorAll('[data-certificate]').forEach(link => {
  link.addEventListener('click', event => {
    if (!certificateDialog.showModal) return;
    event.preventDefault();
    setWhatsapp(false);
    certificateTrigger = link;
    const img = certificateDialog.querySelector('img');
    img.src = link.href;
    img.alt = link.querySelector('img').alt;
    document.querySelector('#certificate-dialog-title').textContent = link.dataset.title;
    certificateDialog.querySelector('.certificate-download').href = link.href;
    certificateDialog.showModal();
    certificateDialog.querySelector('.certificate-document').scrollTop = 0;
  });
});
certificateDialog.querySelector('.certificate-close').addEventListener('click', () => certificateDialog.close());
certificateDialog.addEventListener('click', event => {
  const rect = certificateDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) certificateDialog.close();
});
certificateDialog.addEventListener('close', () => certificateTrigger?.focus({preventScroll:true}));
