<script setup lang="ts">
import type { QuestionFromApi } from '~/api/types/poll.api-type';

interface Props {
    question: Omit<QuestionFromApi, 'pollId'>;
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
    <div class="question-image-choice">
        <UiQuestionBaseBorderChoice
            v-for="choice, index in props.question.options"
            :key="`${index}__${choice}`"
            :is-selected="modelValue === choice"
            class="choice-label"
            flex
        >
            <input
                type="radio"
                :name="props.question.id"
                :value="choice"
                :checked="modelValue === choice"
                @change="handleChange(choice)"
                class="choice-input"
            />
            <div class="choice-content">
                <!-- Need add images handle from question prop -->
                <NuxtImg class="choice-image" src="/images/ImagePlaceholder.png" placeholder="/images/ImagePlaceholder.png" />
            </div>
        </UiQuestionBaseBorderChoice>
    </div>
</template>

<style scoped>
.question-image-choice{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px 6px;
}

.choice-input {
    display: none;
    visibility: hidden;
    pointer-events: none;
}

.choice-content {
    overflow: hidden;
    width: 100%;
    border-radius: 6px;
}

.choice-image {
    width: 100%;
}
</style>
