<script lang="ts" setup>
interface Props {
    modelValue?: string | number;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    placeholder?: string;
    disabled?: boolean;
    customClass?: string;
}

interface Emits {
    (e: 'update:modelValue', value: string | number): void;
    (e: 'blur'): void;
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
</script>

<template>
    <input
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        :type="type"
        class="input"
        :class="props.customClass"
        :placeholder="placeholder"
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
}

.input::placeholder {
    color: var(--text-secondary);
}
</style>
