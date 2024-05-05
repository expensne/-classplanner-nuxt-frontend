<script setup lang="ts">
const { $api } = useNuxtApp();

const students = await $api.students.getStudents();
const exams = await $api.exams.getExams();

async function onStudentChanged(student: Student) {
    await $api.students.updateStudent(student);
}
</script>

<template>
    <v-container class="ma-0">
        <v-sheet>
            <OverviewTableWrapper
                :students="students"
                :exams="exams"
                @student-changed="(student) => onStudentChanged(student)"
            />
        </v-sheet>
    </v-container>
</template>
