document.addEventListener('DOMContentLoaded', () => {
  // initialize lucide (icons)
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
});