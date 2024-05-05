import type { FetchOptions } from "ofetch";
import { ExamsRepository } from "~/repositories/impl/exam-repository";
import { StudentsRepository } from "~/repositories/impl/student-repository";

export interface ApiInstance {
    students: StudentsRepository;
    exams: ExamsRepository;
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const baseURL = makeUrl(config.public.apiBase, config.public.apiVersion);

    const fetchOptions: FetchOptions = { baseURL };
    const apiFetcher = $fetch.create(fetchOptions);

    const modules: ApiInstance = {
        students: new StudentsRepository(apiFetcher),
        exams: new ExamsRepository(apiFetcher),
    };

    return {
        provide: {
            api: modules,
        },
    };
});

function makeUrl(baseUrl: string, ...parts: string[]): string {
    return [baseUrl, ...parts].join("/");
}
