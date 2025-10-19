<template>
  <div class="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div class="mb-6 h-32">
      <p class="text-gray-600 italic">"{{ testimonial.testimonial }}"</p>
    </div>
    
    <div class="flex items-center">
      <div v-if="photoUrl" class="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-gray-200 flex-shrink-0">
        <img 
          :src="photoUrl" 
          :alt="`Avatar of ${testimonial.name}`"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
      <div v-else class="w-14 h-14 rounded-full bg-gradient-to-br from-secondary-red/20 to-primary-gray/10 flex items-center justify-center mr-4 border-2 border-gray-200 flex-shrink-0">
        <svg class="w-7 h-7 text-secondary-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-bold text-gray-800 truncate">{{ testimonial.name }}</p>
        <p class="text-sm text-gray-500 truncate">{{ testimonial.position }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  testimonial: {
    type: Object,
    required: true
  }
});

const showImage = ref(true);

// Photo URL is already constructed by useTestimonials composable
const photoUrl = computed(() => {
  return props.testimonial.photo && props.testimonial.photo !== '' 
    ? props.testimonial.photo 
    : null;
});

// Handle image error - hide image and show default avatar
const handleImageError = () => {
  showImage.value = false;
};
</script>