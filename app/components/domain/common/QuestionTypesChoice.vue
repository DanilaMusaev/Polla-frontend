<script setup lang="ts">
interface Props {
    modelValue?: string | number;
}
interface Emits {
    (e: 'update:modelValue', value: string): void;
}

const mockQuestions: QuestionTypes[] = [
    'TEXT',
    'SINGLE_CHOICE',
    'MULTIPLE_CHOICE',
    'IMAGE_CHOICE',
];

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleChange = (value: string) => {
    emit('update:modelValue', value);
};
</script>

<template>
    <div class="question-type__choice">
        <UiQuestionBaseBorderChoice
            v-for="(choice, index) in mockQuestions"
            :key="`${index}__${choice}`"
            :is-selected="modelValue === choice"
            class="question-type__choice-label"
            flex
            column
        >
            <div class="question-type__type-name">{{ choice.replace('_', ' ') }}</div>
            <input
                type="radio"
                name="create-question-type"
                :value="choice"
                :checked="modelValue === choice"
                @change="handleChange(choice)"
                class="question-type__choice-input"
            />
            <div class="question-type__choice-content">
                <UiQuestionMockQuestion :type="choice" />
            </div>
        </UiQuestionBaseBorderChoice>
    </div>
</template>

<style scoped>
.question-type__choice-label {
    padding-top: 5px;
    align-items: center;
}

.question-type__choice {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px 6px;
}

.question-type__type-name {
    text-transform: uppercase;
    font-weight: 500;
}

.question-type__choice-input {
    display: none;
    visibility: hidden;
    pointer-events: none;
}

.question-type__choice-content {
    width: 100%;
    padding: 6px;
}
</style>
