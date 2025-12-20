<script setup lang="ts">
interface Props {
    isLightTheme: boolean;
}
interface Emits {
    (e: 'click'): void;
}

const isMounted = ref<boolean>(false);
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const handleClick = () => {
    emits('click');
};

onMounted(() => {
    isMounted.value = true;
});
</script>

<template>
    <button
        type="button"
        class="themeToggle"
        @click="handleClick"
        :class="{ light: isMounted && props.isLightTheme }"
    >
        <IconsSvgIcon name="sunTheme" class="icon-sun" />
        <IconsSvgIcon name="moonTheme" class="icon-moon" />
    </button>
</template>

<style scoped>
.themeToggle {
    position: relative;
    max-width: 70px;
    padding: 7px;
    display: flex;
    align-items: center;
    column-gap: 6px;

    border-radius: 25px;
    background-color: var(--toggle-theme-bgc);
}

.themeToggle::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;

    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: var(--toggle-theme-circle);

    transition: all 0.2s ease-out;
}

.themeToggle.light::before {
    left: calc(100% - 6px - 28px);
}

.icon-sun,
.icon-moon {
    width: 25px;
    height: 25px;
}

.icon-sun {
    fill: var(--toggle-theme-sun-fill);
}

.icon-moon {
    fill: var(--toggle-theme-moon-fill);
}
</style>
