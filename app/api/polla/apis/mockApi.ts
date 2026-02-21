import type { PollInfoFromApi, PollFromApi, PollResultsFromApi, ResponseFromApi } from "~/api/types/poll.api-type";
import type { PollApiClient } from "../interfaces";

export class MockApiClient implements PollApiClient {


    async CreatePoll(body: Poll): Promise<PollInfoFromApi> {
        const resp = await $fetch<PollInfoFromApi>('/pollInfo.json', {
            baseURL: 'http://localhost:3000/mock/api',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        return resp;
    }

    async GetPoll(pollId: string): Promise<PollFromApi> {
        const resp = await $fetch<PollFromApi>('/getPoll.json', {
            baseURL: 'http://localhost:3000/mock/api',
        });

        return resp;
    }

    async GetPollResult(resultId: string): Promise<PollResultsFromApi> {
        const resp = await $fetch<PollResultsFromApi>('/pollResults.json', {
            baseURL: 'http://localhost:3000/mock/api',
        });

        return resp;
    }

    async SubmitResponse(response: PollResponse): Promise<ResponseFromApi> {
        const resp = await $fetch<ResponseFromApi>('/submitResponse.json', {
            baseURL: 'http://localhost:3000/mock/api',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        });

        return resp;
    }
}