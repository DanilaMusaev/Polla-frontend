interface ModalState {
    isOpen: boolean;
    action: 'complete' | 'check' | null;
}

export const useGoToModal = () => {
    const modalState = reactive<ModalState>({
        isOpen: false,
        action: null,
    });

    const openModal = (action: 'complete' | 'check') => {
        modalState.action = action;
        modalState.isOpen = true;
    };

    const closeModal = () => {
        modalState.isOpen = false;

        setTimeout(() => {
            modalState.action = null;
        }, 300);
    };

    return {
        ...toRefs(modalState),
        openModal,
        closeModal,
    };
};
