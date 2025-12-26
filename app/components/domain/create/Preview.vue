<script setup lang="ts">

</script>

<template>
    <div class="preview">
        <h3 class="preview__title block-title">Preview</h3>
        <div class="preview__name-desc-wrapper">
            <p class="preview__name">Poll name</p>
            <p class="preview__desc">Some description about this poll...</p>
        </div>
    </div>
</template>


<style scoped>
.preview {
    padding: 10px 20px;
    
    border-radius: 10px;
    background-color: var(--surface);
}

.preview__title {
    margin-bottom: 10px;
}

.preview__name-desc-wrapper {
    padding: 10px;

    border-radius: 8px;
    fill: var(--surface);
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
</style>