<script setup lang="ts">
import { OVERVIEW_ICON, STUDENT_ICON, EXAM_ICON } from "~/constants";
const show = defineModel<boolean>({ default: false });
</script>

<template>
    <v-navigation-drawer v-model="show">
        <v-list>
            <v-list-item
                link
                title="Table"
                :prepend-icon="OVERVIEW_ICON"
                @click="() => navigateTo('/overview')"
            ></v-list-item>
            <v-list-item
                link
                title="Add / Edit Students"
                :prepend-icon="STUDENT_ICON"
                @click.stop="() => navigateTo('/test')"
            ></v-list-item>
            <v-list-item
                link
                title="Add / Edit Exams"
                :prepend-icon="EXAM_ICON"
                @click="() => navigateTo('/test')"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
