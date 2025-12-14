<template>
    <ClientOnly>
        <UiStarsBackground class-name="stars__background" />
    </ClientOnly>
    <div class="page__wrapper">
        <div class="page__content">
            <slot></slot>
        </div>
    </div>
</template>


<style scoped>
.page__wrapper {
    min-height: 100vh;

    position: relative;
    background-color: var(--background);

    z-index: -1;
}

.page__content {
    min-height: 100vh;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    z-index: 1;
}

.stars__background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;

    pointer-events: none;
}
</style>