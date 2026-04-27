// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
let activeItems = [];

function getActiveItems() {
  return Array.from(galleryItems).filter(item =>
    !item.classList.contains('hidden') &&
    item.querySelector('img') &&
    item.querySelector('img').src &&
    !item.querySelector('img').src.endsWith('/')
  );
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img || !img.src || img.naturalWidth === 0) return;
    activeItems = getActiveItems();
    currentIndex = activeItems.indexOf(item);
    openLightbox(img.src, img.alt);
  });
});

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
  const img = activeItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
});

lightboxNext.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % activeItems.length;
  const img = activeItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

// Scroll reveal
const reveals = document.querySelectorAll('.container > *, .style-card, .gallery-item, .about-text > *, .contact-form, .contact-text > *');
reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  const webhookUrl = 'http://localhost:5678/webhook/appointment';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Appointment request sent! You will receive a confirmation email.');
      contactForm.reset();
    } else {
      const text = await response.text();
      alert('Error sending request. Please try again or contact directly.' + (text ? ' ' + text : ''));
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  }
});

// Language toggle
const langToggle = document.getElementById('lang-toggle');

const translations = {
  en: {
    nav: ['About me', 'Gallery', 'Styles', 'Contact'],
    hero: { sub: 'Tattoo Artist', title: 'Daniel Valhalus', desc: 'Permanent art. Unique designs that tell your story.', btn: 'Book your appointment' },
    about: {
      tag: 'About me',
      title: 'The Art on the Skin',
      p1: 'I am Daniel Valhalus, a passionate tattoo artist with years of experience creating designs that go beyond ink. Each tattoo is a conversation between your story and my art.',
      p2: 'Specialized in detailed styles with a focus on composition, shading and visual narrative. Each piece is unique, thought and executed to last a lifetime.',
      stat1: 'Tattoos done',
      stat2: 'Years of experience',
      stat3: 'Satisfied clients',
      btn: 'View Instagram'
    },
    gallery: { tag: 'Portfolio', title: 'Recent Work', desc: 'A selection of the most outstanding designs. Each piece is unique and unrepeatable.', filters: ['All', 'Neo-traditional', 'Realism', 'Black and Grey'], more: 'See more on Instagram' },
    styles: {
      tag: 'Specialties',
      title: 'Tattoo Styles',
      titles: ['Realism', 'Neo-traditional', 'Black and Grey'],
      realism: 'Portraits and scenes with photographic depth. Detail and texture as protagonists.',
      neotradicional: 'Modern take on classic tattooing. Bold lines, vibrant colors and contemporary symbolism.',
      blackgrey: 'Shades of grey with black outlines. Subtle gradients and depth without color.'
    },
    contact: { tag: 'Contact', title: 'Ready for your\nnext tattoo?', desc: 'Write to me to schedule a consultation, talk about your idea or resolve any questions. Each design begins with a conversation.', instagram: '@danielvalhalustattoos', button: 'Send Request' }
  },
  es: {
    nav: ['Sobre mí', 'Galería', 'Estilos', 'Contacto'],
    hero: { sub: 'Tattoo Artist', title: 'Daniel Valhalus', desc: 'Arte permanente. Diseños únicos que cuentan tu historia.', btn: 'Reserva tu cita' },
    about: {
      tag: 'Sobre mí',
      title: 'El Arte en la Piel',
      p1: 'Soy Daniel Valhalus, tatuador apasionado con años de experiencia creando diseños que van más allá de la tinta. Cada tatuaje es una conversación entre tu historia y mi arte.',
      p2: 'Especializado en estilos detallados con un enfoque en la composición, el sombreado y la narrativa visual. Cada pieza es única, pensada y ejecutada para durar toda la vida.',
      stat1: 'Tatuajes realizados',
      stat2: 'Años de experiencia',
      stat3: 'Clientes satisfechos',
      btn: 'Ver Instagram'
    },
    gallery: { tag: 'Portafolio', title: 'Trabajo Reciente', desc: 'Una selección de los diseños más destacados. Cada pieza es única e irrepetible.', filters: ['Todos', 'Neo-tradicional', 'Realismo', 'Black and Grey'], more: 'Ver más en Instagram' },
    styles: {
      tag: 'Especialidades',
      title: 'Estilos de Tatuaje',
      titles: ['Realismo', 'Neo-tradicional', 'Black and Grey'],
      realism: 'Retratos y escenas con profundidad fotográfica. El detalle y la textura como protagonistas.',
      neotradicional: 'Versión moderna del tatuaje clásico. Líneas audaces, colores vibrantes y simbolismo contemporáneo.',
      blackgrey: 'Tonos de gris con contornos negros. Gradientes sutiles y profundidad sin color.'
    },
    contact: { tag: 'Contacto', title: '¿Listo para tu\npróximo tatuaje?', desc: 'Escríbeme para agendar una consulta, hablar sobre tu idea o resolver cualquier duda. Cada diseño comienza con una conversación.', instagram: '@danielvalhalustattoos', button: 'Enviar solicitud' }
  },
  fr: {
    nav: ['À propos de moi', 'Galerie', 'Styles', 'Contact'],
    hero: { sub: 'Artiste Tatoueur', title: 'Daniel Valhalus', desc: 'Art permanent. Des designs uniques qui racontent votre histoire.', btn: 'Réservez votre rendez-vous' },
    about: {
      tag: 'À propos de moi',
      title: 'L\'Art sur la Peau',
      p1: 'Je suis Daniel Valhalus, un artiste tatoueur passionné avec des années d\'expérience créant des designs qui vont au-delà de l\'encre. Chaque tatouage est une conversation entre votre histoire et mon art.',
      p2: 'Spécialisé dans les styles détaillés avec un focus sur la composition, l\'ombrage et la narration visuelle. Chaque pièce est unique, pensée et exécutée pour durer toute une vie.',
      stat1: 'Tatouages réalisés',
      stat2: 'Années d\'expérience',
      stat3: 'Clients satisfaits',
      btn: 'Voir Instagram'
    },
    gallery: { tag: 'Portefeuille', title: 'Travail Récent', desc: 'Une sélection des designs les plus remarquables. Chaque pièce est unique et non répétable.', filters: ['Tous', 'Néo-traditionnel', 'Réalisme', 'Noir et Gris'], more: 'Voir plus sur Instagram' },
    styles: {
      tag: 'Spécialités',
      title: 'Styles de Tatouage',
      titles: ['Réalisme', 'Néo-traditionnel', 'Noir et Gris'],
      realism: 'Portraits et scènes avec profondeur photographique. Détail et texture comme protagonistes.',
      neotradicional: 'Prise moderne du tatouage classique. Lignes audacieuses, couleurs vibrantes et symbolisme contemporain.',
      blackgrey: 'Tons de gris avec contours noirs. Gradients subtils et profondeur sans couleur.'
    },
    contact: { tag: 'Contact', title: 'Prêt pour votre\nprochain tatouage ?', desc: 'Écrivez-moi pour planifier une consultation, parler de votre idée ou résoudre toute question. Chaque design commence par une conversation.', instagram: '@danielvalhalustattoos', button: 'Envoyer la demande' }
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  langToggle.value = lang;

  document.querySelectorAll('.nav-links a').forEach((link, index) => {
    if (translations[lang].nav[index]) link.textContent = translations[lang].nav[index];
  });

  document.querySelector('.hero-sub').textContent = translations[lang].hero.sub;
  document.querySelector('.hero-desc').textContent = translations[lang].hero.desc;
  const heroButton = document.querySelector('#hero .btn-primary');
  if (heroButton) heroButton.textContent = translations[lang].hero.btn;
  const contactButton = document.querySelector('#contact button[type="submit"]');
  if (contactButton) contactButton.textContent = translations[lang].contact.button;

  document.querySelector('#about .section-tag').textContent = translations[lang].about.tag;
  document.querySelector('#about h2').textContent = translations[lang].about.title;
  const aboutParagraphs = document.querySelectorAll('#about .about-text p');
  if (aboutParagraphs[0]) aboutParagraphs[0].textContent = translations[lang].about.p1;
  if (aboutParagraphs[1]) aboutParagraphs[1].textContent = translations[lang].about.p2;
  const statLabels = document.querySelectorAll('.stat p');
  if (statLabels[0]) statLabels[0].textContent = translations[lang].about.stat1;
  if (statLabels[1]) statLabels[1].textContent = translations[lang].about.stat2;
  if (statLabels[2]) statLabels[2].textContent = translations[lang].about.stat3;
  document.querySelector('#about .btn-outline').textContent = translations[lang].about.btn;

  document.querySelector('#gallery .section-tag').textContent = translations[lang].gallery.tag;
  document.querySelector('#gallery h2').textContent = translations[lang].gallery.title;
  document.querySelector('#gallery .section-desc').textContent = translations[lang].gallery.desc;
  document.querySelectorAll('.filter-btn').forEach((button, index) => {
    if (translations[lang].gallery.filters[index]) button.textContent = translations[lang].gallery.filters[index];
  });
  document.querySelector('.gallery-more a').textContent = translations[lang].gallery.more;

  document.querySelector('#styles .section-tag').textContent = translations[lang].styles.tag;
  document.querySelector('#styles h2').textContent = translations[lang].styles.title;
  document.querySelectorAll('.style-card h3').forEach((heading, index) => {
    if (translations[lang].styles.titles[index]) heading.textContent = translations[lang].styles.titles[index];
  });
  const styleDescriptions = document.querySelectorAll('.style-card p');
  if (styleDescriptions[0]) styleDescriptions[0].textContent = translations[lang].styles.realism;
  if (styleDescriptions[1]) styleDescriptions[1].textContent = translations[lang].styles.neotradicional;
  if (styleDescriptions[2]) styleDescriptions[2].textContent = translations[lang].styles.blackgrey;

  document.querySelector('#contact .section-tag').textContent = translations[lang].contact.tag;
  document.querySelector('#contact h2').innerHTML = translations[lang].contact.title.replace('\n', '<br/>');
  document.querySelector('#contact .contact-text p').textContent = translations[lang].contact.desc;
  document.querySelector('.contact-link').textContent = translations[lang].contact.instagram;
}

langToggle.addEventListener('change', () => {
  setLanguage(langToggle.value);
});

setLanguage(currentLang);

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((c) => counterObserver.observe(c));

