<script setup lang="ts">
interface ModalProps {
    isShowModal?: boolean;
    action: 'complete' | 'check';
}

const props = defineProps<ModalProps>();

const pollId = ref<string>('');

const modalTitle = computed(() => {
    return props.action === 'complete' ? "Poll Link" : "Check Link"
})
const modalText = computed(() => {
    return props.action === 'complete' ? "Enter the ID of the poll you want to complete" : "Enter the ID of the poll you want to view the results of"
})

const isIdWritten = computed(() => !pollId.value.trim());

const buttonHandler = () => {
    switch (props.action) {
        case 'check':
            alert(`Check id: ${pollId.value}`);
            break;
        case 'complete':
            alert(`Complete id: ${pollId.value}`);
            break;
    }
}
</script>

<template>
    <ModalsModalOverlay :modal-title="modalTitle" :is-show-modal="props.isShowModal">
        <div class="modal-goto__wrapper">
            <p class="modal-goto__text">{{ modalText }}</p>
            <div class="modal__input-wrapper">
                <UiMyInput v-model="pollId" custom-class="modal__input" type="text" placeholder="Write here the ID..." />
                <button @click="buttonHandler" class="modal__btn-go" :disabled="isIdWritten">Go</button>
            </div>
        </div>
    </ModalsModalOverlay>
</template>

<style scoped>
.modal-goto__wrapper{
    padding: 10px;
}

.modal-goto__text {
    font-size: 18px;

}

.modal__input-wrapper{
    margin-top: 10px;
    width: 100%;

    display: flex;
    align-items: center;
}

.modal__input {
    flex-grow: 1;
    background-color: var(--modal-input-bg-dark);

    transition: all 0.3s ease-out;
}

.modal__btn-go {
    padding: 6px;
    margin-left: 6px;

    font-weight: 600;
    font-size: 18px;

    border-radius: 50%;
    background-color: var(--modal-button-bg-secondary);
    color: var(--modal-button-text);

    transition: all 0.3s ease;
}

.modal__btn-go[disabled] {
    padding: 0px;
    margin-left: 0;
    font-size: 0;

    transform: scale(0);
    pointer-events: none;
}
</style>
