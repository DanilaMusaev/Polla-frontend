<script setup lang="ts">
import type { PollFromApi } from '~/api/types/poll.api-type';

interface Props {
    poll: PollFromApi;
    respName?: string;
    questionAnswers: UnpreparedAnswers;
}

interface Emits {
    (e: 'update:respName', value: string): void;
    (e: 'answerChange', value: any, questionId: string): void;
    (e: 'submit'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localRespName = computed({
    get: () => props.respName,
    set: (value) => emit('update:respName', value || ''),
});

const questionAnswersHandlers = (value: any, questionId: string) => {
    emit('answerChange', value, questionId);
};
</script>

<template>
    <div>
        <h2 class="title-1 complete-poll__title">
            Completing the poll: "{{ poll.title }}"
        </h2>
        <div class="complete-poll__respondent-wrapper">
            <p class="complete-poll__respondent-tip">Enter your name/alias:</p>
            <UiMyInput
                v-model="localRespName"
                class="complete-poll__respondent-input"
                placeholder='Leave field blank to stay "anonymous"'
            />
        </div>
        <div class="complete-poll__name-desc-wrapper">
            <p class="complete-poll__name">
                {{ poll.title }}
            </p>
            <p v-if="poll.description" class="complete-poll__desc">
                {{ poll.description }}
            </p>
        </div>
        <div class="complete-poll__questions-wrapper">
            <DomainCommonQuestion
                v-for="question in poll.questions"
                :question="question"
                v-model="questionAnswers[question.id]"
                @change="questionAnswersHandlers"
            />
        </div>
        <div class="complete-poll__controls-wrapper">
            <UiMyButton @click="emit('submit')" class="complete-poll__send-btn"
                >Send Answers</UiMyButton
            >
        </div>
    </div>
</template>

<style scoped>
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
