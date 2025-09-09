document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Header hide/show on scroll
  const header = document.getElementById("main-header");
  let lastScrollTop = 0;
  const headerHeight = header ? header.offsetHeight : 80;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (!header) return;
    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      header.style.top = `-${headerHeight + 20}px`;
    } else {
      header.style.top = "0";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Add 'scrolled' class to header on scroll
  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Intersection Observer for Section Animations
  const animatedSections = document.querySelectorAll('.section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animatedSections.forEach(section => {
    observer.observe(section);
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');

  if (menuToggle && navMenu && menuIcon && closeIcon) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
  }

  // Dropdown toggles for mobile
  const dropdowns = document.querySelectorAll('.nav-menu .group');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', (e) => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
        const submenu = dropdown.querySelector('.submenu');
        submenu.classList.toggle('open');
      }
    });
  });

  // Enhanced dropdown hover behavior for desktop
  const groups = document.querySelectorAll('.group');
  groups.forEach(group => {
    const submenu = group.querySelector('.submenu');
    let timeout;

    group.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      submenu.style.display = 'block';
    });

    group.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        submenu.style.display = 'none';
      }, 200); // 200ms delay to allow cursor movement to submenu
    });

    submenu.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      submenu.style.display = 'block';
    });

    submenu.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        submenu.style.display = 'none';
      }, 200);
    });
  });
});