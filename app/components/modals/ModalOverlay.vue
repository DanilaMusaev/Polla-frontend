<script setup lang="ts">
import SvgIcon from '../icons/SvgIcon.vue';

interface Props {
    isShowModal?: boolean;
    modalTitle: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);

const modalClose = () => {
    emit('close');
}
</script>

<template>
    <div class="modal__overlay" :class="{hide: !props.isShowModal}" @click="modalClose">
        <div class="modal__content" @click.stop>
            <h3 class="modal__title">{{ props.modalTitle }}</h3>
            <button @click="modalClose" type="button" class="modal-close__btn">
                <SvgIcon name="close" class="modal-close-icon" />
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.modal__overlay.hide {
    display: none;
}

.modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 333;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--modal-overlay-bg);
}

.modal__content {
    position: relative;
    padding: 10px 15px 30px;
    border-radius: 6%;
    background-color: var(--modal-content-bg);
}

.modal__title {
    padding: 6px 40px;
    margin: 0px auto 10px auto;
    width: fit-content;

    font-weight: 400;
    font-size: 20px;
    text-transform: uppercase;
    color: var(--text-primary);

    border-radius: 30px;
    background-color: var(--modal-title-bg);
}

.modal-close__btn {
    position: absolute;
    right: 10px;
    top: 20px;
}

.modal-close-icon {
    width: 20px;
    height: 20px;
    fill: var(--modal-close-icon);
}
</style>