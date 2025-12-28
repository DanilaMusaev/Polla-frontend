<script setup lang="ts">
import type { QuestionFromApi } from '~/api/types/poll.api-type';
import Text from './questions-types/Text.vue';

interface Props {
    question: QuestionFromApi;
    modelValue?: any;
}
interface Emits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any, questionId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const componentMap = {
    TEXT: Text,
    SINGLE_CHOICE: Text,
    MULTIPLE_CHOICE: Text,
    IMAGE_CHOICE: Text,
    RATING: Text,
} as const;

const handleChange = (value: any) => {
    emit('update:modelValue', value);
    emit('change', value, props.question.id);
};
</script>

<template>
    <div class="question">
        <div class="question__header">
            <h4 class="question__text">{{ props.question.text }}</h4>
        </div>
        <div class="question__content">
            <component
                :is="componentMap[props.question.type]"
                :question="props.question"
                :modelValue="modelValue"
                @update:modelValue="handleChange"
            />
        </div>
    </div>
</template>

<style scoped>
.question {
    padding: 10px;

    border-radius: 8px;
    background-color: var(--surface);
}

.question__text {
    margin-bottom: 15px;

    font-weight: 600;
    font-size: 16px;
    color: var(--text-primary);
}
</style>
