<script setup lang="ts">
import BaseSkillsCard from './common/BaseSkillsCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const languages = ['Vue.js', 'React', 'TypeScript', 'SCSS', 'CSS', 'Bootstrap', 'Tailwind CSS'];
const tools = [
    { name: 'IntelliJ IDEA', image: 'https://resources.jetbrains.com/storage/products/intellij-idea/img/meta/intellij-idea_logo_300x300.png' },
    { name: 'Visual Studio Code', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg' },
    { name: 'Figma', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg' },
    { name: 'Git', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' }
];
</script>

<template>
    <BaseSkillsCard
        :title="t('pages.home.skills.frontend.title')"
        :languages-title="t('pages.home.skills.frontend.languages')"
        :tools-title="t('pages.home.skills.frontend.tools')"
        :languages="languages"
        :tools="tools"
    />
</template>

<style scoped>
</style>
