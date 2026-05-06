// Navbar + top bar scroll behaviour
const navbar = document.getElementById('navbar');
const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 10;
  navbar.classList.toggle('scrolled', scrolled);
  if (topBar) {
    topBar.style.transform = scrolled ? 'translateY(-100%)' : 'translateY(0)';
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

function openMenu() {
  navLinks.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);

// Close on any nav link tap
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on tap outside the menu
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      e.target !== hamburger) {
    closeMenu();
  }
});

// Appointment form
function handleSubmit(e) {
  e.preventDefault();
  document.querySelector('.contact-form').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// Scroll animations — skip on reduced motion preference
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.service-card, .doctor-card, .testimonial-card, .why-item, .about-feature, .gallery-item').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
} else {
  // Just make everything visible immediately
  document.querySelectorAll('.service-card, .doctor-card, .testimonial-card, .why-item, .about-feature, .gallery-item').forEach(el => {
    el.classList.add('visible');
  });
}

// Smart sticky CTA — hide when contact section is visible
const stickyCta = document.querySelector('.mobile-sticky-cta');
const contactSection = document.getElementById('contact');
if (stickyCta && contactSection) {
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      stickyCta.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
    });
  }, { threshold: 0.2 });
  ctaObserver.observe(contactSection);
}

// Smooth scroll for anchor links (handles mobile sticky bar offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = window.innerWidth <= 768 ? 70 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Expand/collapse toggles =====
document.querySelectorAll('.tags-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const tagsDiv = btn.closest('.doctor-info').querySelector('.doctor-tags');
    const extras = tagsDiv.querySelectorAll('.tags-extra span');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    extras.forEach(el => {
      el.style.display = expanded ? 'none' : 'inline-flex';
    });
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.innerHTML = expanded
      ? 'View all services <i class="fas fa-chevron-down"></i>'
      : 'Show less <i class="fas fa-chevron-up"></i>';
  });
  // Init: hide extras on load
  const tagsDiv = btn.closest('.doctor-info').querySelector('.doctor-tags');
  tagsDiv.querySelectorAll('.tags-extra span').forEach(el => el.style.display = 'none');
});

document.querySelectorAll('.service-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const list = btn.closest('.service-card').querySelector('.service-list');
    const extras = list.querySelectorAll('.service-extra');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    extras.forEach(el => {
      el.style.display = expanded ? 'none' : 'list-item';
    });
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.innerHTML = expanded
      ? 'See all services <i class="fas fa-chevron-down"></i>'
      : 'Show less <i class="fas fa-chevron-up"></i>';
  });
  // Init: hide extras on load
  const list = btn.closest('.service-card').querySelector('.service-list');
  list.querySelectorAll('.service-extra').forEach(el => el.style.display = 'none');
});
