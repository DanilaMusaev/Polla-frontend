<script setup lang="ts">
const answers = reactive({
    single: ''
})

const onQuestionChange = (value: any) => {
    console.log('WORKING, new value:', value);
    answers.single = value;
}
</script>

<template>
    <div class="preview">
        <h3 class="preview__title block-title">Preview</h3>
        <div class="preview__name-desc-wrapper">
            <p class="preview__name">Poll name</p>
            <p class="preview__desc">Some description about this poll...</p>
        </div>
        <div class="preview__questions-list">
            <DomainCommonQuestion :question="{id: '1314sdaf234', type: 'TEXT', text: 'What is your favorite color?', order: 1}" />
            <DomainCommonQuestion :question="{id: '124141', type: 'SINGLE_CHOICE', text: 'What is your favorite color?', order: 2, options: ['green', 'yellow', 'red', 'blue']}" :model-value="answers.single" @update:model-value="onQuestionChange" />
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