<script setup lang="ts">
import {ROUTES} from '~/config/routes';
</script>

<template>
    <header class="header">
        <div class="header__inner">
            <NuxtLink :to="ROUTES.main" class="logo header__logo">
                <IconsSvgIcon name="logo" class="header__logo-icon" />
                <p class="header__logo-text">Polla</p>
            </NuxtLink>
            <div class="header__controls">
                <SharedThemeToggle />
                <NuxtLink :to="ROUTES.gitRepo" class="header__git-link">
                    <IconsSvgIcon name="git" class="header__git-icon"/>
                </NuxtLink>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    padding: 0 200px;
    padding-top: 40px;
}

.header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header__logo {
    cursor: pointer;
    display: flex;
    column-gap: 8px;
}

.header__logo-icon {
    width: 54px;
    height: 54px;
    fill: var(--logo-fill-color);
}

.header__git-icon {
    height: 50px;
    width: 50px;
    fill: var(--text-secondary);
}

.header__logo-text {
    font-weight: 600;
    font-size: 45px;
    color: var(--text-primary);
}

.header__controls {
    display: flex;
    align-items: center;
    column-gap: 20px;
}

.header__git-link {
    cursor: pointer;
}
</style>