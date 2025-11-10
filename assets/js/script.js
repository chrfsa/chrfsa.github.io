'use strict';

// ===================================
// PRELOADER
// ===================================

const loader = document.getElementById("preloader");

window.addEventListener("load", function() {
    loader.style.display = "none";
});

// Safety fallback
setTimeout(() => {
    if (loader) {
        loader.style.display = "none";
    }
}, 3000);

// ===================================
// CUSTOM CURSOR
// ===================================

const cursorInner = document.getElementById("cursor-inner");
const cursorOuter = document.getElementById("cursor-outer");
const links = document.querySelectorAll("a, label, button");

document.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorInner.style.left = `${posX}px`;
    cursorInner.style.top = `${posY}px`;

    cursorOuter.animate(
        {
            left: `${posX}px`,
            top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" }
    );
});

links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        cursorInner.classList.add("hover");
        cursorOuter.classList.add("hover");
    });
    link.addEventListener("mouseleave", () => {
        cursorInner.classList.remove("hover");
        cursorOuter.classList.remove("hover");
    });
});

// ===================================
// SETTINGS TOGGLE
// ===================================

function settingtoggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
}

function visualmode() {
    document.body.classList.toggle("light-mode");
    document.querySelectorAll(".needtobeinvert").forEach(function(element) {
        element.classList.toggle("invertapplied");
    });
}

// ===================================
// HAMBURGER MENU
// ===================================

function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
    document.body.classList.toggle("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// ===================================
// NAVIGATION ACTIVE STATE
// ===================================

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
const mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    mobilenavLi.forEach(li => {
        li.classList.remove("activeThismobiletab");
        if (li.classList.contains(current)) {
            li.classList.add("activeThismobiletab");
        }
    });

    navLi.forEach(li => {
        li.classList.remove("activeThistab");
        if (li.classList.contains(current)) {
            li.classList.add("activeThistab");
        }
    });
});

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 998) {
                hidemenubyli();
            }
        }
    });
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

let mybutton = document.getElementById("backtotopbutton");

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrolltoTopfunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onscroll = function() {
    scrollFunction();
};

// ===================================
// OPEN RESUME PDF
// ===================================

function openResumePDF() {
    const url = "Cv_Mohan_Said_CHEURFA_en.pdf";
    window.open(url, "_blank");
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.service-card, .project-card, .blog-card, .timeline-item, .tech-category').forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// ===================================
// PREVENT RIGHT CLICK ON IMAGES
// ===================================

document.addEventListener("contextmenu", function(e) {
    if (e.target.nodeName === "IMG") {
        e.preventDefault();
    }
}, false);

// ===================================
// SCROLL PROGRESS BAR
// ===================================

const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = `${scrolled}%`;
    }
}

window.addEventListener("scroll", updateScrollProgress);

// ===================================
// ANIMATED COUNTERS
// ===================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (target === 500 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach((counter) => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// ===================================
// SKILL PROGRESS BARS ANIMATION
// ===================================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const progress = progressBar.getAttribute('data-progress');
            
            setTimeout(() => {
                progressBar.style.width = `${progress}%`;
            }, 200);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach((item) => {
    skillObserver.observe(item);
});

// ===================================
// PARTICLES ANIMATION
// ===================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 20 + 15;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random color (blue or purple)
        const colors = ['#6bc5f8', '#cf59e6', '#b0f3f1'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
createParticles();

// ===================================
// PARALLAX EFFECT
// ===================================

function handleParallax() {
    const scrolled = window.scrollY;
    
    // Parallax on sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
    
    // Parallax on blob
    const blob = document.querySelector('.blob');
    if (blob) {
        blob.style.transform = `translate(0, ${scrolled * 0.1}px)`;
    }
}

// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(handleParallax, 10));

// ===================================
// TYPING EFFECT ON TITLE
// ===================================

function typingEffect(element, text, speed = 100) {
    if (!element) return;
    
    let index = 0;
    element.textContent = '';
    element.classList.add('typing-effect');
    
    const timer = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                element.classList.remove('typing-effect');
            }, 1000);
        }
    }, speed);
}

// Apply typing effect to main title
window.addEventListener('load', () => {
    const nameElement = document.getElementById('name');
    if (nameElement) {
        const originalText = 'Mohand Said';
        // Store original HTML first
        const originalHTML = nameElement.innerHTML;
        
        // Don't apply typing effect if using jello letters
        // The typing effect conflicts with the letter-by-letter animation
    }
});

// ===================================
// 3D TILT EFFECT ON CARDS
// ===================================

function add3DTilt() {
    const cards = document.querySelectorAll('.project-card, .blog-card, .service-card');
    
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize 3D tilt
add3DTilt();

// ===================================
// SMOOTH REVEAL ANIMATIONS
// ===================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for reveal animation
document.querySelectorAll('.stat-card, .skill-item, .tech-stack-box').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log(
    "%c Designed and Developed by Mohand Said Cheurfa ",
    "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white; font-weight:900; font-size:1rem; padding:20px;"
);

console.log("Portfolio loaded successfully! 🚀");

console.log(
    "%c ✨ Innovations Added: ",
    "color: #6bc5f8; font-weight: bold; font-size: 1.2rem;"
);
console.log("  🎯 Animated Stats Counters");
console.log("  📊 Animated Progress Bars");
console.log("  🌟 Scroll Progress Indicator");
console.log("  💎 Glassmorphism Effects");
console.log("  ⚡ Particle System");
console.log("  🎨 3D Tilt Effects");
console.log("  💫 Parallax Scrolling");
console.log("  🔥 Neon Button Effects");

