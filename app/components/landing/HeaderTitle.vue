<template>
  <div class="flex w-full flex-col gap-3 my-6">
    <div class="h-px w-full bg-black" aria-hidden="true"></div>
    <h2
      :class="[
        'flex-shrink-0 text-4xl px-6 font-semibold text-black whitespace-nowrap',
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right',
        },
      ]"
    >
      <slot>{{ title }}</slot>
    </h2>
    <div class="h-px w-full bg-black" aria-hidden="true"></div>
  </div>
</template>

<script lang="ts" setup>
type Align = "left" | "right" | "center";

withDefaults(
  defineProps<{
    title?: string;
    align?: Align;
  }>(),
  {
    title: "JUDUL",
    align: "center",
  }
);
</script>

