<script setup lang="ts">
useHead({
    title: 'Polla - Create poll',
    meta: [
        {
            name: 'description',
            content: 'A page for creating and instantly viewing a preview of the poll(survey)'
        }
    ]
})
</script>

<template>
    <div class="create-poll main-content">
        <LayoutContainer>
            <h2 class="title-1 create-poll__title">Creating a poll</h2>
            <main class="create-poll__main-frames">
                <DomainCreateConstructor />
                <DomainCreatePreview />
            </main>
        </LayoutContainer>
    </div>
</template>

<style scoped>
.create-poll__main-frames {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 40px;
}

.create-poll__title {
    text-align: left;
    margin-bottom: 10px;
}
</style>
