<script lang="ts">
import { useTheme } from 'vuetify'
import { useAppStore } from './stores/app'
import { watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
    name: 'App',
    setup() {
        const theme = useTheme()
        const appStore = useAppStore()
        const { t, locale } = useI18n()

        watch(() => appStore.theme, (newTheme) => {
            theme.global.name.value = newTheme
        }, { immediate: true })

        watch(() => appStore.language, (newLang) => {
            locale.value = newLang as any
        }, { immediate: true })

        const isDark = computed(() => appStore.theme === 'dark')

        const toggleTheme = () => appStore.toggleTheme()
        const changeLanguage = (lang: string) => appStore.setLanguage(lang)

        return {
            appStore,
            isDark,
            toggleTheme,
            changeLanguage,
            t
        }
    }
}
</script>

<template>
    <v-app>
        <v-app-bar :elevation="0" rounded>
            <v-app-bar-title>
                <strong>
                    Laxman Cozzarin
                </strong>
                <strong class="text-info">
                    Portfolio
                </strong>
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn
                to="/"
                variant="text"
                class="hidden-sm-and-down"
            >
                <span>{{ t('nav.home') }}</span>
            </v-btn>
            <v-btn
                to="/projects"
                variant="text"
                class="hidden-sm-and-down"
            >
                <span>{{ t('nav.projects') }}</span>
            </v-btn>

            <v-divider vertical class="mx-2"></v-divider>

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
        </v-app-bar>

        <v-main>
            <v-container>
                <RouterView />
            </v-container>
        </v-main>

        <v-footer app border padless>
            <v-col class="text-center w-100" cols="12">
                {{ new Date().getFullYear() }} — <strong>Portfolio</strong>
            </v-col>
        </v-footer>
    </v-app>
</template>
