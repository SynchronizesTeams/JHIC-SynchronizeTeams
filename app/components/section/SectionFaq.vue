<template>
  <div class="max-w-4xl mx-auto py-12">
    <div class="space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="faq.id"
        class="bg-primary-white border border-primary-gray/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
      >
        <button
          @click="toggleFaq(index)"
          class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary-gray/5 transition-colors"
        >
          <span class="font-semibold text-primary-gray text-lg pr-4">
            {{ faq.question }}
          </span>
          <svg
            class="w-6 h-6 text-primary-gray/60 flex-shrink-0 transition-transform duration-300"
            :class="{ 'rotate-180': activeIndex === index }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-96 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="max-h-96 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div
            v-if="activeIndex === index"
            class="px-6 pb-5 border-t border-primary-gray/10"
          >
            <p class="text-primary-gray/70 leading-relaxed pt-4">
              {{ faq.answer }}
            </p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="mt-12 text-center bg-gradient-to-r from-secondary-red/10 to-secondary-red/5 rounded-2xl p-8 border border-secondary-red/20">
      <h3 class="text-xl font-bold text-primary-gray mb-2">
        Masih ada pertanyaan?
      </h3>
      <p class="text-primary-gray/60 mb-4">
        Tim kami siap membantu menjawab pertanyaan Anda
      </p>
      <a
        href="/about"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Hubungi Kami
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Faq {
  id: number
  question: string
  answer: string
}

const props = defineProps<{
  faqs: Faq[]
}>()

const activeIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
