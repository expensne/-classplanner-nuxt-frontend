<script setup lang="ts">
const { state: studentState, fetchStudents, updateStudent } = useStudent();
const { state: examState, fetchExams } = useExam();

await fetchStudents();
await fetchExams();

async function onStudentChanged(student: Student) {
    await updateStudent(student);
}
</script>

<template>
    <v-container class="ma-0">
        <v-sheet>
            <OverviewTableWrapper
                :students="studentState.studentsList"
                :exams="examState.examsList"
                @student-changed="(student) => onStudentChanged(student)"
            />
        </v-sheet>
    </v-container>
</template>
