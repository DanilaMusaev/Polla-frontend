<script setup lang="ts">
interface Props {
    order: number;
    text: string;
    type: QuestionTypes;
}

const props = defineProps<Props>();

const questionType = computed(() => {
    const mapper: Record<QuestionTypes, string> = {
        TEXT: 'Text Input',
        IMAGE_CHOICE: 'Image Choice',
        MULTIPLE_CHOICE: 'Multiple Choice',
        SINGLE_CHOICE: 'Single Choice',
        RATING: 'Rating',
    };

    return mapper[props.type];
});
</script>

<template>
    <li class="question-item">
        <span class="question-item__order" aria-label="Question order">{{
            props.order
        }}</span>
        <span class="question-item__text">{{ props.text }}</span>
        <p class="question-item__type">{{ questionType }}</p>
        <button
            class="question-item__delete-btn"
            type="button"
            aria-label="Delete question: What is your favorite color?"
            title="Delete this question"
        >
            <IconsSvgIcon name="trash" class="question-item__icon-delete" />
        </button>
    </li>
</template>

<style scoped>
.question-item {
    padding: 6px 10px;

    display: flex;
    align-items: center;

    border-radius: 5px;
    background-color: var(--question-item-bg);
}

.question-item__order {
    margin-right: 6px;
    padding: 0px 8px;

    line-height: 25px;
    font-size: 14px;
    color: var(--question-item-order-text);

    border-radius: 50%;
    background-color: var(--question-item-order-bg);
}

.question-item__text {
    font-weight: 600;
    font-size: 14px;
    color: var(--text-primary);
}

.question-item__type {
    position: relative;
    margin-left: auto;
    margin-right: 14px;

    font-weight: 600;
    font-size: 16px;
    color: var(--text-primary);
}

.question-item__type::after {
    position: absolute;
    content: "";

    right: -8px;

    height: 100%;
    width: 2px;

    background-color: currentColor;
}

.question-item__icon-delete {
    width: 17px;
    height: 17px;
    stroke: var(--question-item-delete-icon);
    fill: transparent;
    stroke-width: 8px;
}
</style>
