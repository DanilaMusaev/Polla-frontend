import type { PollApiClient } from "./interfaces";

export class PollService {
    private pollApiClient: PollApiClient;
    
    constructor(pollApiClient: PollApiClient) {
        this.pollApiClient = pollApiClient;
    }

    async getPoll(pollId: string) {
        try {
            const poll = await this.pollApiClient.GetPoll(pollId);

            return poll;
        } catch (err) {
            console.error(err);
            alert('Error while trying get the poll by id:' + pollId); // Пока так, ALERT
        }
    }

    async createPoll(poll: Poll) {
        try {
            const pollInformation = await this.pollApiClient.CreatePoll(poll);

            return pollInformation;
        } catch (err) {
            console.error(err);
            alert('Error while trying create the poll...') // Пока так, ALERT
        }
    }

    async getPollResults(resultId: string) {
        try {
            const pollResults = await this.pollApiClient.GetPollResult(resultId);

            return pollResults;
        } catch (err) {
            console.error(err);
            alert('Error while trying get the poll results...') // Пока так, ALERT
        }
    }

    async submitResponse(response: PollResponse) {
        try {
            const createdResponse = await this.pollApiClient.SubmitResponse(response);

            return createdResponse;
        } catch (err) {
            console.error(err);
            alert('Error while trying submit the response on poll...') // Пока так, ALERT
        }
    }
}