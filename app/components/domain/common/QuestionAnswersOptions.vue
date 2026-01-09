<script setup lang="ts">
import { UPLOADED_IMAGE_FILES_FORMATS } from '~/config/uploaded-files';

interface Props {
    type?: QuestionTypes;
    modelValue?: any; // условно либо undefined, либо string[]
}
interface Emits {
    (e: 'update:modelValue', value: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const changeSomeOption = (value: any, index: number) => {
    const newValue = [...props.modelValue];
    newValue[index] = value;
    emit('update:modelValue', newValue);
};

const addOptionHandler = () => {
    emit('update:modelValue', [...props.modelValue, '']);
};

const deleteSomeOption = (index: number) => {
    const newValue = [...props.modelValue].filter((_, i) => i !== index);
    emit('update:modelValue', newValue);
}
</script>

<template>
    <div class="answer-options__wrapper">
        <div v-if="!type" class="answer-option">
            Something went wrong... Please, back to the previous step and choose
            one of the question type.
        </div>

        <div v-else-if="type === 'TEXT'" class="answer-option">
            No additional settings are required for the "Text answer" type of
            question.
        </div>

        <div
            v-else-if="type === 'SINGLE_CHOICE' || type === 'MULTIPLE_CHOICE'"
            class="answer-option"
        >
            <p class="answer-option__spec">Answer options:</p>
            <div
                v-for="(option, index) in props.modelValue as string[]"
                class="answer-option__input-wrapper"
            >
                <UiMyInput
                    :model-value="option"
                    @update:model-value="(value) => changeSomeOption(value, index)"
                    class="answer-option__input"
                    type="text"
                    placeholder="Answer option"
                />
                <button class="answer-option__delete-btn" type="button" @click="() => deleteSomeOption(index)">
                    <IconsSvgIcon
                        class="answer-option__delete-btn-icon"
                        name="trash"
                    />
                </button>
            </div>
            <UiMyButton
                class="answer-option__add-btn"
                icon="plus"
                icon-with-round
                @click="addOptionHandler"
                >Add a answer option</UiMyButton
            >
        </div>

        <div v-else-if="type === 'IMAGE_CHOICE'" class="answer-option">
            <p class="answer-option__spec">Uploading Images</p>
            <div class="answer-option__dropbox">
                <IconsSvgIcon
                    class="answer-option__dropbox-icon"
                    name="cloud-upload"
                />
                <p class="answer-option__dropbox-hint">
                    Drag and drop the images here or
                </p>
                <UiMyButton
                    class="answer-option__dropbox-btn"
                    btn-type="bordered"
                    icon="folder"
                >
                    Choose files
                </UiMyButton>
                <p class="answer-option__dropbox-allow-options">
                    Maximum file size: 5 MB. File formats:
                    {{ UPLOADED_IMAGE_FILES_FORMATS.join(', ') }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.answer-option__spec {
    font-weight: 500;
    color: var(--text-primary);

    margin-bottom: 8px;
}

.answer-option__input-wrapper {
    width: 100%;
    display: flex;
    gap: 5px;
}

.answer-option__input-wrapper + .answer-option__input-wrapper {
    margin-top: 6px;
}

.answer-option__input {
    width: 70%;
    background-color: var(--modal-input-bg-dark);
}

.answer-option__delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;

    background-color: var(--modal-button-bg);
    border-radius: 50%;
}

.answer-option__delete-btn-icon {
    width: 20px;
    height: 20px;
    stroke: var(--icon-fill-secondary);
    stroke-width: 8px;
    fill: transparent;
}

.answer-option__add-btn {
    margin-top: 15px;
}

.answer-option__dropbox {
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    border-radius: 4px;
    border: 2px dashed var(--primary);
}

.answer-option__dropbox-icon {
    width: 50px;
    height: 50px;
    stroke: var(--icon-fill-primary);
    fill: transparent;
    stroke-width: 8px;
}

.answer-option__dropbox-hint {
}

.answer-option__dropbox-btn {
}

.answer-option__dropbox-allow-options {
}
</style>
