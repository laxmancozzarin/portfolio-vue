<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'

const { t } = useI18n()
const appStore = useAppStore()
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 :class="appStore.isToShrink ? 'text-h4' : 'text-h3'" class="mb-6">
                    {{ t('pages.projects.title') }}
                </h1>
                <p class="text-body-1 mb-8">
                    {{ t('pages.projects.description') }}
                </p>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="i in 3" :key="i" cols="12" md="4">
                <v-card>
                    <v-img
                        src="https://picsum.photos/500/300?random"
                        cover
                        height="200"
                    ></v-img>
                    <v-card-title>
                        {{ t('pages.projects.project') }} {{ i }}
                    </v-card-title>
                    <v-card-text>
                        {{ t('pages.projects.placeholder_description') }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" variant="text">
                            {{ t('pages.projects.learn_more') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
