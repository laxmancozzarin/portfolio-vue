<script setup lang="ts">
import userImage from '@/assets/user_image.png';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/stores/app';

const { t } = useI18n();
const appStore = useAppStore();

const stack = [
    'Symfony',
    'Laravel',
    'Postgres',
    'Vue.js',
    'TypeScript',
    'Vuetify',
    'Node.js',
    'Pinia',
    'Sass'
];
</script>

<template>
    <v-card class="overflow-hidden pa-0 glow-card">
        <v-img
            :src="(userImage as any)"
            :height="appStore.isToShrink ? 240 : 320"
            cover
            class="profile-image-filter bg-secondary"
        >
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="primary" indeterminate></v-progress-circular>
                </div>
            </template>
        </v-img>

        <v-card-text>
            <h1 :class="appStore.isToShrink ? 'text-h5' : 'text-h4'" class="font-weight-bold mb-1">
                Laxman Cozzarin
            </h1>
            <p class="text-subtitle-1 text-secondary font-weight-medium ">
                {{ t('global.role') }}
            </p>

            <v-divider class="mb-6"></v-divider>

            <div class="text-overline mb-3 text-primary font-weight-bold">
                {{ t('pages.home.intro.skills_summary') }}
            </div>

            <div class="d-flex flex-wrap ga-2">
                <v-chip
                    v-for="tech in stack"
                    :key="tech"
                    :size="appStore.isToShrink ? 'small' : 'default'"
                >
                    {{ tech }}
                </v-chip>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.profile-image-filter {
    filter: grayscale(15%) brightness(0.95) contrast(1.1) drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    opacity: 0.9;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
