import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        theme: localStorage.getItem('theme') || 'dark',
        language: localStorage.getItem('language') || 'en',
        isToShrink: false,
    }),
    actions: {
        setIsToShrink(isToShrink: boolean) {
            this.isToShrink = isToShrink;
        },
        setTheme(theme: string) {
            this.theme = theme;

            localStorage.setItem('theme', theme);
        },
        setLanguage(language: string) {
            this.language = language;

            localStorage.setItem('language', language);
        },
        toggleTheme() {
            const nextTheme = this.theme === 'dark' ? 'light' : 'dark';

            this.setTheme(nextTheme);
        }
    }
});
