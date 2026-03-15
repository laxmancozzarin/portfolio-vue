<script setup lang="ts">
import BaseSkillsCard from './common/BaseSkillsCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const languages = ['Symfony', 'Laravel', 'PHP', 'Postgres', 'Node.js'];
const tools = [
    { name: 'PhpStorm', image: '/icons/phpstorm_logo_300x300.png' },
    { name: 'IntelliJ IDEA', image: '/icons/intellij-idea_logo_300x300.png' },
    { name: 'Visual Studio Code', image: '/icons/vscode-original.svg' },
    { name: 'DataGrip', image: '/icons/datagrip_logo_300x300.png' },
    { name: 'Git', image: '/icons/git-original.svg' },
    { name: 'GitLab', image: '/icons/gitlab-original.svg' },
    { name: 'CLI Terminal', image: '/icons/bash-original.svg' }
];
</script>

<template>
    <BaseSkillsCard
        :title="t('pages.home.skills.backend.title')"
        :languages-title="t('pages.home.skills.backend.languages')"
        :tools-title="t('pages.home.skills.backend.tools')"
        :languages="languages"
        :tools="tools"
    />
</template>
