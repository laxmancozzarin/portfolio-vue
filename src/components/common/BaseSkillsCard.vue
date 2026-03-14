<script setup lang="ts">
import { useAppStore } from '@/stores/app.ts'

const appStore = useAppStore()

interface Tool {
    name: string;
    image: string;
}

defineProps<{
    title: string;
    languagesTitle: string;
    toolsTitle: string;
    languages: string[];
    tools: Tool[];
}>();
</script>

<template>
    <v-card class="fill-height d-flex flex-column">
        <template v-slot:title>
            <div :class="appStore.isToShrink ? 'text-h6' : 'text-h5'" class="font-weight-bold">
                {{ title }}
            </div>
        </template>
        <v-card-text class="flex-grow-1 pa-4 pa-sm-6">
            <div class="mb-6">
                <div class="text-subtitle-2 font-weight-bold mb-3 text-medium-emphasis">
                    {{ languagesTitle }}
                </div>
                <div class="d-flex flex-wrap ga-2">
                    <v-chip
                        v-for="lang in languages"
                        :key="lang"
                        variant="tonal"
                        color="primary"
                        :size="appStore.isToShrink ? 'small' : 'default'"
                    >
                        {{ lang }}
                    </v-chip>
                </div>
            </div>
            <div>
                <div class="text-subtitle-2 font-weight-bold mb-3 text-medium-emphasis">
                    {{ toolsTitle }}
                </div>
                <div class="d-flex flex-wrap ga-4 ga-sm-8 align-center">
                    <v-hover
                        v-for="tool in tools"
                        :key="tool.name"
                        v-slot="{ isHovering, props: hoverProps }"
                    >
                        <v-tooltip
                            :text="tool.name"
                            location="top"
                        >
                            <template v-slot:activator="{ props: tooltipProps }">
                                <v-img
                                    v-bind="{ ...hoverProps, ...tooltipProps }"
                                    :src="tool.image"
                                    :width="appStore.isToShrink ? 48 : 56"
                                    :height="appStore.isToShrink ? 48 : 56"
                                    aspect-ratio="1/1"
                                    class="tool-icon"
                                    :class="{ 'on-hover': isHovering }"
                                >
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate size="24"></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </template>
                        </v-tooltip>
                    </v-hover>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.tool-icon {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    filter: grayscale(15%) brightness(0.9);
}

.tool-icon.on-hover {
    transform: translateY(-5px) scale(1.1);
    filter: grayscale(0%) brightness(1);
}
</style>
