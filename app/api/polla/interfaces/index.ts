import type { PollFromApi, PollInfoFromApi, PollResultsFromApi, ResponseFromApi } from "../../types/poll.api-type";

export interface PollApiClient {
    CreatePoll(body: Poll): Promise<PollInfoFromApi>;
    GetPoll(pollId: string): Promise<PollFromApi>;
    GetPollResult(resultId: string): Promise<PollResultsFromApi>;
    SubmitResponse(response: PollResponse): Promise<ResponseFromApi>;
}