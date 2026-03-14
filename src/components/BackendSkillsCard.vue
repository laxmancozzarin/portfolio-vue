<script setup lang="ts">
import BaseSkillsCard from './common/BaseSkillsCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const languages = ['Symfony', 'Laravel', 'PHP', 'Postgres', 'Node.js'];
const tools = [
    { name: 'PhpStorm', image: 'https://resources.jetbrains.com/storage/products/phpstorm/img/meta/phpstorm_logo_300x300.png' },
    { name: 'IntelliJ IDEA', image: 'https://resources.jetbrains.com/storage/products/intellij-idea/img/meta/intellij-idea_logo_300x300.png' },
    { name: 'Visual Studio Code', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg' },
    { name: 'DataGrip', image: 'https://resources.jetbrains.com/storage/products/datagrip/img/meta/datagrip_logo_300x300.png' },
    { name: 'Git', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
    { name: 'GitLab', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg' },
    { name: 'CLI Terminal', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg' }
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

<style scoped>
</style>
