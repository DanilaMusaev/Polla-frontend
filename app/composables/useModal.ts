export const useModal = () => {
    const isOpen = ref(false);

    const open = () => {
        isOpen.value = true;
        document.body.classList.add('no-scroll');
    };

    const close = () => {
        isOpen.value = false;
        document.body.classList.remove('no-scroll');
    };

    const toggle = () => {
        isOpen.value ? close() : open();
    };

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};
