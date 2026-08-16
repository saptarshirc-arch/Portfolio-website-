document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // VIDEO PROTECTION
    // Disables right-click and drag on all videos
    // to prevent casual downloading
    // ============================================
    document.querySelectorAll('video').forEach(video => {
        // Disable right-click context menu
        video.addEventListener('contextmenu', e => e.preventDefault());
        // Disable dragging
        video.addEventListener('dragstart', e => e.preventDefault());
        // Remove controls attribute if somehow added
        video.removeAttribute('controls');
    });


    // ============================================
    // NAV SCROLL — frosted glass
    // ============================================
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });


    // ============================================
    // HAMBURGER MOBILE MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


    // ============================================
    // TYPEWRITER — hero subtitle
    // ============================================
    const subtitle = document.querySelector('.hero-subtitle');
    const titles = [
        'Creative Technologist',
        'Art Director',
        'Generative Visual Developer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[titleIndex];

        subtitle.textContent = isDeleting
            ? currentTitle.substring(0, charIndex - 1)
            : currentTitle.substring(0, charIndex + 1);

        isDeleting ? charIndex-- : charIndex++;

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1500);


    // ============================================
    // EDUCATION CARDS — scroll reveal
    // ============================================
    const eduCards = document.querySelectorAll('.edu-card');

    const eduObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 300);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    eduCards.forEach(card => eduObserver.observe(card));


    // ============================================
    // AI SUBMENU TOGGLE
    // ============================================
    const aiToggle = document.querySelector('.ai-toggle');
    const aiSubmenu = document.querySelector('.ai-submenu');

    if (aiToggle && aiSubmenu) {
        aiToggle.addEventListener('click', () => {
            aiSubmenu.classList.toggle('open');
            aiToggle.textContent = aiSubmenu.classList.contains('open')
                ? 'View Categories ↑'
                : 'View Categories ↓';
        });
    }


    // ============================================
    // ACTIVE NAV LINK on scroll
    // ============================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('nav-active'));
                const activeLink = document.querySelector(
                    `nav ul a[href="#${entry.target.getAttribute('id')}"]`
                );
                if (activeLink) activeLink.classList.add('nav-active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => sectionObserver.observe(section));

});