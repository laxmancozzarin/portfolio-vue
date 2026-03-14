<script setup lang="ts">
import TypingText from "@/components/common/TypingText.vue";
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';

const { t } = useI18n();
const appStore = useAppStore();

const isDark = computed(() => appStore.theme === 'dark');
const typingRoles = computed(() => [t('pages.home.intro.typing.backend'), t('pages.home.intro.typing.frontend')]);
</script>

<template>
    <v-card>
        <v-img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
            class="intro-background"
            :gradient="isDark ? 'to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%' : 'to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 100%'"
        >
            <div
                class="intro-main-text-container"
                :class="appStore.isToShrink ? 'pa-6 pa-sm-8' : 'pa-16'"
            >
                <div
                    class="intro-main-title"
                    :style="appStore.isToShrink ? 'font-size: 3rem' : 'font-size: 5rem'"
                >
                    <span class="text-primary">
                        {{ t('global.im_a') }}
                    </span>
                    <br>
                    <span
                        class="text-secondary"
                    >
                        <TypingText
                            :text="typingRoles"
                            :speed="80"
                            :eraseSpeed="30"
                            :eraseDelay="2000"
                            :loop="true"
                        />
                    </span>
                    <br>
                    <span>
                        {{ t('global.developer') }}
                    </span>
                </div>

                <div class="intro-main-subtitle text-medium-emphasis">
                    <span>
                        {{ t('pages.home.intro.bio') }}
                    </span>
                </div>
            </div>
        </v-img>
    </v-card>
</template>

<style lang="scss" scoped>
.intro-main-text-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.intro-main-title {
    line-height: 1.1;
    font-weight: 900;
    letter-spacing: -0.02em;
    min-height: 2.2em;
}

.intro-main-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    line-height: 1.6;
    max-width: 900px;
}
</style>
