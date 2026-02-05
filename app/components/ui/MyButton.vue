<script setup lang="ts">
interface Props {
    btnType?: 'solid' | 'bordered';
    icon?: string;
    iconColor?: string;
    iconPosition?: 'start' | 'end';
    iconWithRound?: boolean;
}

interface Emits {
    (e: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), {
    btnType: 'solid',
    iconPosition: 'start',
    iconWithRound: false,
});

const emit = defineEmits<Emits>();

const handleClick = () => {
    emit('click');
}
</script>

<template>
    <button
        @click="handleClick"
        class="button"
        :class="{
            solid: btnType === 'solid',
            bordered: btnType === 'bordered',
        }"
        type="button"
    >
        <span v-if="icon && iconPosition === 'start'" class="button-icon__wrapper" :class="{ rounded: iconWithRound }">
            <IconsSvgIcon
                :name="icon"
                :style="{color: props.iconColor}"
                class="button-icon"
            />
        </span>
        <slot></slot>
        <span v-if="icon && iconPosition === 'end'" class="button-icon__wrapper" :class="{ rounded: iconWithRound }">
            <IconsSvgIcon
                :name="icon"
                class="button-icon"
            />
        </span>
    </button>
</template>

<style scoped>
.button {
    display: flex;
    align-items: center;

    padding: 6px 15px;
    border-radius: 5px;

    font-weight: 600;
    font-size: 16px;

    transition: all 0.2s ease;
}

.button.solid {
    color: var(--surface);
    background: var(--secondary);
}

.button.bordered {
    color: var(--primary);
    border: 1px solid var(--primary);
}

.button-icon {
    position: relative;
    width: 15px;
    height: 15px;
    stroke-width: 3px;

    margin-right: 6px;

    transition: all 0.2s ease;
}

.button.solid .button-icon {
    color: var(--secondary);
    stroke: currentColor;
}

.button.bordered .button-icon {
    color: var(--primary);
    fill: currentColor;
    stroke: none;
}

.button-icon__wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.button-icon__wrapper.rounded {
    position: relative;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: var(--surface);
    margin-right: 6px;
}

.button-icon__wrapper.rounded .button-icon {
    margin-right: 0;
    width: 15px;
    height: 15px;
}

.button.solid:not(:disabled):hover {
    opacity: 0.8;
}

.button.bordered:not(:disabled):hover {
    color: var(--background);
    background-color: var(--primary);
}

.button.bordered:not(:disabled):hover .button-icon {
    fill: var(--background);
}

.button:not(:disabled):active {
    transform: scale(0.98);
}
</style>
