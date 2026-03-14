<script setup lang="ts">
import { useTheme, useDisplay } from 'vuetify';
import { useAppStore } from './stores/app';
import { watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import ThreeJsBackground from './components/common/ThreeJsBackground.vue';
const theme = useTheme();
const appStore = useAppStore();
const { locale, t } = useI18n();
const { mobile, xs, sm } = useDisplay();

watch(() => appStore.theme, (newTheme) => {
    theme.global.name.value = newTheme;
}, { immediate: true });

watch(() => appStore.language, (newLang) => {
    locale.value = newLang as any;
    const momentLang = newLang === 'en' ? 'en-gb' : newLang;
    moment.locale(momentLang);
}, { immediate: true });

watch(() => mobile.value || xs.value || sm.value, (val) => {
    appStore.setIsToShrink(val);
}, { immediate: true });

const isDark = computed(() => appStore.theme === 'dark');
const primaryColor = computed(() => theme.global.current.value.colors.primary as string);

const toggleTheme = () => appStore.toggleTheme();
const changeLanguage = (lang: string) => appStore.setLanguage(lang);

</script>

<template>
    <v-app>
        <ThreeJsBackground :color="primaryColor" />

        <v-navigation-drawer
            :border="false"
            color="background"
            :location="appStore.isToShrink ? 'top' : 'right'"
            permanent
            :rail="appStore.isToShrink"
            rail-width="70"
            :width="appStore.isToShrink ? '100%' : 'fit-content'"
        >
            <div :class="appStore.isToShrink  ? 'd-flex justify-center align-center w-100 pa-2' : 'd-flex flex-column fill-height pa-4'">
                <v-btn-group
                    :direction="appStore.isToShrink ? 'horizontal' : 'vertical'"
                    class="pa-2"
                >
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-translate" v-bind="props"></v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                @click="changeLanguage('en')"
                                :active="appStore.language === 'en'"
                            >
                                <v-list-item-title>English</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                @click="changeLanguage('it')"
                                :active="appStore.language === 'it'"
                            >
                                <v-list-item-title>Italiano</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-btn
                        :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                        @click="toggleTheme"
                    >
                    </v-btn>
                </v-btn-group>

                <v-spacer v-if="!appStore.isToShrink"></v-spacer>
                <v-divider v-if="appStore.isToShrink" vertical class="mx-2"></v-divider>

                <v-btn-group
                    :direction="appStore.isToShrink ? 'horizontal' : 'vertical'"
                    class="pa-2"
                >
                    <v-btn
                        color="black"
                        icon="mdi-github"
                        href="https://github.com/laxmancozzarin"
                        target="_blank"
                        v-tooltip="t('global.social.github')"
                    ></v-btn>
                    <v-btn
                        color="blue"
                        icon="mdi-linkedin"
                        href="https://it.linkedin.com/in/laxman-cozzarin-535688178"
                        target="_blank"
                        v-tooltip="t('global.social.linkedin')"
                    ></v-btn>
                    <v-btn
                        color="red"
                        icon="mdi-instagram"
                        href="https://www.instagram.com/_re_lax_man_"
                        target="_blank"
                        v-tooltip="t('global.social.instagram')"
                    ></v-btn>
                </v-btn-group>
            </div>
        </v-navigation-drawer>

        <v-main>
            <v-container :class="['pa-4 pa-sm-8 pt-8 pt-sm-12', appStore.isToShrink ? 'pb-16' : '']">
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
.v-application {
    background-color: transparent !important;
}
</style>
