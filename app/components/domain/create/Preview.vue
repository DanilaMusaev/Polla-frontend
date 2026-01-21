<script setup lang="ts">
const { poll } = usePollState();
</script>

<template>
    <div class="preview">
        <h3 class="preview__title block-title">Preview</h3>
        <div class="preview__name-desc-wrapper">
            <p class="preview__name">{{ poll.title }}</p>
            <p v-if="poll.description" class="preview__desc">{{ poll.description }}</p>
        </div>
        <div class="preview__questions-list">
            <UiQuestionMockQuestion
                v-for="question in poll.questions"
                :text="question.text"
                :type="question.type"
                :options="question.options"
            />
        </div>
    </div>
</template>

<style scoped>
.preview {
    flex-grow: 3;
    padding: 10px 20px;

    border-radius: 10px;
    background-color: var(--surface-alf-50);
}

.preview__title {
    margin-bottom: 10px;
}

.preview__name-desc-wrapper {
    margin-bottom: 15px;
    padding: 10px;

    border-radius: 8px;
    background-color: var(--surface);
}

.preview__name {
    font-weight: 700;
    font-size: 18px;
    color: var(--text-primary);
}

.preview__desc {
    font-weight: 400;
    font-size: 16px;
    color: var(--text-secondary);
}

.preview__questions-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>
