<script lang="ts" setup>
interface Props {
    modelValue?: string | number;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    placeholder?: string;
    disabled?: boolean;
    customClass?: string;
    name?: string;
    id?: string;
}

interface Emits {
    (e: 'update:modelValue', value: string | number): void;
    (e: 'blur'): void;
    (e: 'keydown', payload: KeyboardEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    disabled: false,
});
const emit = defineEmits<Emits>();

const onInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};

const onBlur = (): void => {
    emit('blur');
};

const onKeydown = (event: KeyboardEvent): void => {
    emit('keydown', event);
}
</script>

<template>
    <input
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        @keydown="onKeydown"
        :type="type"
        class="input"
        :class="customClass"
        :placeholder="placeholder"
        :name="name"
        :id="id"
    />
</template>

<style scoped>
.input {
    padding: 8px 10px;

    font-weight: 400;
    font-size: 16px;
    color: var(--text-primary);

    border-radius: 10px;
    background: var(--surface);

    transition: box-shadow 0.15s ease-in-out;
}

.input::placeholder {
    color: var(--text-secondary);
}

.input:focus {
    box-shadow: var(--input-focus-shadow);
}
</style>
