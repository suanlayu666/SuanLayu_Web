/**
 * Personal Resume Website - Main JavaScript
 * Features: typing animation, scroll reveal, sticky nav, mobile menu, back-to-top
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Typing Animation
    // ==========================================
    (function initTyping() {
        const el = document.getElementById('typing-text');
        const texts = [
            '电子信息工程',
            '嵌入式开发',
            'AI 开发'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 120;

        function type() {
            const current = texts[textIndex];
            if (isDeleting) {
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            // Speed control
            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 300;
            } else if (isDeleting) {
                typeSpeed = 60;
            } else {
                typeSpeed = 120;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 500);
    })();

    // ==========================================
    // Sticky Navbar
    // ==========================================
    const navbar = document.getElementById('navbar');
    function onScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ==========================================
    // Active Nav Link on Scroll
    // ==========================================
    (function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActive() {
            let current = '';
            const offset = 120;
            sections.forEach(section => {
                const top = section.offsetTop - offset;
                if (window.scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActive, { passive: true });
    })();

    // ==========================================
    // Mobile Hamburger Menu
    // ==========================================
    (function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const links = navLinks.querySelectorAll('a');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    })();

    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    (function initReveal() {
        const revealEls = document.querySelectorAll(
            '.about-grid, .skill-card, .project-card, .section-title'
        );
        revealEls.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        revealEls.forEach(el => observer.observe(el));
    })();

    // ==========================================
    // Skill Bar Animation
    // ==========================================
    (function initSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    requestAnimationFrame(() => {
                        bar.style.width = targetWidth;
                    });
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        skillFills.forEach(bar => observer.observe(bar));
    })();

    // ==========================================
    // Back to Top Button
    // ==========================================
    (function initBackToTop() {
        const btn = document.getElementById('backToTop');

        function toggleBtn() {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', toggleBtn, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();
});
