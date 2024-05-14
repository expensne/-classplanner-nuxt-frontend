<script setup lang="ts">
const showNavDrawer = ref(false);
</script>

<template>
    <v-app>
        <LayoutDefaultAppHeader v-model="showNavDrawer" title="Classplanner (alpha)"/>
        <LayoutDefaultAppDrawer v-model="showNavDrawer" />
        <LayoutDefaultAppMain>
            <slot></slot>
        </LayoutDefaultAppMain>
        <LayoutDefaultAppFooter />
    </v-app>
</template>
