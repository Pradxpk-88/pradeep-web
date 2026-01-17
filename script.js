// ===========================
// GLOBAL VARIABLES
// ===========================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const indicators = document.querySelectorAll('.indicator');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

let currentSectionIndex = 0;
let isScrolling = false;

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeObservers();
    initializeMobileMenu();
    initializeButtons();
    makeFirstSectionVisible();
});

// ===========================
// MAKE FIRST SECTION VISIBLE
// ===========================
function makeFirstSectionVisible() {
    if (sections.length > 0) {
        sections[0].classList.add('visible');
    }
}

// ===========================
// NAVIGATION INITIALIZATION
// ===========================
function initializeNavigation() {
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Section indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            navigateToSection(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNav);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                const sectionIndex = Array.from(sections).indexOf(targetSection);
                if (sectionIndex !== -1) {
                    navigateToSection(sectionIndex);
                }
            }
        });
    });
}

// ===========================
// HANDLE NAVIGATION CLICKS
// ===========================
function handleNavClick(e) {
    e.preventDefault();
    const targetSection = e.target.dataset.section;
    const sectionElement = document.getElementById(targetSection);
    
    if (sectionElement) {
        const sectionIndex = Array.from(sections).indexOf(sectionElement);
        navigateToSection(sectionIndex);
    }

    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// ===========================
// NAVIGATE TO SECTION
// ===========================
function navigateToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) {
        return;
    }

    isScrolling = true;
    currentSectionIndex = index;

    // Scroll to section
    sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Update active states
    updateActiveStates(index);

    // Reset scrolling flag
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// ===========================
// UPDATE ACTIVE STATES
// ===========================
function updateActiveStates(index) {
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sections[index].id) {
            link.classList.add('active');
        }
    });

    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });

    // Update sections
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('visible');
        }
    });
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================
function handleKeyboardNav(e) {
    if (isScrolling) return;

    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
            e.preventDefault();
            if (currentSectionIndex < sections.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            }
            break;
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            if (currentSectionIndex > 0) {
                navigateToSection(currentSectionIndex - 1);
            }
            break;
        case 'Home':
            e.preventDefault();
            navigateToSection(0);
            break;
        case 'End':
            e.preventDefault();
            navigateToSection(sections.length - 1);
            break;
    }
}

// ===========================
// INTERSECTION OBSERVER
// ===========================
function initializeObservers() {
    const observerOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Update current section index
                const index = Array.from(sections).indexOf(entry.target);
                if (index !== -1) {
                    currentSectionIndex = index;
                    updateActiveStates(index);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ===========================
// MOBILE MENU TOGGLE
// ===========================
function initializeMobileMenu() {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

// ===========================
// BUTTON INTERACTIONS
// ===========================
function initializeButtons() {
    // View Projects button
    const viewProjectsBtn = document.getElementById('view-projects-btn');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            const index = Array.from(sections).indexOf(projectsSection);
            navigateToSection(index);
        });
    }

    // Download Resume button
    const downloadResumeBtn = document.getElementById('download-resume-btn');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual resume URL
            alert('Please add your resume URL in script.js');
            // window.open('path/to/your/resume.pdf', '_blank');
        });
    }

    // Contact button
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            const index = Array.from(sections).indexOf(contactSection);
            navigateToSection(index);
        });
    }

    // View All Certifications button
    const viewAllCertsBtn = document.getElementById('view-all-certs');
    if (viewAllCertsBtn) {
        viewAllCertsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual certifications URL
            alert('Please add your certifications URL in script.js');
            // window.open('path/to/your/certifications', '_blank');
        });
    }
}

// ===========================
// SMOOTH SCROLLING POLYFILL
// ===========================
// This ensures smooth scrolling works across all browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scroll
    const smoothScrollPolyfill = (target) => {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Debounce function for scroll events
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

// ===========================
// UTILITY FUNCTIONS
// ===========================
// Get current section index
function getCurrentSectionIndex() {
    return currentSectionIndex;
}

// Navigate to next section
function goToNextSection() {
    if (currentSectionIndex < sections.length - 1) {
        navigateToSection(currentSectionIndex + 1);
    }
}

// Navigate to previous section
function goToPreviousSection() {
    if (currentSectionIndex > 0) {
        navigateToSection(currentSectionIndex - 1);
    }
}

// Export functions for external use
window.portfolioNav = {
    navigateToSection,
    getCurrentSectionIndex,
    goToNextSection,
    goToPreviousSection
};
