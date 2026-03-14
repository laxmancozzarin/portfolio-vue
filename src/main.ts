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
                    primary: '#000000',
                    secondary: '#96d6ff',
                },
            },
            dark: {
                colors: {
                    primary: '#ffffff',
                    secondary: '#8d8cff',
                },
            },
        },
    },
    defaults: {
        elevation: 0,

        VCard: {
            elevation: 0,
            rounded: 'lg',
            class: 'pa-4 border',
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
