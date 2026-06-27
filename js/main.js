import { initTheme, toggleTheme } from './theme.js';
import { initNav } from './nav.js';
import { initAnimations } from './animations.js';
import { initBackground } from './background.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initAnimations();
    initBackground();

    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
