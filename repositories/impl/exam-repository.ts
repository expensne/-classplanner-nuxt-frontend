import FetchFactory from "../fetch-factory";

export class ExamsRepository extends FetchFactory {
    private ENDPOINT = "/exams";

    async getExams(): Promise<Exam[]> {
        return this.call(
            "GET",
            this.ENDPOINT,
            undefined // body
        );
    }

    async getExamById(id: string): Promise<Exam> {
        return this.call(
            "GET",
            `${this.ENDPOINT}/${id}`,
            undefined // body
        );
    }

    async createExam(exam: Exam): Promise<Exam> {
        return this.call("POST", this.ENDPOINT, exam);
    }

    async updateExam(exam: Exam): Promise<Exam> {
        return this.call("PUT", `${this.ENDPOINT}/${exam.id}`, exam);
    }

    async deleteExam(exam: Exam): Promise<Exam> {
        return this.call(
            "DELETE",
            `${this.ENDPOINT}/${exam.id}`,
            undefined // body
        );
    }
}
