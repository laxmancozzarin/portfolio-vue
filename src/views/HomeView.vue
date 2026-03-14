<script setup lang="ts">
import ExperienceTimelineCard from '../components/ExperienceTimelineCard.vue'
import UserCard from "@/components/UserCard.vue";
import HomeIntroCard from "@/components/HomeIntroCard.vue";
import BackendSkillsCard from "@/components/BackendSkillsCard.vue";
import FrontendSkillsCard from "@/components/FrontendSkillsCard.vue";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
</script>

<template>
    <v-row :class="appStore.isToShrink ? '' : 'ga-6'">
        <v-col
            cols="12"
            xxl="3"
            xl="4"
            lg="4"
            md="12"
            sm="12"
            :class="{ 'sticky-sidebar': !appStore.isToShrink }"
        >
            <UserCard/>
        </v-col>
        <v-col
            cols="12"
            xxl="9"
            xl="8"
            lg="8"
            md="12"
            sm="12"
            class="d-flex flex-column ga-8"
        >
            <HomeIntroCard />

            <v-row>
                <v-col cols="12" xl="6">
                    <BackendSkillsCard />
                </v-col>
                <v-col cols="12" xl="6">
                    <FrontendSkillsCard />
                </v-col>
            </v-row>

            <ExperienceTimelineCard />
        </v-col>
    </v-row>
</template>

<style scoped>
.sticky-sidebar {
    position: sticky;
    top: 20px;
    align-self: start;
}
</style>
