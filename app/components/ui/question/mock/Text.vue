<script setup lang="ts">
interface Props {
    options?: any;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="question-text">
        <UiMyTextarea class="question-text__textarea" placeholder="Write here your answer" :max-height="150" />
    </div>
</template>

<style scoped>
.question-text__textarea {
    padding: 8px 8px;
    height: 28px;
    width: 100%;

    font-weight: 400;
    font-size: 14px;
    color: var(--text-primary);

    border-radius: 8px;

    background: var(--background);

    resize: none;
    overflow: hidden;
}

.question-text__textarea::placeholder {
    color: var(--text-secondary);
}
</style>