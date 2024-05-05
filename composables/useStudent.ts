interface State {
    studentsList: Student[];
}

export default function useStudent() {
    const { $repository } = useNuxtApp();

    const state = reactive<State>({
        studentsList: [],
    });

    async function fetchStudents() {
        const students = await $repository.students.getStudents();

        state.studentsList = students;
    }

    async function createStudent(student: Student) {
        const newStudent = await $repository.students.createStudent(student);

        if (newStudent) {
            state.studentsList = [...state.studentsList, newStudent];
        }
    }

    async function updateStudent(student: Student) {
        const updatedStudent = await $repository.students.updateStudent(student);

        if (updatedStudent) {
            state.studentsList = state.studentsList.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
        }
    }

    async function deleteStudent(student: Student) {
        await $repository.students.deleteStudent(student);

        state.studentsList = state.studentsList.filter((s) => s.id !== student.id);
    }

    return {
        state,
        fetchStudents,
        createStudent,
        updateStudent,
        deleteStudent,
    };
}
