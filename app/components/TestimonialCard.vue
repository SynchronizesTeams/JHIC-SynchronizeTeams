<template>
  <div class="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div class="mb-6 h-32">
      <p class="text-gray-600 italic">"{{ testimonial.quote }}"</p>
    </div>
    
    <div class="flex items-center">
      <NuxtImg 
        :src="testimonial.avatar" 
        :alt="`Avatar of ${testimonial.name}`"
        class="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200"
      />
      <div>
        <p class="font-bold text-gray-800">{{ testimonial.name }}</p>
        <p class="text-sm text-gray-500">{{ testimonial.position }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true
  }
});
</script>