<script setup lang="ts">
import { useGoToModal } from '~/composables/useGoToModal';

const { isOpen, action: gotoAction, openModal, closeModal } = useGoToModal();

const HOME_SELECTORS: HomeSelectorsProps[] = [
    {
        icon: 'compass',
        iconFill: 'primary',
        title: 'Complete the poll',
        text: 'If you have a poll identificator, you can complete it.',
        handler: () => openModal('complete'),
    },
    {
        icon: 'statistics',
        iconFill: 'secondary',
        title: 'Check the poll results',
        text: 'If you have a verification identificator for the poll results, you can check which answers the users gave.',
        handler: () => openModal('check'),
    },
    {
        icon: 'feather',
        iconFill: 'primary',
        title: 'Create a new poll',
        text: 'Create a new poll that you can share with other people to complete it!',
        handler: () => alert('In development'),
    },
];
</script>

<template>
    <div class="home">
        <DomainHomeSelectorsGrid :selectors-list="HOME_SELECTORS" />
    </div>
    <ModalsGoToModal
        v-if="gotoAction"
        :is-show-modal="isOpen"
        :action="gotoAction"
        @close="closeModal"
    />
</template>

<style scoped>
.home {
    padding: 15px;

    flex-grow: 1;
    display: flex;
    align-items: center;
}
</style>
