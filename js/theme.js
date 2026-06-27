const STORAGE_KEY = 'theme';
const THEME_ATTRIBUTE = 'data-theme';
const DEFAULT_THEME = 'dark';

function getStoredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }

    return DEFAULT_THEME;
}

export function initTheme() {
    const theme = getStoredTheme();
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);

    const toggleInput = document.querySelector('#theme-toggle .switch__input');

    if (toggleInput) {
        toggleInput.checked = theme === 'light';
    }
}

export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE) || DEFAULT_THEME;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute(THEME_ATTRIBUTE, nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);

    const toggleInput = document.querySelector('#theme-toggle .switch__input');

    if (toggleInput) {
        toggleInput.checked = nextTheme === 'light';
    }
}
