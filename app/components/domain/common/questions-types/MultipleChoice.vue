<script setup lang="ts">
import type { QuestionFromApi } from '~/api/types/poll.api-type';

interface Props {
    question: Omit<QuestionFromApi, 'pollId'>;
    modelValue?: (string | number)[];
}
interface Emits {
    (e: 'update:modelValue', value: (string | number)[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const currentValue = computed(() => {
    return Array.isArray(props.modelValue) ? props.modelValue : [];
});

const handleChange = (value: string | number, checked: boolean) => {
    let newValue: (string | number)[];

    if (checked) {
        newValue = [...currentValue.value, value];
    } else {
        newValue = currentValue.value.filter(v => v !== value);
    }

    emit('update:modelValue', newValue);
};
</script>

<template>
    <div class="question-multiple-choice">
        <UiQuestionBaseBorderChoice
            v-for="(choice, index) in props.question.options"
            :key="`${index}__${choice}`"
            :is-selected="modelValue?.includes(choice)"
            class="choice-label"
            flex
            center
        >
            <input
                type="checkbox"
                :value="choice"
                :checked="modelValue?.includes(choice)"
                @change="handleChange(choice, ($event.target as HTMLInputElement).checked)"
                class="choice-input"
            />
            <div class="choice-content">
                <span class="choice-label-text">{{ choice }}</span>
            </div>
        </UiQuestionBaseBorderChoice>
    </div>
</template>

<style scoped>
.question-multiple-choice {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px 6px;
}

.choice-input {
    display: none;
    visibility: hidden;
    pointer-events: none;
}

.choice-content {
    padding: 6px 15px;
}
</style>
