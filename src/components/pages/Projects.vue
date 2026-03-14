<script lang="ts">

export default {
    name: "Projects",
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-h3 mb-6">
                    {{ $t('pages.projects.title') }}
                </h1>
                <p class="text-body-1 mb-8">
                    {{ $t('pages.projects.description') }}
                </p>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="i in 3" :key="i" cols="12" md="4">
                <v-card border flat>
                    <v-img
                        src="https://picsum.photos/500/300?random"
                        cover
                        height="200"
                    ></v-img>
                    <v-card-title>Project {{ i }}</v-card-title>
                    <v-card-text>
                        This is a placeholder for project description.
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" variant="text">Learn More</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
</style>
