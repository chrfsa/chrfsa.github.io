'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { 
    elementToggleFunc(sidebar); 
  });
}

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { 
    elementToggleFunc(this); 
  });
}

// Add event to all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Add event to all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Enhanced Page navigation with smooth transitions
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add transition styles for page changes
const pageTransitionStyle = document.createElement('style');
pageTransitionStyle.textContent = `
  article {
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  article.fade-out {
    opacity: 0;
    transform: translateX(-20px);
  }

  article.fade-in {
    opacity: 1;
    transform: translateX(0);
  }

  .navbar-link {
    position: relative;
    overflow: hidden;
  }

  .navbar-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--text-gradient-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .navbar-link.active::after {
    transform: scaleX(1);
  }
`;
document.head.appendChild(pageTransitionStyle);

// Enhanced navigation function
function navigateToPage(targetPage) {
  // Find the current active page
  const currentActivePage = document.querySelector('article.active');
  const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`);

  if (!targetPageElement || currentActivePage === targetPageElement) return;

  // Start fade out animation for current page
  currentActivePage.classList.add('fade-out');

  // After fade out, switch pages
  setTimeout(() => {
    // Remove active class from all pages and nav links
    pages.forEach(page => page.classList.remove('active', 'fade-out', 'fade-in'));
    navigationLinks.forEach(link => link.classList.remove('active'));

    // Add active class to target page and corresponding nav link
    targetPageElement.classList.add('active', 'fade-in');

    // Find and activate corresponding nav link
    navigationLinks.forEach((link, index) => {
      if (link.innerHTML.toLowerCase() === targetPage) {
        link.classList.add('active');
      }
    });

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Reset stats animation when navigating to resume page
    if (targetPage === 'resume') {
      statsAnimated = false;
      skillsAnimated = false;
    }
  }, 200);
}

// Add event to all nav links with enhanced transitions
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    const targetPage = this.innerHTML.toLowerCase();
    navigateToPage(targetPage);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered animation delay
      const delay = index * 100;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
        entry.target.style.filter = 'blur(0px)';
      }, delay);
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.timeline-item, .service-item, .tech-category, .project-item, .blog-post-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px) rotateX(10deg)';
  item.style.filter = 'blur(2px)';
  item.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s ease';
  observer.observe(item);
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.sidebar, .main-content');

  parallaxElements.forEach(element => {
    const rate = scrolled * -0.5;
    element.style.transform = `translateY(${rate}px)`;
  });
});

// Typing animation for text elements
function createTypingEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

// Apply typing effect to title on page load
document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.querySelector('.info-content .name');
  if (titleElement) {
    const originalText = titleElement.textContent;
    setTimeout(() => {
      createTypingEffect(titleElement, originalText, 80);
    }, 500);
  }
});

// Magnetic effect for interactive elements
document.querySelectorAll('.service-item, .tech-badge, .project-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    item.style.transform = `translate(${deltaX * 5}px, ${deltaY * 5}px) scale(1.02)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

// Animated Counters for Statistics
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the number, the faster the animation

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounters(), 20);
    } else {
      counter.innerText = target;
    }
  });
}

// Statistics animation observer
const statsSection = document.querySelector('.statistics');
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateCounters();
        statsAnimated = true;
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

// Skill progress animation for all skill sections
const skillSections = document.querySelectorAll('.skill');
const animatedBars = new Set();

if (skillSections.length > 0) {
  const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionBars = entry.target.querySelectorAll('.skill-progress-fill');

        sectionBars.forEach((bar, index) => {
          if (animatedBars.has(bar)) return;

          const targetWidth = bar.getAttribute('style')?.match(/width:\s*([^;]+)/)?.[1] || '0%';

          bar.style.width = '0%';
          bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';

          setTimeout(() => {
            bar.style.setProperty('width', targetWidth, 'important');
            animatedBars.add(bar);
          }, 100 + (index * 100));
        });
      }
    });
  }, { threshold: 0.3 });

  skillSections.forEach(section => skillsObserver.observe(section));
}

// Add pulse animation for skill bars
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
  @keyframes pulse {
    0% { transform: scaleY(1); }
    50% { transform: scaleY(1.2); }
    100% { transform: scaleY(1); }
  }
`;
document.head.appendChild(pulseStyle);

// Typing effect function (will be called after preloader)
function startTypingEffect() {
  const typingText = document.querySelector('.info-content .title');
  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    setTimeout(typeWriter, 500);
  }
}

// Add active state to current section in navbar while scrolling
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('article[data-page]');
  const scrollPosition = window.pageYOffset + window.innerHeight / 2; // Center of viewport

  let current = '';

  // Find the section that is currently in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    // Check if the center of the viewport is within this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('data-page');
    }
  });

  // If no section found (e.g., at the very top), default to the first section
  if (!current && sections.length > 0) {
    current = sections[0].getAttribute('data-page');
  }

  // Update navigation links
  navigationLinks.forEach(link => {
    link.classList.remove('active');
    if (link.textContent.toLowerCase() === current) {
      link.classList.add('active');
    }
  });
});

// Enhanced Preloader - Simple and reliable approach
console.log('Script loaded, initializing preloader...');

// Simple preloader function
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loadingText = document.querySelector('.loading-text');

  if (!preloader || !loadingText) {
    document.body.classList.add('loaded');
    return;
  }

  const loadingMessages = [
    'Initializing AI Portfolio...',
    'Loading Neural Networks...',
    'Compiling Intelligence...',
    'Ready to Launch! 🚀'
  ];

  let messageIndex = 0;
  const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[messageIndex];
  }, 600);

  setTimeout(() => {
    clearInterval(messageInterval);
    preloader.classList.add('loaded');

    setTimeout(() => {
      preloader.remove();
      document.body.classList.add('loaded');
      startTypingEffect();
    }, 800);
  }, 2400); // 2.4 seconds for smooth experience
}

// Run preloader
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreloader);
} else {
  initPreloader();
}

// Safety fallback
setTimeout(() => {
  if (!document.body.classList.contains('loaded')) {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.remove();
    document.body.classList.add('loaded');
    startTypingEffect();
  }
}, 5000);

// Add hover effect sound (optional - requires sound file)
/*
const hoverSound = new Audio('./assets/sounds/hover.mp3');
document.querySelectorAll('.navbar-link, .tech-badge, .project-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});
*/

// Copy email to clipboard
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
  emailLink.addEventListener('click', function(e) {
    e.preventDefault();
    const email = this.getAttribute('href').replace('mailto:', '');
    navigator.clipboard.writeText(email).then(() => {
      // Show toast notification
      showToast('Email copied to clipboard!');
    });
  });
}

// Toast notification function
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--orange-yellow-crayola);
    color: var(--smoky-black);
    padding: 15px 25px;
    border-radius: 10px;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Add CSS for toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(toastStyle);

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

// Update toggle button state based on current theme
function updateToggleButton() {
  const currentTheme = body.getAttribute('data-theme');
  if (currentTheme === 'light') {
    body.setAttribute('data-theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
  }
}

// Initialize toggle button state
updateToggleButton();

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add smooth transition effect
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => {
      body.style.transition = '';
    }, 500);

    updateToggleButton();
  });
}

// Smooth theme transitions
document.addEventListener('DOMContentLoaded', () => {
  // Add transition class for smooth theme changes
  body.classList.add('theme-transition');

  // Remove transition class after initial load
  setTimeout(() => {
    body.classList.remove('theme-transition');
  }, 100);
});

console.log('Portfolio loaded successfully! 🚀 Theme system initialized.');