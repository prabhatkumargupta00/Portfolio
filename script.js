// --- Navigation Bar & Theme ---
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinksMain = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Theme Management
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'light-theme') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');

    if (isLight) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light-theme');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', '');
    }
});

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksMain.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMain.classList.remove('active');
    });
});

// --- Active Link Highlight on Scroll ---
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Typing Effect ---
const typingText = document.getElementById('typing-text');
const titles = ['Frontend Developer', 'MERN Stack Learner', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before start
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    // Initialize custom cursor
    if (typeof initCursor === 'function') initCursor();
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Remove observer after animation completes once
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// --- Dynamic Background Parallax ---
const shapes = document.querySelectorAll('.bg-shape');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const moveX = (window.innerWidth / 2 - e.clientX) * speed / 1000;
        const moveY = (window.innerHeight / 2 - e.clientY) * speed / 1000;

        // Use translate along with fixed positioning
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});


/* ─── Custom Cursor ─── */
function initCursor() {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    if (!cursor || !follower) return;

    // Hide on touch devices
    if ("ontouchstart" in window) {
        cursor.style.display = "none";
        follower.style.display = "none";
        // Ensure native cursor is available on touch devices
        document.body.classList.remove('custom-cursor');
        document.body.style.cursor = "auto";
        return;
    }

    // mark that the custom cursor is active so CSS can hide the native cursor
    document.body.classList.add('custom-cursor');

    let mouseX = 0,
        mouseY = 0,
        followX = 0,
        followY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });

    // Smooth follower
    function animateFollower() {
        followX += (mouseX - followX) * 0.12;
        followY += (mouseY - followY) * 0.12;
        follower.style.left = followX + "px";
        follower.style.top = followY + "px";
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Scale cursor on interactive elements
    document.querySelectorAll("a, button, .skill-item, .contact-card").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
            follower.style.transform = "translate(-50%, -50%) scale(1.6)";
            follower.style.borderColor = "var(--accent-orange)";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            follower.style.transform = "translate(-50%, -50%) scale(1)";
            follower.style.borderColor = "";
        });
    });
}