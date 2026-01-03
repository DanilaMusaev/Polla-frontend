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
    <div class="question-image-choice">
        <UiQuestionBaseBorderChoice
            v-for="choice, index in mockChoices"
            :key="`${index}__${choice}`"
            :is-selected="modelValue === choice"
            class="choice-label"
            flex
        >
            <input
                type="radio"
                name="mock-image_choice"
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
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
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
