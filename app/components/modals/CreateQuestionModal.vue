<script setup lang="ts">
interface Props {
    isShowModal?: boolean;
}
interface Emits {
    (e: 'close'): void;
    (e: 'create', question: Omit<Question, 'order'>): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Отслеживание текущего шага в создании вопроса
const TOTAL_STEPS = 3;
const currentStep = ref<1 | 2 | 3>(1);

const questionInfo = reactive<Partial<Question>>({});

const stepValidations = {
    1: computed(() => !!questionInfo.text?.trim()),
    2: computed(() => questionInfo.type !== undefined),
    3: computed(() => {
        if (questionInfo.type !== 'TEXT') {
            return questionInfo.options?.length >= 2;
        }
        return true;
    }),
};

const stepTitle = {
    1: 'Write a question:',
    2: 'Choose question type:',
    3: 'Configure answers:',
};

const nextStep = () => {
    if (
        currentStep.value < TOTAL_STEPS &&
        stepValidations[currentStep.value].value
    ) {
        currentStep.value++;
    } else if (currentStep.value === TOTAL_STEPS && stepValidations[3].value) {
        createQuestion();
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const createQuestion = () => {
    try {
        emit('create', prepareQuestionForCreation(questionInfo));
    } catch (err) {
        alert(`How?!!, error: ${err}`); // Need add notification component to show error/other notifications
    }
    modalClose();
};

const modalClose = () => {
    emit('close');
};

const handleChangeQuestionProperty = (
    value: any,
    property: keyof typeof questionInfo
) => {
    questionInfo[property] = value;
};

const isPrevDisabled = computed(() => currentStep.value === 1);
const isNextDisabled = computed(
    () => !stepValidations[currentStep.value].value
);

watch(
    () => questionInfo.type,
    (newType) => {
        if (newType === 'TEXT') {
            questionInfo.options = undefined;
        } else if (
            (newType === 'SINGLE_CHOICE' || newType === 'MULTIPLE_CHOICE') &&
            (!questionInfo.options || questionInfo.options.length === 0)
        ) {
            questionInfo.options = ['', ''];
        }
    }
);
</script>

<template>
    <ModalsModalOverlay
        @close="modalClose"
        :is-show-modal="props.isShowModal"
        modal-title="Create question"
    >
        <div class="modal-create-question__slides-container">
            <Transition name="slide">
                <div
                    v-if="currentStep === 1"
                    class="modal-create-question__slide"
                >
                    <h3 class="modal-create-question__curr-action">
                        {{ stepTitle[1] }}
                    </h3>
                    <div class="modal-create-question__content">
                        <UiMyInput
                            v-model="questionInfo.text"
                            custom-class="modal-create-question__input-que-text"
                            type="text"
                            placeholder="Write a question here"
                        />
                    </div>
                </div>
            </Transition>

            <Transition name="slide">
                <div
                    v-if="currentStep === 2"
                    class="modal-create-question__slide"
                >
                    <h3 class="modal-create-question__curr-action">
                        {{ stepTitle[2] }}
                    </h3>
                    <div class="modal-create-question__content">
                        <DomainCommonQuestionTypesChoice
                            :model-value="questionInfo.type"
                            @update:model-value="
                                (value) =>
                                    handleChangeQuestionProperty(value, 'type')
                            "
                        />
                    </div>
                </div>
            </Transition>

            <Transition name="slide">
                <div
                    v-if="currentStep === 3"
                    class="modal-create-question__slide"
                >
                    <h3 class="modal-create-question__curr-action">
                        {{ stepTitle[3] }}
                    </h3>
                    <div class="modal-create-question__content">
                        <DomainCommonQuestionAnswersOptions
                            :type="questionInfo.type"
                            :model-value="questionInfo.options"
                            @update:model-value="
                                (value) =>
                                    handleChangeQuestionProperty(
                                        value,
                                        'options'
                                    )
                            "
                        />
                    </div>
                </div>
            </Transition>
        </div>
        <div class="modal-create-question__controls">
            <button
                @click="prevStep"
                :disabled="isPrevDisabled"
                class="modal-create-question__control-btn"
                type="button"
            >
                <IconsSvgIcon
                    name="back"
                    class="modal-create-question__control-icon icon-back"
                />
            </button>
            <button
                v-if="currentStep < 3"
                @click="nextStep"
                :disabled="isNextDisabled"
                class="modal-create-question__control-btn"
                type="button"
            >
                <IconsSvgIcon
                    name="back"
                    class="modal-create-question__control-icon icon-forward"
                />
            </button>
            <UiMyButton
                v-else-if="currentStep === 3"
                @click="nextStep"
                class="modal-create-question__control-btn"
                :disabled="isNextDisabled"
                btn-type="solid"
                icon="check-mark"
                icon-color="var(--background)"
                >Create</UiMyButton
            >
        </div>
    </ModalsModalOverlay>
</template>

<style scoped>
.modal-create-question__slides-container {
    min-width: 550px;
    min-height: 500px;
    position: relative;
    overflow: hidden;
}

.modal-create-question__slide {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
}

.slide-enter-active {
    animation: slideInRight 0.3s;
}

.slide-leave-active {
    animation: slideOutLeft 0.3s;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutLeft {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(-30px);
    }
}

.modal-create-question__curr-action {
    margin-bottom: 15px;

    font-weight: 500;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--text-primary);
}

.modal-create-question__input-que-text {
    width: 100%;
    background-color: var(--modal-input-bg-dark);

    transition: all 0.3s ease-out;
}

.modal-create-question__content {
    padding: 5px;
}

.modal-create-question__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-create-question__control-btn {
    transition: opacity 0.2s ease-out;
}

.modal-create-question__control-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.modal-create-question__control-icon {
    width: 25px;
    height: 25px;
    fill: var(--icon-fill-secondary);
}

.icon-forward {
    transform: rotateY(180deg);
}
</style>
