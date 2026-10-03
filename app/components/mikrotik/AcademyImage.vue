<template>
  <div :class="['relative overflow-hidden bg-primary-gray/10', ratioClass, roundedClass]">
    <img
      v-if="!failed"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      :class="['absolute inset-0 h-full w-full', fit === 'contain' ? 'object-contain' : 'object-cover']"
      @error="failed = true"
    />
    <div
      v-else
      role="img"
      :aria-label="alt"
      class="absolute inset-0 flex items-center justify-center"
    >
      <span aria-hidden="true" class="h-2.5 w-2.5 rounded-[2px] bg-primary-gray/30" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    /** Class Tailwind untuk rasio/ukuran, mis. 'aspect-[3/4]' atau 'h-full w-full' */
    ratioClass?: string
    roundedClass?: string
    eager?: boolean
    fit?: 'cover' | 'contain'
  }>(),
  { ratioClass: 'aspect-[4/3]', roundedClass: 'rounded-2xl', eager: false, fit: 'cover' }
)

const failed = ref(false)
// Reset fallback bila src berganti (mis. pemilik mengganti aset)
watch(() => props.src, () => { failed.value = false })
</script>
