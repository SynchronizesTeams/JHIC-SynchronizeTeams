<template>
  <section class="py-16">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-if="testimonials.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial" />
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Belum ada testimoni untuk ditampilkan.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});
</script>
