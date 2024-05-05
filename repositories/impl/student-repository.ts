import type { AsyncDataOptions } from "#app";

import FetchFactory from "../fetch-factory";

export class StudentsRepository extends FetchFactory {
    private ENDPOINT = "/students";

    // TODO: remove if not needed
    async getStudentsReactive(options?: AsyncDataOptions<Student[]>) {
        return useAsyncData(() => {
            return this.call(
                "GET",
                this.ENDPOINT,
                undefined // body
            );
        }, options);
    }

    async getStudents(): Promise<Student[]> {
        return this.call(
            "GET",
            this.ENDPOINT,
            undefined // body
        );
    }

    async getStudentById(id: string): Promise<Student> {
        return this.call(
            "GET",
            `${this.ENDPOINT}/${id}`,
            undefined // body
        );
    }

    async createStudent(student: Student): Promise<Student> {
        return this.call("POST", this.ENDPOINT, student);
    }

    async updateStudent(student: Student): Promise<Student> {
        return this.call("PUT", `${this.ENDPOINT}/${student.id}`, student);
    }

    async deleteStudent(student: Student): Promise<Student> {
        return this.call(
            "DELETE",
            `${this.ENDPOINT}/${student.id}`,
            undefined // body
        );
    }
}
