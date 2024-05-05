<script setup lang="ts">
const props = defineProps<{
    studentColumns: StudentTableCol[];
    examColumns: ExamTableCol[];
    studentRows: StudentTableRow[];
}>();

const emit = defineEmits<{
    pointsScoredChanged: [studentId: string, examId: string, pointsScored: number | null];
}>();

function onPointsScoreChanged(studentId: string, examId: string, newPoints: number | null) {
    emit("pointsScoredChanged", studentId, examId, newPoints);
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
            <tr v-for="row in props.studentRows" :key="row.id">
                <td
                    v-for="column in props.studentColumns"
                    :key="column.id"
                    :class="`text-` + column.align + ` font-weight-bold`"
                    :style="`background-color: #f5f5f5;`"
                >
                    {{ column.field(row) }}
                </td>

                <OverviewTableCell
                    v-for="column in props.examColumns"
                    :key="column.id"
                    :pointsScored="column.field(row)"
                    :min-points="0"
                    :max-points="column.maxValue"
                    :grading-scale="column.gradingScale"
                    @points-scored-changed="(newVal) => onPointsScoreChanged(row.id, column.id, newVal)"
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
