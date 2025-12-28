<script setup lang="ts">
import type { QuestionFromApi } from '~/api/types/poll.api-type';

interface Props {
    question: QuestionFromApi;
    modelValue?: string | number;
}
interface Emits {
    (e: 'update:modelValue', value: string | number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleChange = (value: string | number) => {
    emit('update:modelValue', value);
};
</script>

<template>
    <div class="question-single-choice">
        <label
            v-for="choice in props.question.options"
            :key="choice.value"
            class="choice-label"
        >
            <input
                type="radio"
                :name="props.question.id"
                :value="choice"
                :checked="modelValue === choice"
                @change="handleChange(choice.value)"
                class="choice-input"
            />
            <div class="choice-content">
                <span class="choice-label-text">{{ choice }}</span>
            </div>
        </label>
    </div>
</template>

<style scoped>
    
</style>
