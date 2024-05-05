<script setup lang="ts">
const props = defineProps<{
    students: Student[];
    exams: Exam[];
}>();

const emit = defineEmits<{ studentChanged: [student: Student] }>();

const studentRows = getStudentRows(props.students, props.exams);

function onPointsScoredChanged(studentId: string, examId: string, pointsScored: number | null) {
    const student = props.students.find((student) => student.id === studentId);

    if (student === undefined) {
        console.error("Tried to update points for non-existing student");
        return;
    }

    ApiHelper.updateStudent(student, examId, pointsScored);
    emit("studentChanged", student);
}

const studentCols: StudentTableCol[] = [
    {
        id: "lastName",
        align: "left",
        label: "Last Name",
        field: (stud: StudentTableRow) => stud.lastName,
    },
    {
        id: "firstName",
        align: "left",
        label: "First Name",
        field: (stud: StudentTableRow) => stud.firstName,
    },
];

const examCols: ExamTableCol[] = props.exams.map((exam: Exam) => ({
    id: exam.id,
    align: "center",
    label: exam.name + " (" + exam.maxPoints + " P.)",
    field: (row: StudentTableRow) => row.scores[exam.id],
    minValue: 0,
    maxValue: exam.maxPoints,
    gradingScale: exam.gradingScale,
}));

function getStudentRows(students: Student[], exams: Exam[]): StudentTableRow[] {
    const rows: StudentTableRow[] = students
        .map((student) => studentToRow(student, exams))
        .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));
    return rows;
}

function studentToRow(student: Student, exams: Exam[]): StudentTableRow {
    const scores = exams.reduce((acc, exam) => {
        acc[exam.id] = getPointsScored(exam.id, student.scores);
        return acc;
    }, {} as Record<string, number | null>);

    const row: StudentTableRow = {
        id: student.id,
        lastName: student.lastName,
        firstName: student.firstName,
        scores,
    };
    return row;
}

function getPointsScored(examId: string, scores: Record<string, Score>): number | null {
    return scores[examId]?.pointsScored ?? null;
}
</script>

<template>
    <OverviewTable
        :studentColumns="studentCols"
        :examColumns="examCols"
        :studentRows="studentRows"
        @points-scored-changed="
            (studentId, examId, scoredPoints) => onPointsScoredChanged(studentId, examId, scoredPoints)
        "
    />
</template>
