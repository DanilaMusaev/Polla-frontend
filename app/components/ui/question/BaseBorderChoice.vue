<script setup lang="ts">
interface Props {
    isSelected: boolean;
    flex?: boolean;
    column?: boolean;
    center?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <label
        class="question-elem__border"
        :class="{
            selected: props.isSelected,
            flex: props.flex,
            column: props.column,
            center: props.center
        }"
    >
        <span class="question-elem__check-mark">
            <IconsSvgIcon name="check-mark" class="question-icon__check-mark" />
        </span>
        <slot></slot>
    </label>
</template>

<style scoped>
.question-elem__border {
    position: relative;
    border: 1px solid var(--primary);
    border-radius: 8px;

    transition: border-color 0.2s ease;
}

.question-elem__border.flex {
    display: flex;
}
.question-elem__border.column {
    flex-direction: column;
}
.question-elem__border.center {
    justify-content: center;
}

.question-elem__border.selected {
    border: 1px solid var(--secondary);
}

.question-elem__check-mark {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -5px;
    right: -5px;

    width: 15px;
    height: 15px;

    background-color: var(--secondary);
    border-radius: 50%;

    opacity: 0;
    transform: scale(0);
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.question-elem__border.selected .question-elem__check-mark {
    opacity: 1;
    transform: scale(1);
}

.question-icon__check-mark {
    width: 9px;
    height: 9px;
    fill: var(--text-primary);
}
</style>
