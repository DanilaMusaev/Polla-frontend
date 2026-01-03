<script setup lang="ts">
const modelValue = ref();

const mockChoices = [
    'Answer 1',
    'Answer 2',
    'Answer 3',
    'Answer 4'
]

const currentValue = computed(() => {
    return Array.isArray(modelValue.value) ? modelValue.value : [];
});

const handleChange = (value: string | number, checked: boolean) => {
    let newValue: (string | number)[];

    if (checked) {
        newValue = [...currentValue.value, value];
    } else {
        newValue = currentValue.value.filter(v => v !== value);
    }

    modelValue.value = newValue;
};
</script>

<template>
    <div class="question-multiple-choice">
        <UiQuestionBaseBorderChoice
            v-for="(choice, index) in mockChoices"
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
