<script setup lang="ts">
import type { QuestionFromApi } from '~/api/types/poll.api-type';

const route = useRoute();
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

const respName = ref<string>();
const questionAnswers = reactive<UnpreparedAnswers>({});

const questionAnswersHandlers = (value: any, questionId: string) => {
    questionAnswers[questionId] = value;
};

const checkAnswersForQuestions = (answers: UnpreparedAnswers): boolean => {
    if (Object.keys(answers).length <= 0 || Object.keys(answers).length !== mockPoll.questions.length) {
        alert('You must answer all the questions in the survey.'); // Пока так ALERT
        return false;
    }
    
    return true;
}

const handleSubmitResponse = (pollId: string, answers: UnpreparedAnswers, respondent?: string) => {
    if (!checkAnswersForQuestions(answers)) {
        return;
    }
    const pollResponse = preparePollAnswersToSending(pollId, answers, respondent);
    if (!pollResponse) {
        return;
    }
    console.log(pollResponse);
}

// Mock poll just for test
const mockPoll: {
    id: string;
    title: string;
    description: string;
    questions: QuestionFromApi[];
} = {
    id: 'e157303c-0bc2-46d8-ba4a-1c48af09783c',
    title: 'Опрос о еде',
    description: 'Помогите выбрать меню',
    questions: [
        {
            id: '3fc7cc73-6a6d-4550-b408-618c262a0cac',
            text: 'Как вас зовут?',
            type: 'TEXT',
            order: 1,
            options: null,
            pollId: 'e157303c-0bc2-46d8-ba4a-1c48af09783c',
        },
        {
            id: '2ff2a260-3882-46e7-9241-f3f4fc28e7e5',
            text: 'Какая кухня вам нравится?',
            type: 'SINGLE_CHOICE',
            order: 2,
            options: ['Итальянская', 'Японская', 'Мексиканская'],
            pollId: 'e157303c-0bc2-46d8-ba4a-1c48af09783c',
        },
        {
            id: '2ff2a260-agges-46e7-dc-xcdgsg3gwet',
            text: 'Какая шеф вам понравился?',
            type: 'MULTIPLE_CHOICE',
            order: 3,
            options: ['Умомный', 'Парашный', 'Баринский', 'Ксентаворский'],
            pollId: 'e157303c-0bc2-46d8-ba4a-1c48af09783c',
        },
    ],
};
</script>

<template>
    <div class="complete-poll main-content">
        <LayoutContainer>
            <div class="complete-poll__inner">
                <div class="complete-poll__content">
                    <div v-if="route.params.id === mockPoll.id">
                        <h2 class="title-1 complete-poll__title">
                            Completing the poll: "{{ mockPoll.title }}"
                        </h2>
                        <div class="complete-poll__respondent-wrapper">
                            <p class="complete-poll__respondent-tip">Enter your name/alias:</p>
                            <UiMyInput v-model="respName" class="complete-poll__respondent-input" placeholder='Leave field blank to stay "anonymous"'/>
                        </div>
                        <div class="complete-poll__name-desc-wrapper">
                            <p class="complete-poll__name">{{ mockPoll.title }}</p>
                            <p v-if="mockPoll.description" class="complete-poll__desc">{{ mockPoll.description }}</p>
                        </div>
                        <div class="complete-poll__questions-wrapper">
                            <DomainCommonQuestion
                                v-for="question in mockPoll.questions"
                                :question="question"
                                v-model="questionAnswers[question.id]"
                                @change="questionAnswersHandlers"
                            />
                        </div>
                    </div>
                    <DomainCompletePollNotFound v-else :poll-id="pollId" />
                    <div class="complete-poll__controls-wrapper">
                        <UiMyButton @click="handleSubmitResponse(mockPoll.id, questionAnswers, respName)" class="complete-poll__send-btn">Send Answers</UiMyButton>
                    </div>
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

.complete-poll__title {
    margin-bottom: 20px;
}

.complete-poll__respondent-wrapper {
    margin-bottom: 15px;
    padding: 10px;

    border-radius: 8px;
    background-color: var(--surface);
}

.complete-poll__respondent-tip {
    margin-bottom: 8px;

    font-weight: 700;
    font-size: 18px;
    color: var(--text-primary);
}

.complete-poll__respondent-input {
    width: 100%;
    background-color: var(--background);
}

.complete-poll__name-desc-wrapper {
    margin-bottom: 15px;
    padding: 10px;

    border-radius: 8px;
    background-color: var(--surface);
}

.complete-poll__name {
    font-weight: 700;
    font-size: 18px;
    color: var(--text-primary);
}

.complete-poll__desc {
    font-weight: 400;
    font-size: 16px;
    color: var(--text-secondary);
    line-break: anywhere;
    -ms-line-break: anywhere;
}


.complete-poll__questions-wrapper {
    max-width: 850px;

    display: grid;
    gap: 15px;
}

.complete-poll__controls-wrapper {
    margin-top: 15px;

    display: flex;
    justify-content: center;
}
</style>
