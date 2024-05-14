<script setup lang="ts">
import type { ExamTableColumns, Student } from "~/utils/types";

const props = defineProps<{
    studentColumns: StudentTableColumn[];
    examColumns: ExamTableColumns[];
    students: Student[];
}>();

const emit = defineEmits<{ studentChanged: [student: Student] }>();

function onStudentScoreChanged(score: Score, studentId: string, examId: string) {
    const student = props.students.find((student) => student.id === studentId);
    if (!student) {
        return;
    }
    student.scores[examId] = score;
    emit("studentChanged", student);
}
</script>

<template>
    <v-table fixed-header>
        <thead>
            <tr>
                <th v-for="column in props.studentColumns" :key="column.id" :class="`text-` + column.align">
                    {{ column.label }}
                </th>
                <th v-for="column in props.examColumns" :key="column.id" :class="`text-` + column.align">
                    <span>{{ column.label }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="stud in props.students" :key="stud.id">
                <td
                    v-for="studCol in props.studentColumns"
                    :key="studCol.id"
                    :class="`text-` + studCol.align + ` font-weight-bold`"
                    :style="`background-color: #f5f5f5;`"
                >
                    {{ studCol.fieldFn(stud) }}
                </td>

                <OverviewTableCell
                    v-for="examCol in props.examColumns"
                    :key="examCol.id"
                    :score="examCol.fieldFn(stud)"
                    :min-points="0"
                    :max-points="examCol.exam.maxPoints"
                    :grading-scale="examCol.exam.gradingScale"
                    @score-changed="(score) => onStudentScoreChanged(score, stud.id, examCol.id)"
                />
            </tr>
        </tbody>
    </v-table>
</template>

<style scoped>
th {
    vertical-align: bottom;
    text-align: center;
}

th span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    white-space: nowrap;
}
</style>
