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

export interface StudentTableCol {
    id: string;
    align: string;
    label: string;
    field: (row: StudentTableRow) => string;
}

export interface ExamTableCol {
    id: string;
    align: string;
    label: string;
    field: (row: StudentTableRow) => number | null;
    minValue: number;
    maxValue: number;
    gradingScale: GradingScale;
}
