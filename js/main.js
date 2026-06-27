import { initTheme, toggleTheme } from './theme.js';
import { initNav } from './nav.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initAnimations();

    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
