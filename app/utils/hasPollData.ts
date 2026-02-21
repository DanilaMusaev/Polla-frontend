import type { QuestionFromApi } from "~/api/types/poll.api-type";

export default function(data: any): data is { poll: QuestionFromApi } {
    return data?.poll !== undefined && Array.isArray(data.poll.questions);
}
