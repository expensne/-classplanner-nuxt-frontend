interface State {
    examsList: Exam[];
}

export default function useExam() {
    const { $repository } = useNuxtApp();

    const state = reactive<State>({
        examsList: [],
    });

    async function fetchExams() {
        const exams = await $repository.exams.getExams();

        state.examsList = exams;
    }

    async function createExam(exam: Exam) {
        const newExam = await $repository.exams.createExam(exam);

        if (newExam) {
            state.examsList = [...state.examsList, newExam];
        }
    }

    async function updateExam(exam: Exam) {
        const updatedExam = await $repository.exams.updateExam(exam);

        if (updatedExam) {
            state.examsList = state.examsList.map((s) => (s.id === updatedExam.id ? updatedExam : s));
        }
    }

    async function deleteExam(exam: Exam) {
        await $repository.exams.deleteExam(exam);

        state.examsList = state.examsList.filter((s) => s.id !== exam.id);
    }

    return {
        state,
        fetchExams,
        createExam,
        updateExam,
        deleteExam,
    };
}
