<script setup lang="ts">
const modelValue = ref();

const mockChoices = [
    'Answer 1',
    'Answer 2',
    'Answer 3',
    'Answer 4'
]

const handleChange = (value: string | number) => {
    modelValue.value = value;
};
</script>

<template>
    <div class="question-single-choice">
        <UiQuestionBaseBorderChoice
            v-for="choice, index in mockChoices"
            :key="`${index}__${choice}`"
            :is-selected="modelValue === choice"
            class="choice-label"
            flex
            center
        >
            <input
                type="radio"
                name="mock-single_choice"
                :value="choice"
                :checked="modelValue === choice"
                @change="handleChange(choice)"
                class="choice-input"
            />
            <div class="choice-content">
                <span class="choice-label-text">{{ choice }}</span>
            </div>
        </UiQuestionBaseBorderChoice>
    </div>
</template>

<style scoped>
.question-single-choice{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px 6px;
}

.choice-input {
    display: none;
    visibility: hidden;
    pointer-events: none;
}

.choice-content {
    padding: 4px 10px;
    font-size: 14px;
    width: 100%;
}
</style>
