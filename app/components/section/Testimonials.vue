<template>
  <section class="py-16">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="testimonials.length > 0" class="relative overflow-hidden">
        <!-- Infinite scrolling carousel -->
        <div class="animate-testimonial-scroll flex space-x-6 py-5">
          <div
            v-for="(testimonial, index) in displayedTestimonials"
            :key="index"
            class="flex-shrink-0 w-[350px]">
            <TestimonialCard :testimonial="testimonial" />
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Belum ada testimoni untuk ditampilkan.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});

// Duplicate testimonials array for seamless infinite scroll
const displayedTestimonials = computed(() => {
  if (props.testimonials.length === 0) return [];
  
  // Duplicate the array 3 times for smooth infinite scroll
  return [...props.testimonials, ...props.testimonials, ...props.testimonials];
});
</script>

<style scoped>
.animate-testimonial-scroll {
  width: max-content;
  animation: scroll 10s linear infinite; 
}

@keyframes scroll {
  from {
    transform: translateX(10);
  }
  to {
    transform: translateX(calc(-100% / 3));
  }
}

.overflow-hidden {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}
</style>
