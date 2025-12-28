export interface QuestionFromApi {
    id: string;
    text: string;
    type: QuestionTypes;
    order: number;
    options?: any;
    pollId: string;
}
