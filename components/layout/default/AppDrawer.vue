<script lang="ts">
export default {
    data() {
        return {
            showDrawer: true,
        };
    },
    created() {
        this.showDrawer = this.show;
    },

    props: ["show"],
    methods: {
        navigateToTable() {
            navigateTo("/overview");
        },
        navigateToStudents() {
            navigateTo("/test");
        },
        navigateToExams() {
            navigateTo("/test");
        },
    },
    watch: {
        show() {
            this.showDrawer = this.show;
        },
    },
};
</script>

<template>
    <v-navigation-drawer v-model="showDrawer">
        <v-list>
            <v-list-item
                link
                title="Table"
                :prepend-icon="OVERVIEW_ICON"
                @click="navigateToTable"
            ></v-list-item>
            <v-list-item
                link
                title="Add / Edit Students"
                :prepend-icon="STUDENT_ICON"
                @click="navigateToStudents"
            ></v-list-item>
            <v-list-item
                link
                title="Add / Edit Exams"
                :prepend-icon="EXAM_ICON"
                @click="navigateToExams"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
