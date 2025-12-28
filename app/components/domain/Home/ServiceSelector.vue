<script setup lang="ts">
import { type HomeSelectorsProps } from '~/shared/types/HomeSelectors';

const props = defineProps<HomeSelectorsProps>();

const iconFillStyle = computed(() => {
    if (props.iconFill) {
        return props.iconFill === 'primary'
            ? 'var(--icon-fill-primary)'
            : 'var(--icon-fill-secondary)';
    } else {
        return 'var(--icon-fill-primary)';
    }
});
</script>

<template>
    <div class="selector-card" @click="props.handler">
        <IconsSvgIcon
            :name="icon"
            class="selector-card__icon"
            :style="{
                stroke: iconFillStyle,
            }"
        />
        <h3 class="selector-card__title">{{ props.title }}</h3>
        <p class="selector-card__text">{{ props.text }}</p>
    </div>
</template>

<style scoped>
.selector-card {
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    text-align: center;

    border-radius: 8%;
    background-color: var(--selector-card-bg);
    box-shadow: var(--selector-card-shadow);

    transition: all 0.1s ease-out;
}

.selector-card:hover {
    background-color: transparent;
    box-shadow: var(--selector-card-shadow-hover);
    outline: 2px solid var(--selector-card-outline-hover);

    cursor: pointer;
}

.selector-card__icon {
    width: 60px;
    height: 60px;

    stroke-width: 2px;
    fill: transparent;
}

.selector-card__title {
    font-weight: 600;
    font-size: 30px;
    color: var(--text-primary);
}

.selector-card__text {
    font-weight: 600;
    font-size: 16px;
    color: var(--text-secondary);
}
</style>
