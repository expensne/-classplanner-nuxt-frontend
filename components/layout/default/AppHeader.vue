<script lang="ts">
export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    methods: {
        toggleShowNavDrawer() {
            this.$emit("update:modelValue", !this.modelValue);
        },
    },
};
</script>

<template>
    <v-app-bar :elevation="0" class="border">
        <template v-slot:prepend>
            <v-app-bar-nav-icon
                @click.stop="toggleShowNavDrawer"
            ></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Classplanner (alpha)</v-app-bar-title>
    </v-app-bar>
</template>
