<script lang="ts">

export default {
    name: "Projects"
}
</script>

<template>
    <div class="projects">
        <h1>{{ $t('pages.projects.title') }}</h1>
        <p>{{ $t('pages.projects.description') }}</p>
    </div>
</template>

<style lang="scss" scoped>
.projects {
    padding: 20px;
    h1 {
        color: #42b983;
    }
}
</style>
