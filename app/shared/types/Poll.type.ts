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

export type UnpreparedAnswers = {
    [key in string]: any;
}

export type PreparedAnswers = {
    questionId: string;
    content: any;
}

export type PollResponse = {
    pollId: string;
    respondent?: string;
    answers: PreparedAnswers[];
};