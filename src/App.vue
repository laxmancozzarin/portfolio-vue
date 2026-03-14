<script lang="ts">

export default {
    name: 'App',
    methods: {
        changeLanguage(lang: string) {
            this.$i18n.locale = lang
        }
    }
}
</script>

<template>
    <header>
        <div class="wrapper">
            <div class="language-switcher">
                <button @click="changeLanguage('en')">EN</button>
                <button @click="changeLanguage('it')">IT</button>
            </div>

            <nav>
                <RouterLink to="/">{{ $t('nav.home') }}</RouterLink>
                <RouterLink to="/projects">{{ $t('nav.projects') }}</RouterLink>
            </nav>
        </div>
    </header>

    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
.logo {
    display: block;
    margin: 0 auto 2rem;
}

.language-switcher {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
    button {
        padding: 5px 10px;
        cursor: pointer;
        border: 1px solid #42b983;
        background: transparent;
        color: #42b983;
        &:hover {
            background: #42b983;
            color: white;
        }
    }
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;

    a.router-link-exact-active {
        color: var(--color-text);
        &:hover {
            background-color: transparent;
        }
    }

    a {
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid var(--color-border);
        &:first-of-type {
            border: 0;
        }
    }
}

@media (min-width: 1024px) {
    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
