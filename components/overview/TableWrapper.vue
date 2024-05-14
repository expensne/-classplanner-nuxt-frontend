<script setup lang="ts">
const props = defineProps<{
    students: Student[];
    exams: Exam[];
}>();

const emit = defineEmits<{ studentChanged: [student: Student] }>();

function onStudentChanged(student: Student) {
    emit("studentChanged", student);
}

const studentColumns = createStudentTableColumns();
const examColumns = createExamTableColumns(props.exams);

function createStudentTableColumns(): StudentTableColumn[] {
    return [
        {
            id: "lastName",
            align: "left",
            label: "Last Name",
            fieldFn: (stud) => stud.lastName,
        },
        {
            id: "firstName",
            align: "left",
            label: "First Name",
            fieldFn: (stud) => stud.firstName,
        },
    ];
}
function createExamTableColumns(exams: Exam[]): ExamTableColumns[] {
    return exams.map((exam: Exam) => ({
        id: exam.id,
        align: "center",
        label: exam.name + " (" + exam.maxPoints + " P.)",
        fieldFn: (stud) => {
            let score = stud.scores[exam.id];
            if (!score) {
                score = {
                    pointsScored: null,
                    isPostscript: false,
                };
            }
            return score;
        },
        exam,
    }));
}
</script>

<template>
    <OverviewTable
        :studentColumns="studentColumns"
        :examColumns="examColumns"
        :students="$props.students"
        @student-changed="(student) => onStudentChanged(student)"
    />
</template>
