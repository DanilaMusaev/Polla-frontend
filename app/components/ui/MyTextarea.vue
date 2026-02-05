<script setup lang="ts">
interface Props {
    modelValue?: string;
    placeholder?: string;
    id?: string;
    minHeight?: number;
    maxHeight?: number;
}

interface Emits {
    (e: 'update:modelValue', value: string | number): void;
    (e: 'blur'): void;
}

const props = withDefaults(defineProps<Props>(), {
    minHeight: 38,
    maxHeight: 300,
});
const emit = defineEmits<Emits>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

    
const textareaStyles = computed(() => ({
    minHeight: `${props.minHeight}px`,
    maxHeight: `${props.maxHeight}px`,
}));

const resizeTextarea = () => {
    if (!textareaRef.value) return;
    
    // Сброс высоты до минимальной
    textareaRef.value.style.height = `${props.minHeight}px`;
    
    // Расчет новой высоты на основе scrollHeight
    const scrollHeight = textareaRef.value.scrollHeight;
    const newHeight = Math.min(scrollHeight, props.maxHeight);
    
    textareaRef.value.style.height = `${newHeight}px`;
};

const onInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement;
    emit('update:modelValue', target.value);
    resizeTextarea();
};

const onBlur = (): void => {
    emit('blur');
};

watch(() => props.modelValue, resizeTextarea);

onMounted(() => {
    resizeTextarea();

    window.addEventListener('resize', resizeTextarea);
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeTextarea);
});
</script>

<template>
    <textarea
        ref="textareaRef"
        class="textarea"
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        :style="textareaStyles"
        :placeholder="placeholder"
        :id="id"
    ></textarea>
</template>

<style scoped>
.textarea {
    padding: 8px 10px;
    font-weight: 400;
    font-size: 16px;
    color: var(--text-primary);
    border-radius: 10px;
    background: var(--surface);
    resize: none;
    overflow-y: auto;
    
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);

    transition: box-shadow 0.15s ease-in-out;
}

.textarea::-webkit-scrollbar {
    width: 8px;
}

.textarea::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
    border-radius: 4px;
}

.textarea::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 4px;
}

.textarea::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
}

.textarea::placeholder {
    color: var(--text-secondary);
}

.textarea:focus {
    box-shadow: var(--input-focus-shadow);
}
</style>