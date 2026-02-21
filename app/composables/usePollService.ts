import { PollService } from "~/api/polla";
import { MockApiClient } from "~/api/polla/apis/mockApi"

export const usePollService = () => {
    const mockApi = new MockApiClient();
    const pollService = new PollService(mockApi);

    return pollService;
}