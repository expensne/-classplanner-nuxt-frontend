export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    scores: Record<string, Score>;
}

export interface Score {
    pointsScored: number | null;
    isPostscript: boolean;
}

export interface Exam {
    id: string;
    name: string;
    maxPoints: number;
    gradingScale: GradingScale;
}

export interface GradingScale {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    [key: string]: number;
}

export type StudentTableRow = {
    id: string;
    lastName: string;
    firstName: string;
    scores: Record<string, number | null>;
};

export interface StudentTableColumn {
    id: string;
    align: string;
    label: string;
    fieldFn: (row: Student) => string;
}

export interface ExamTableColumns {
    id: string;
    align: string;
    label: string;
    fieldFn: (row: Student) => Score;
    exam: Exam;
}

export interface GradeStyle {
    label: string;
    color: string;
    hexColor: string;
}