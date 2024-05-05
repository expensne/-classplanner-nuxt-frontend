export class ApiHelper {
    static updateStudent(student: Student, examId: string, pointsScored: number | null): Student | null {
        const scores = student.scores;
        let oldScore = scores[examId];

        if (oldScore) {
            oldScore.pointsScored = pointsScored;
        } else {
            scores[examId] = {
                pointsScored: pointsScored,
                isPostscript: false,
            };
        }

        student.scores = scores;

        return null;
    }
}
