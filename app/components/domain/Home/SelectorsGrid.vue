<script setup lang="ts">
interface Props {
    selectorsList: HomeSelectorsProps[];
}

const props = defineProps<Props>();
</script>

<template>
    <div class="selectors__grid">
        <DomainHomeServiceSelector
            v-for="(selector, index) in props.selectorsList"
            :key="`${selector.title}_${index}`"
            :icon="selector.icon"
            :icon-fill="selector.iconFill"
            :title="selector.title"
            :text="selector.text"
            :handler="selector.handler"
        />
    </div>
</template>

<style scoped>
.selectors__grid {
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
    gap: 30px;
}
</style>
