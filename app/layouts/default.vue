<template>
    <IconsSvgSprite />
    <div class="page__wrapper">
        <div class="page__content">
            <LayoutHeader />
            <div class="page__slot-content">
                <slot></slot>
            </div>
            <LayoutFooter />
        </div>
    </div>
    <ClientOnly>
        <UiStarsBackground class-name="stars__background" />
    </ClientOnly>
</template>


<style scoped>
.page__wrapper {
    min-height: 100vh;

    position: relative;
    z-index: 0;
}

.page__content {
    min-height: 100vh;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    z-index: 1;
}

.page__slot-content {
    flex-grow: 1;
    
    display: flex;
    flex-direction: column;
}

.stars__background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    pointer-events: none;
}
</style>