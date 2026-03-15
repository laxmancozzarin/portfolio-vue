<script lang="ts">
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { useAppStore } from '@/stores/app';
import rawExperiences from '@/config/experiences.json';

export default {
    name: 'ExperienceTimelineCard',
    setup() {
        const { t, locale } = useI18n();
        const appStore = useAppStore();
        return { t, locale, appStore };
    },
    computed: {
        currentMomentLocale(): string {
            return this.locale === 'en' ? 'en-gb' : this.locale;
        },
        items(): any[] {
            return (rawExperiences as any[]).map(item => ({
                ...item,
                title: item.title ? this.t(item.title) : undefined,
                location: item.location ? this.t(item.location) : undefined,
                description: item.description ? this.t(item.description) : undefined,
                degree: item.degree ? this.t(item.degree) : undefined,
                fieldOfStudy: item.fieldOfStudy ? this.t(item.fieldOfStudy) : undefined,
                formattedDates: this.formatDates(item.startDate, item.endDate)
            }))
        }
    },
    methods: {
        getMoment(date?: string | null) {
            return (date ? moment(date) : moment()).locale(this.currentMomentLocale);
        },
        calculateDuration(startDate: string, endDate: string | null): string {
            const start = this.getMoment(startDate);
            const end = this.getMoment(endDate);

            const totalMonths = end.diff(start, 'months') + 1;

            const years = Math.floor(totalMonths / 12);
            const months = totalMonths % 12;

            const parts = [];
            if (years > 0) {
                parts.push(this.t('pages.home.experience.duration.years', { count: years }));
            }
            if (months > 0) {
                parts.push(this.t('pages.home.experience.duration.months', { count: months }));
            }

            return parts.join(' ');
        },
        formatDates(startDate: string, endDate: string | null): string {
            const start = this.getMoment(startDate).format('MMM YYYY');
            const end = endDate
                ? this.getMoment(endDate).format('MMM YYYY')
                : this.t('pages.home.present')
            ;
            const duration = this.calculateDuration(startDate, endDate);

            return `${start} - ${end} · ${duration}`;
        }
    }
};
</script>

<template>
    <v-card class="glow-card">
        <template v-slot:title>
            {{ t('pages.home.experience.title') }}
        </template>
        <template v-slot:text>
            <div class="text-subtitle-2 font-weight-bold mb-3 text-medium-emphasis">
                {{ t('pages.home.experience.subtitle') }}
            </div>

            <v-timeline
                align="start"
                side="end"
                direction="vertical"
                line-color="primary"
                :density="appStore.isToShrink ? 'compact' : 'comfortable'"
            >
                <v-timeline-item
                    v-for="(item, index) in items"
                    :key="index"
                    dot-color="primary"
                    :icon="item.icon"
                    size="small"
                >
                    <v-card
                        class="pa-0 glow-card experience-item-card"
                    >
                        <div class="d-flex justify-space-between align-start flex-wrap ga-2">
                            <div class="text-label-medium text-uppercase text-secondary font-weight-bold">
                                {{ item.formattedDates }}
                            </div>
                            <v-chip
                                v-if="item.type === 'experience'"
                                size="x-small"
                                color="secondary"
                                variant="tonal"
                                class="font-weight-bold"
                            >
                                {{ item.company }}
                            </v-chip>
                            <v-chip
                                v-else-if="item.type === 'education'"
                                size="x-small"
                                color="primary"
                                variant="tonal"
                                class="font-weight-bold"
                            >
                                {{ item.institution }}
                            </v-chip>
                        </div>

                        <div class="text-title-large font-weight-bold mb-1">
                            {{ item.title }}
                        </div>

                        <div class="d-flex align-center text-subtitle-2 text-medium-emphasis mb-3">
                            <v-icon icon="mdi-map-marker" size="14" class="ml-2 mr-1"></v-icon>
                            <span>{{ item.location }}</span>
                        </div>

                        <div v-if="item.type === 'education' && item.degree" class="text-subtitle-2 text-grey-darken-1 mb-2">
                            {{ item.degree }} • {{ item.fieldOfStudy }}
                        </div>

                        <p v-if="item.description" class="text-body-2 text-medium-emphasis line-height-relaxed">
                            {{ item.description }}
                        </p>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </template>
    </v-card>
</template>
