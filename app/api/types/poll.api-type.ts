export interface QuestionFromApi {
    id: string;
    text: string;
    type: QuestionTypes;
    order: number;
    options?: any;
    pollId: string;
}

export interface PollFromApi {
    id: string;
    title: string;
    description?: string;
    questions: QuestionFromApi[];
}

export interface PollInfoFromApi {
  id: string;
  title: string;
  links: {
    getPoll: string;
    resultsPoll: string;
  };
}

export interface PollResultsFromApi {
    id: string;
    title: string;
    description: string;
    createdAt: string | Date;
    userId: string | null;
    resultsId: string;
    responses: ResponseFromApi[];
}

export interface ResponseFromApi {
    id: string;
    respondent: string;
    submittedAt: string | Date;
    pollId: string;
    answers: AnswerFromApi[];
}

export interface AnswerFromApi {
    id: string;
    questionId: string;
    responseId: string;
    content: string;
}