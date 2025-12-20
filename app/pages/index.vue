<script setup lang="ts">
const selectorsArray: HomeSelectorsProps[] = [
    {
        icon: 'compass',
        iconFill: 'primary',
        title: 'Complete the poll',
        text: 'If you have a poll identificator, you can complete it.',
        handler: () => console.log('Roflu'),
    },
    {
        icon: 'statistics',
        iconFill: 'secondary',
        title: 'Check the poll results',
        text: 'If you have a verification identificator for the poll results, you can check which answers the users gave.',
        handler: () => console.log('Roflu 2'),
    },
    {
        icon: 'feather',
        iconFill: 'primary',
        title: 'Create a new poll',
        text: 'Create a new poll that you can share with other people to complete it!',
        handler: () => console.log('Roflu 3'),
    },
];
</script>

<template>
    <div class="home">
        <div class="home__selectors">
            <DomainServiceSelector
                v-for="selector in selectorsArray"
                :icon="selector.icon"
                :icon-fill="selector.iconFill"
                :title="selector.title"
                :text="selector.text"
                :handler="selector.handler"
            />
        </div>
    </div>
</template>

<style scoped>
.home {
    padding: 15px;
    
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.home__selectors {
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
    gap: 30px;

} 
</style>
