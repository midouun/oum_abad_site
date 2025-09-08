document.addEventListener('DOMContentLoaded', () => {

  // --- SELECTORS ---
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section');
  const navbar = document.getElementById('main-header');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const navLinksContainer = document.querySelector('.nav-links');
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  let lastScrollTop = 0;

  // --- EVENT LISTENERS ---

  // 1. Scroll Listener for multiple effects
  window.addEventListener('scroll', () => {
    handleNavbarVisibility();
    handleScrollToTopVisibility();
    handleActiveNavLink();
  }, { passive: true });

  // 2. Scroll-to-top button click action
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Mobile Menu Button click action
  mobileMenuButton.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-nav-active');
  });

  // 4. Accordion functionality
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const accordionContent = header.nextElementSibling;
      header.classList.toggle('active');
      if (accordionContent.style.maxHeight) {
        accordionContent.style.maxHeight = null;
      } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      }
    });
  });

  // 5. Lightbox functionality (Event Delegation)
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.gallery-item')) {
      e.preventDefault();
      const imageSrc = e.target.closest('.gallery-item').getAttribute('href');
      lightboxImage.setAttribute('src', imageSrc);
      lightboxOverlay.style.display = 'flex';
    }
  });

  // 6. Close Lightbox
  if(lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightboxOverlay.style.display = 'none';
    });
  }
  if(lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
        }
    });
  }

  // --- SCROLL-BASED FUNCTIONS ---

  function handleNavbarVisibility() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.top = "-100px";
    } else {
      navbar.style.top = "0";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  function handleScrollToTopVisibility() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }

  function handleActiveNavLink() {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }

  // --- INTERSECTION OBSERVER FOR REVEAL-ON-SCROLL ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(element => {
    observer.observe(element);
  });

});