const HEADER_SELECTOR = '#header';
const NAV_SELECTOR = '#header nav';
const MENU_TOGGLE_SELECTOR = '.menu-toggle';
const NAV_LINK_SELECTOR = '#header nav a';
const SCROLL_OFFSET = 20;

function setActiveLink() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll(`${NAV_LINK_SELECTOR}.nav-link`);
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
        const sectionId = section.getAttribute('id');
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.toggle('nav-link-active', link.getAttribute('href') === `#${sectionId}`);
            });
        }
    });
}

function closeMenu(header, nav, toggle) {
    if (header) {
        header.classList.remove('nav-open');
    }

    if (nav) {
        nav.classList.remove('nav-open');
    }

    if (toggle) {
        toggle.classList.remove('menu-toggle-open');
    }
}

function openMenu(header, nav, toggle) {
    if (header) {
        header.classList.add('nav-open');
    }

    if (nav) {
        nav.classList.add('nav-open');
    }

    if (toggle) {
        toggle.classList.add('menu-toggle-open');
    }
}

function handleScroll(header) {
    if (header) {
        header.classList.toggle('header-scrolled', window.scrollY > SCROLL_OFFSET);
    }

    setActiveLink();
}

export function initNav() {
    const header = document.querySelector(HEADER_SELECTOR);
    const nav = document.querySelector(NAV_SELECTOR);
    const toggle = document.querySelector(MENU_TOGGLE_SELECTOR);
    const navLinks = document.querySelectorAll(NAV_LINK_SELECTOR);

    if (!nav || !toggle) {
        return;
    }

    navLinks.forEach((link) => {
        link.classList.add('nav-link');

        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', targetId);

                if (window.innerWidth <= 768) {
                    closeMenu(header, nav, toggle);
                }
            }
        });
    });

    toggle.addEventListener('click', () => {
        const isOpen = header ? header.classList.contains('nav-open') : false;

        if (isOpen) {
            closeMenu(header, nav, toggle);
            return;
        }

        openMenu(header, nav, toggle);
    });

    window.addEventListener('scroll', () => handleScroll(header), { passive: true });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu(header, nav, toggle);
        }
    });

    handleScroll(header);
}
