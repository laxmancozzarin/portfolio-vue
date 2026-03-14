<script lang="ts">

export default {
    name: "Home"
}
</script>

<template>
    <div class="home">
        <h1>{{ $t('pages.home.title') }}</h1>
        <p>{{ $t('pages.home.description') }}</p>
    </div>
</template>

<style lang="scss" scoped>
.home {
    padding: 20px;
    h1 {
        color: #42b983;
    }
}
</style>
