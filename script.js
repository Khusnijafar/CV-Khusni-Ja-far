// Enhanced JavaScript for professional personal website
console.log("Khusni Ja'far's professional website loaded successfully.");

// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Mobile Navigation Toggle
mobileNavToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.querySelectorAll('.fade-in-up, .slide-in-left').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Typing effect for header
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        typeWriter(headerTitle, originalText, 150);
    }
});

// Active navigation highlighting
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Skill tags hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Profile image click effect
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('click', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        }, 200);
    });
}

// Card hover effects
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.card, .skill-category, .education-card');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add CSS for active navigation state and mobile improvements
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color) !important;
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
    
    .revealed {
        animation: revealAnimation 0.8s ease-out forwards;
    }
    
    @keyframes revealAnimation {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    /* Mobile navigation improvements */
    body.nav-open {
        overflow: hidden;
    }
    
    /* Touch-friendly improvements for mobile */
    @media (hover: none) and (pointer: coarse) {
        .social-link,
        .project-card,
        .skill-tag,
        .tech-tag,
        .card,
        .skill-category,
        .gallery-item {
            cursor: pointer;
        }
        
        .social-link:active,
        .project-card:active,
        .skill-tag:active,
        .tech-tag:active,
        .card:active,
        .skill-category:active,
        .gallery-item:active {
            transform: scale(0.98) !important;
        }
    }
    
    /* Prevent text selection on mobile for better UX */
    .mobile-nav-toggle,
    .nav-menu a,
    .social-link {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    /* Improve tap targets on mobile */
    @media (max-width: 768px) {
        .nav-menu a {
            min-height: 44px;
            display: flex;
            align-items: center;
        }
        
        .social-link {
            min-height: 44px;
        }
        
        .skill-tag,
        .tech-tag {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateActiveNav, 100));
window.addEventListener('scroll', throttle(revealOnScroll, 100));

// Handle orientation change for mobile
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Close mobile menu on orientation change
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }, 100);
});

// Add viewport meta tag for better mobile experience
if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
} 