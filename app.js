/**
 * PRANIC HEALING PORTAL — MAIN APPLICATION CONTROLLER
 * Handles: Navbar sticky logic, mobile responsive menu drawer, active nav link scrollspy,
 * and viewport-triggered intersection animations.
 */
class AppController {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('nav-links');
        this.navbar = document.getElementById('navbar');
        this.navCtaBtn = document.getElementById('nav-cta-btn');
        
        this.sections = document.querySelectorAll('section');
        this.navItems = document.querySelectorAll('.nav-link');
        this.animElements = document.querySelectorAll('.fade-in-on-scroll');

        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupStickyNavbar();
        this.setupScrollspy();
        this.setupScrollAnimations();
    }

    setupMobileMenu() {
        if (!this.hamburger || !this.navLinks) return;

        // Toggle mobile drawer
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });

        // Close mobile drawer when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navLinks.classList.remove('active');
            });
        });
    }

    setupStickyNavbar() {
        if (!this.navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 80) {
                this.navbar.classList.add('scrolled');
                if (this.navCtaBtn) this.navCtaBtn.style.display = 'inline-flex';
            } else {
                this.navbar.classList.remove('scrolled');
                if (this.navCtaBtn) this.navCtaBtn.style.display = 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Call once on load to establish initial state
        handleScroll();
    }

    setupScrollspy() {
        if (this.sections.length === 0 || this.navItems.length === 0) return;

        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 150) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            this.navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    setupScrollAnimations() {
        if (this.animElements.length === 0) return;

        const observerOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target); // Run animation once
                }
            });
        }, observerOptions);

        this.animElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Auto-initialize when content loads
document.addEventListener('DOMContentLoaded', () => {
    window.appController = new AppController();
});
