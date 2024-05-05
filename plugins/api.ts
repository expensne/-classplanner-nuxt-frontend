import type { FetchOptions } from "ofetch";
import ExamsRepository from "~/api/repositories/exam-repository";
import StudentsRepository from "~/api/repositories/student-repository";

export interface Respository {
    students: StudentsRepository;
    exams: ExamsRepository;
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const baseURL = makeUrl(config.public.apiBase, config.public.apiVersion);

    const fetchOptions: FetchOptions = { baseURL };
    const apiFetcher = $fetch.create(fetchOptions);

    const repository: Respository = {
        students: new StudentsRepository(apiFetcher),
        exams: new ExamsRepository(apiFetcher),
    };

    return {
        provide: {
            repository,
        },
    };
});

function makeUrl(baseUrl: string, ...parts: string[]): string {
    return [baseUrl, ...parts].join("/");
}
