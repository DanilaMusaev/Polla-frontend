<script setup lang="ts">
defineProps<{
    error: Error | null;
}>();
</script>

<template>
    <div class="complete-poll__error">
        Error loading poll: {{ error?.message }}
    </div>
</template>

<style scoped>

</style>