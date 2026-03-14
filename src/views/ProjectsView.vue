<script lang="ts">

import Projects from "@/components/pages/Projects.vue";

export default {
    name: 'ProjectsView',
    components: {Projects}
}
</script>

<template>
    <Projects />
</template>

<style scoped>
@media (min-width: 1024px) {
    .projects {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
