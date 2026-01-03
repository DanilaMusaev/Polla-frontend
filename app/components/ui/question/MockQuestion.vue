<script setup lang="ts">
import ImageChoice from './mock/ImageChoice.vue';
import MultipleChoice from './mock/MultipleChoice.vue';
import SingleChoice from './mock/SingleChoice.vue';
import Text from './mock/Text.vue';

interface Props {
    type: QuestionTypes;
}

const props = defineProps<Props>();

const componentMap = {
    TEXT: Text,
    SINGLE_CHOICE: SingleChoice,
    MULTIPLE_CHOICE: MultipleChoice,
    IMAGE_CHOICE: ImageChoice,
    RATING: Text,
} as const;
</script>

<template>
    <div class="mock-question">
        <div class="question__header">
            <h4 class="mock-question__text">Question?</h4>
        </div>
        <div class="question__content">
            <component
                :is="componentMap[type]"
            />
        </div>
    </div>
</template>

<style scoped>
.mock-question {
    padding: 10px;

    border-radius: 8px;
    background-color: var(--surface);
}

.mock-question__text {
    margin-bottom: 15px;

    font-weight: 600;
    font-size: 16px;
    color: var(--text-primary);
}
</style>
