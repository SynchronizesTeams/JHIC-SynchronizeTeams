<template>
  <p class="flex items-center gap-2 text-sm font-semibold text-secondary-red">
    <span aria-hidden="true" class="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-secondary-red" />
    <span>{{ text }}</span>
  </p>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
