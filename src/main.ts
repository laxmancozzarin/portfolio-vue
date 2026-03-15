import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import it from './locales/it.json';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { md3 } from 'vuetify/blueprints';
import 'moment/locale/it';
import 'moment/locale/en-gb';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        it,
    },
});

const vuetify = createVuetify({
    blueprint: md3,
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                colors: {
                    primary: '#3F51B5',
                    secondary: '#FF9800',
                    accent: '#607D8B',
                    background: '#F9F9F9',
                    surface: '#FFFFFF',
                    error: '#D32F2F',
                    info: '#1976D2',
                    success: '#388E3C',
                    warning: '#FBC02D',
                    'on-background': '#424242',
                    'on-surface': '#424242',
                    'on-primary': '#FFFFFF',
                    'on-secondary': '#FFFFFF',
                },
            },
            dark: {
                colors: {
                    primary: '#7986CB',
                    secondary: '#FFB74D',
                    accent: '#B0BEC5',
                    background: '#212121',
                    surface: '#333333',
                    error: '#EF5350',
                    info: '#64B5F6',
                    success: '#81C784',
                    warning: '#FFEB3B',
                    'on-background': '#E0E0E0',
                    'on-surface': '#E0E0E0',
                    'on-primary': '#212121',
                    'on-secondary': '#212121',
                },
            },
        },
    },
    defaults: {
        elevation: 0,
        VCard: {
            elevation: 0,
            rounded: 'xl',
            class: 'pa-6 border',
        },
        VCardTitle: {
            class: 'text-h2 font-weight-bold',
        },
        VCardSubtitle: {
            class: 'text-h4 font-weight-bold',
        },
        VBtn: {
            elevation: 0,
            class: 'border',
            rounded: 'lg',
        },
        VChip: {
            rounded: 'lg',
            elevation: 0,
        },
        VImg: {
            rounded: 'lg',
        },
        VSheet: {
            rounded: 'lg',
        },
    },
});

const app = createApp(App);
const pinia = createPinia();

app.use(i18n);
app.use(pinia);
app.use(vuetify);
app.use(router);

import { useAppStore } from './stores/app';
const appStore = useAppStore();

vuetify.theme.global.name.value = appStore.theme;
i18n.global.locale.value = appStore.language;

app.mount('#app');
