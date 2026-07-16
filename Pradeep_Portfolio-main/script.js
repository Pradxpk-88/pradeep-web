// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 2. Initialize Typed.js for Hero Subtitle
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: [
                'AI & Data Science Student',
                'Aspiring Data Scientist',
                'AI Engineer',
                'Machine Learning Enthusiast'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // 3. Initialize Particles.js Background
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#DC143C"
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#DC143C",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "push": {
                        "particles_nb": 3
                    }
                }
            },
            "retina_detect": true
        });
    }

    // 4. Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 5. ScrollSpy - Highlight active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Navbar blur effect on scroll
        const navbar = document.querySelector('.nav-bar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 6. Connect Modal Logic
    const connectBtn = document.getElementById('connect-btn');
    const connectModal = document.getElementById('connect-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (connectBtn && connectModal && modalCloseBtn) {
        connectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            connectModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        modalCloseBtn.addEventListener('click', () => {
            connectModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        connectModal.addEventListener('click', (e) => {
            if (e.target === connectModal) {
                connectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 7. Mouse Parallax Effect for Hero
    const heroVisual = document.querySelector('.hero-visual');
    const shapes = document.querySelectorAll('.abstract-shape');
    const heroImage = document.querySelector('.hero-image-wrapper');
    const glassCard = document.querySelector('.hero-glass-card');

    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;

            shapes.forEach(shape => {
                shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
            
            if(heroImage) {
                heroImage.style.transform = `translateX(${x * 0.5}px) translateY(${y * 0.5}px)`;
            }
            if(glassCard) {
                glassCard.style.transform = `translateX(${-x * 0.8}px) translateY(${-y * 0.8}px)`;
            }
        });

        heroVisual.addEventListener('mouseleave', () => {
            shapes.forEach(shape => {
                shape.style.transform = `translateX(0px) translateY(0px)`;
            });
            if(heroImage) {
                heroImage.style.transform = `translateX(0px) translateY(0px)`;
            }
            if(glassCard) {
                glassCard.style.transform = `translateX(0px) translateY(0px)`;
            }
        });
    }
});
