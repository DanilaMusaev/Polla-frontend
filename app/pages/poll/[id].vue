<script setup lang="ts">
import { usePollService } from '~/composables/usePollService';

const route = useRoute();
const pollService = usePollService();

useHead({
    title: 'Poll - Complete poll',
});

const pollId = computed(() => {
    const id = route.params.id;
    if (id === undefined) {
        return 'id undefined';
    }
    return Array.isArray(id) ? id[0] || 'id undefined' : id;
});

const { data, pending, error, refresh } = useAsyncData(
    `poll-${pollId.value}`,
    async () => {
        const poll = await pollService.getPoll(pollId.value);

        // Искусственная задержка, дабы было видно загрузку
        const _ = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(0);
            }, 1000);
        });

        return {
            poll,
        };
    },
    { watch: [pollId] }
);

const respName = ref<string>();
const questionAnswers = reactive<UnpreparedAnswers>({});

const handleRespNameChange = (value: string) => {
    respName.value = value;
}

const handleAnswerChange = (value: any, questionId: string) => {
    questionAnswers[questionId] = value;
};

const checkAnswersForQuestions = (answers: UnpreparedAnswers): boolean => {
    if (!data || !data.value || !hasPollData(data.value)) {
        alert('Poll data is no available'); // ALERT
        return false;
    }

    if (
        Object.keys(answers).length <= 0 ||
        Object.keys(answers).length !== data.value.poll.questions.length
    ) {
        alert('You must answer all the questions in the survey.'); // Пока так ALERT
        return false;
    }

    return true;
};

const handleSubmitResponse = (
    pollId: string,
    answers: UnpreparedAnswers,
    respondent?: string
) => {
    if (!checkAnswersForQuestions(answers)) {
        return;
    }
    const pollResponse = preparePollAnswersToSending(
        pollId,
        answers,
        respondent
    );

    if (!pollResponse) {
        return;
    }
    console.log(pollResponse);
};

const handleSubmit = () => {
    if (!data.value?.poll) {
        return;
    }

    handleSubmitResponse(data.value.poll.id, questionAnswers, respName.value);
}
</script>

<template>
    <div class="complete-poll main-content">
        <LayoutContainer>
            <div class="complete-poll__inner">
                <div class="complete-poll__content">
                    <div v-if="pending" class="complete-poll__loader">
                        Loading...
                    </div>

                    <div v-else-if="error" class="complete-poll__error">
                        Error loading poll: {{ error.message }}
                    </div>

                    <DomainCompletePollForm
                        v-else-if="data?.poll"
                        :poll="data.poll"
                        :resp-name="respName"
                        :question-answers="questionAnswers"
                        @update:resp-name="handleRespNameChange"
                        @answer-change="handleAnswerChange"
                        @submit="handleSubmit"
                    />

                    <DomainCompletePollNotFound v-else :poll-id="pollId" />
                </div>
            </div>
        </LayoutContainer>
    </div>
</template>

<style scoped>
.complete-poll__inner {
    width: 100%;
    display: flex;
    justify-content: center;
}

.complete-poll__content {
    width: 100%;
    max-width: 650px;
}
</style>
