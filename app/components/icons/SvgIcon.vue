<!-- components/SvgIcon.vue -->
<script lang="ts" setup>
interface Props {
    name: string
}

const props = defineProps<Props>();
</script>

<template>
  <svg class="svg-icon">
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>