<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false });
const title = defineModel<string>("title", { default: "Titletext" });
</script>

<template>
    <v-app-bar :elevation="0" class="border">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="modelValue = !modelValue"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>
</template>
