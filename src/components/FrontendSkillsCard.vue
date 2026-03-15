<script setup lang="ts">
import BaseSkillsCard from './common/BaseSkillsCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const languages = ['Vue.js', 'React', 'TypeScript', 'SCSS', 'CSS', 'Bootstrap', 'Tailwind CSS'];
const tools = [
    { name: 'IntelliJ IDEA', image: '/icons/intellij-idea_logo_300x300.png' },
    { name: 'Visual Studio Code', image: '/icons/vscode-original.svg' },
    { name: 'Figma', image: '/icons/figma-original.svg' },
    { name: 'Git', image: '/icons/git-original.svg' }
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
