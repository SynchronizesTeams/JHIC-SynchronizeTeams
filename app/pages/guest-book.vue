<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Guest Book Form (Expandable) -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[1000px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[1000px] opacity-100"
      leave-to-class="max-h-0 opacity-0">
      <div>
        <div
          class="bg-primary-white border border-primary-gray/20 rounded-3xl shadow-lg p-6 md:p-8">
          <h3 class="text-2xl font-bold text-primary-gray mb-6">
            Form Buku Tamu
          </h3>

          <div @submit.prevent="submitGuestBook" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Title -->
              <div>
                <label
                  class="block text-sm font-semibold text-primary-gray mb-2">
                  Judul <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="Masukkan judul" />
              </div>

              <!-- Instance Name -->
              <div>
                <label
                  class="block text-sm font-semibold text-primary-gray mb-2">
                  Nama/Instansi <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.instance_name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="Nama atau instansi Anda" />
              </div>

              <!-- Contact Person -->
              <div>
                <label
                  class="block text-sm font-semibold text-primary-gray mb-2">
                  Nama yang dituju<span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.contact_person"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="Nama orang yang dituju" />
              </div>

              <!-- Email -->
              <div>
                <label
                  class="block text-sm font-semibold text-primary-gray mb-2">
                  Email <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="email@example.com" />
              </div>

              <!-- Phone -->
              <div>
                <label
                  class="block text-sm font-semibold text-primary-gray mb-2">
                  No WhatsApp <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="08xxxxxxxxxx" />
              </div>

              <!-- Request Date -->
              <div>
                <label
                  class="block text-sm font-semibold text-primary-gray mb-2">
                  Tanggal
                  <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.request_date"
                  type="date"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all text-base text-primary-gray cursor-pointer hover:border-primary-gray/40 date-input" />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-primary-gray mb-2">
                Deskripsi <span class="text-secondary-red">*</span>
              </label>
              <textarea
                v-model="guestBookForm.description"
                required
                rows="4"
                class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all resize-none"
                placeholder="Tulis pesan atau keperluan Anda..."></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center gap-4">
              <button
                type="button"
                @click="submitGuestBook"
                :disabled="isSubmitting"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                <svg
                  v-if="isSubmitting"
                  class="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{
                  isSubmitting ? "Mengirim..." : "Kirim Buku Tamu"
                }}</span>
              </button>

              <button
                v-if="submitStatus === 'success'"
                type="button"
                class="text-green-600 text-sm font-semibold flex items-center gap-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                Terkirim!
              </button>

              <button
                v-if="submitStatus === 'error'"
                type="button"
                class="text-red-600 text-sm font-semibold flex items-center gap-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
                Gagal terkirim
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from "~/types/calendar";

const props = defineProps<{
  events?: CalendarEvent[];
}>();

const apiUrl = useRuntimeConfig().public.apiBaseUrl

// Use composables
const { createGuestBook} = useGuestBook();

const isSubmitting = ref(false);
const submitStatus = ref<"idle" | "success" | "error">("idle");

const guestBookForm = ref({
  title: "",
  instance_name: "",
  contact_person: "",
  email: "",
  phone: "",
  request_date: "",
  description: "",
})


const submitGuestBook = async () => {
  isSubmitting.value = true;
  submitStatus.value = "idle";

  try {
    const result = await createGuestBook(guestBookForm.value);

    if (result.success) {
      console.log("Guest Book Submitted Successfully:", result.data);
      submitStatus.value = "success";

      setTimeout(() => {
        guestBookForm.value = {
          title: "",
          instance_name: "",
          contact_person: "",
          email: "",
          phone: "",
          request_date: "",
          description: "",
        };
        submitStatus.value = "idle";
      }, 2000);
    } else {
      throw new Error(result.error || "Gagal mengirim buku tamu");
    }
  } catch (error: any) {
    console.error("Error submitting guest book:", error);
    submitStatus.value = "error";

    setTimeout(() => {
      submitStatus.value = "idle";
    }, 3000);
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
