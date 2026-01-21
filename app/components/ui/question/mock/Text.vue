<script setup lang="ts">
interface Props {
    options?: any;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="question-text">
        <textarea class="question-text__textarea" name="Mock name" placeholder="Placeholder"></textarea>
    </div>
</template>

<style scoped>
.question-text__textarea {
    padding: 4px 6px;
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