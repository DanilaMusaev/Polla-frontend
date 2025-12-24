export interface Poll {
    title: string;
    description?: string;
    questions: Question[];
}

export interface Question {
    text: string;
    type: QuestionTypes;
    order: number;
    options?: any;
}

export type QuestionTypes =
    | 'TEXT'
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'IMAGE_CHOICE'
    | 'RATING';
