<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { useAppStore } from '@/stores/app';
import rawExperiences from '@/config/experiences.json';

export default defineComponent({
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
                : this.t('pages.home.present');
            const duration = this.calculateDuration(startDate, endDate);

            return `${start} - ${end} · ${duration}`;
        }
    }
});
</script>

<template>
    <v-card>
        <template v-slot:title>
            {{ t('pages.home.experience.title') }}
        </template>
        <template v-slot:subtitle>
            {{ t('pages.home.experience.subtitle') }}
        </template>
        <template v-slot:text>
            <v-timeline
                align="start"
                side="end"
                direction="vertical"
                line-color="secondary"
                :density="appStore.isToShrink ? 'compact' : 'comfortable'"
            >
                <v-timeline-item
                    v-for="(item, index) in items"
                    :key="index"
                    :dot-color="item.color"
                    :icon="item.icon"
                >
                    <v-card class="pa-4" color="background" style="width: 100%;">
                        <template v-slot:title>
                            <div class="text-label-medium text-uppercase mt-2 mb-3">
                                {{ item.formattedDates }}
                            </div>

                            <div class="text-title-large">
                                {{ item.title }}
                            </div>
                        </template>
                        <template v-slot:subtitle>
                            <template v-if="item.type === 'experience'">
                                {{ item.company }}
                            </template>

                            <template v-else-if="item.type === 'education'">
                                {{ item.institution }}
                            </template>

                            <span
                                v-if="item.location"
                                class="text-subtitle-2 text-grey-darken-1 ml-2"
                            >
                                ({{ item.location }})
                            </span>
                        </template>
                        <template v-slot:text>
                            <p v-if="item.type === 'education' && item.degree" class="text-subtitle-2 text-grey-darken-1 mb-1">
                                {{ item.degree }} - {{ item.fieldOfStudy }}
                            </p>
                            <p v-if="item.description" class="text-body-2">
                                {{ item.description }}
                            </p>
                        </template>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </template>
    </v-card>
</template>

<style lang="scss" scoped>
</style>
