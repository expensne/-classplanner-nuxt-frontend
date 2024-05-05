<script lang="ts">
export default {
    data() {
        return {
            showDrawer: true,
        };
    },
};
</script>

<template>
    <v-app>
        <LayoutDefaultAppHeader v-model="showDrawer" />
        <LayoutDefaultAppDrawer :show="showDrawer" />
        <LayoutDefaultAppMain>
            <slot></slot>
        </LayoutDefaultAppMain>
        <LayoutDefaultAppFooter />
    </v-app>
</template>
