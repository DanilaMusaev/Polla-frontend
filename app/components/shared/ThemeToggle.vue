<script setup lang="ts"></script>

<template>
    <button type="button" class="themeToggle__wrapper">
        <IconsSvgIcon name="sunTheme" class="icon-sun" />
        <IconsSvgIcon name="moonTheme" class="icon-moon" />
    </button>
</template>

<style scoped>
.themeToggle__wrapper {
    position: relative;
    max-width: 100px;
    padding: 8px;
    display: flex;
    align-items: center;
    column-gap: 14px;

    border-radius: 25px;
    background-color: var(--toggle-theme-bgc);
}

.themeToggle__wrapper::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--toggle-theme-circle);
    
    transition: all 0.2s ease-out;
}

.icon-sun,
.icon-moon {
    width: 35px;
    height: 35px;
}

.icon-sun {
    fill: var(--toggle-theme-sun-fill);
}

.icon-moon {
    fill: var(--toggle-theme-moon-fill);
}
</style>
