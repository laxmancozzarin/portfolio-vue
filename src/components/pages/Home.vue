<script lang="ts">

interface TimelineItem {
    type: 'experience' | 'education';
    title: string;
    company?: string;
    institution?: string;
    location?: string;
    startDate: string;
    endDate: string | null;
    description: string;
    icon: string;
    color: string;
    degree?: string;
    fieldOfStudy?: string;
}

export default {
    name: "LinkedInTimeline",
    data() {
        return {
            items: [
                {
                    type: 'experience',
                    title: 'Senior Software Engineer',
                    company: 'Tech Solutions Inc.',
                    location: 'San Francisco, CA',
                    startDate: '2022-03-01',
                    endDate: null,
                    description: 'Led development of critical backend services, mentored junior engineers...',
                    icon: 'mdi-briefcase',
                    color: 'primary',
                },
                {
                    type: 'experience',
                    title: 'Software Engineer',
                    company: 'Innovate Corp.',
                    location: 'Seattle, WA',
                    startDate: '2019-06-01',
                    endDate: '2022-02-28',
                    description: 'Developed new features for SaaS platform, improved system performance...',
                    icon: 'mdi-briefcase',
                    color: 'accent',
                },
                {
                    type: 'education',
                    title: 'Master of Science in Computer Science',
                    institution: 'University of Engineering',
                    degree: 'M.S. in CS',
                    fieldOfStudy: 'Computer Science',
                    startDate: '2017-09-01',
                    endDate: '2019-05-31',
                    description: 'Specialized in AI and Machine Learning. GPA: 3.9/4.0',
                    icon: 'mdi-school',
                    color: 'info',
                },
            ] as TimelineItem[],
        };
    },
    computed: {
        sortedTimeline(): TimelineItem[] {
            return [...this.items].sort((a, b) => {
                const dateA = new Date(a.startDate).getTime();
                const dateB = new Date(b.startDate).getTime();

                return dateB - dateA;
            });
        },
    },
    methods: {
        formatDates(startDate: string, endDate: string | null): string {
            const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
            const start = new Date(startDate).toLocaleDateString('en-US', options);

            if (!endDate) {
                return `${start} - Present`;
            }
            const end = new Date(endDate).toLocaleDateString('en-US', options);

            return `${start} - ${end}`;
        },
    },
}
</script>

<template>
    <v-container>
        <v-card class="mx-auto" elevation="0">
            <template v-slot:title>
                Professional Journey
            </template>
            <template v-slot:subtitle>
                This is a card subtitle
            </template>
            <template v-slot:text>
                <v-timeline
                    align="start"
                    side="end"
                    direction="vertical"
                    line-color="grey-lighten-2"
                    density="comfortable"
                >
                    <v-timeline-item
                        v-for="(item, index) in sortedTimeline"
                        :key="index"
                        :dot-color="item.color"
                        :icon="item.icon"
                    >
                        <v-card elevation="0" class="mx-auto">
                            <template v-slot:title>
                                <div class="text-label-medium text-uppercase mt-2 mb-3">
                                    {{ formatDates(item.startDate, item.endDate) }}

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
                                <p class="text-body-2">{{ item.description }}</p>
                            </template>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </template>
        </v-card>
    </v-container>
</template>

<style lang="scss" scoped>
</style>
