<script setup lang="ts">
import { useAppStore } from '@/stores/app.ts';

const appStore = useAppStore();

interface Tool {
    name: string;
    image: string;
};

defineProps<{
    title: string;
    languagesTitle: string;
    toolsTitle: string;
    languages: string[];
    tools: Tool[];
}>();
</script>

<template>
    <v-card class="fill-height d-flex flex-column glow-card">
        <template v-slot:title>
            {{ title }}
        </template>
        <v-card-text>
            <div class="mb-6">
                <div class="text-subtitle-2 font-weight-bold mb-3 text-medium-emphasis">
                    {{ languagesTitle }}
                </div>
                <div class="d-flex flex-wrap ga-2">
                    <v-chip
                        v-for="lang in languages"
                        :key="lang"
                        color="secondary"
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
                <div class="tool-icons-grid" :class="{ 'shrunk': appStore.isToShrink }">
                    <v-sheet
                        v-for="tool in tools"
                        :key="tool.name"
                        class="py-2 px-2"
                        color="on-primary"
                    >
                        <v-hover
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
                                        contain
                                        :class="{ 'on-hover': isHovering }"
                                    >
                                        <template v-slot:placeholder>
                                            <div class="d-flex align-center justify-center fill-height">
                                                <v-progress-circular color="primary" indeterminate size="24"></v-progress-circular>
                                            </div>
                                        </template>
                                    </v-img>
                                </template>
                            </v-tooltip>
                        </v-hover>
                    </v-sheet>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.tool-icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 64px);
    gap: 1.5rem;
}

.tool-icons-grid.shrunk {
    grid-template-columns: repeat(auto-fill, 56px);
    gap: 1rem;
}

.tool-icon {
    width: 64px;
    height: 64px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.shrunk .tool-icon {
    width: 56px;
    height: 56px;
    padding: 8px;
}

.tool-icon.on-hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>
