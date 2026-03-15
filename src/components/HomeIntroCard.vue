<script setup lang="ts">
import TypingText from "@/components/common/TypingText.vue";
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';

const { t } = useI18n();
const appStore = useAppStore();

const typingRoles = computed(() => [t('pages.home.intro.typing.backend'), t('pages.home.intro.typing.frontend')]);
</script>

<template>
    <v-card class="glow-card">
        <v-card-text>
            <div class="intro-main-text-container">
                <div
                    class="intro-main-title"
                    :style="appStore.isToShrink ? 'font-size: 3rem' : 'font-size: 5rem'"
                >
                <span>
                    {{ t('global.im_a') }}
                </span>
                    <br>
                    <span
                        class="text-primary"
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
                    {{ t('pages.home.intro.bio') }}
                </div>
            </div>
        </v-card-text>
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
