<script setup lang="ts">
import type { QuestionFromApi } from '~/api/types/poll.api-type';

interface Props {
    question: Omit<QuestionFromApi, 'pollId'>,
    modelValue?: string;
}
interface Emits {
    (e: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    emit('update:modelValue', value);
}
</script>

<template>
    <div class="question-text">
        <textarea @input="handleInput" class="question-text__textarea" :name="props.question.id" placeholder="Input your answer..."></textarea>
    </div>
</template>

<style scoped>
.question-text__textarea {
    padding: 8px 10px;
    height: 38px;
    width: 100%;

    font-weight: 400;
    font-size: 16px;
    color: var(--text-primary);

    border-radius: 10px;

    background: var(--background);

    resize: none;
    overflow: hidden;
}

.question-text__textarea::placeholder {
    color: var(--text-secondary);
}
</style>