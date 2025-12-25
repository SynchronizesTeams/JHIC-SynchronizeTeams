<template>
  <div class="min-h-screen bg-primary-white">
    <!-- Header -->
    <div class="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div class="flex items-center gap-3 mb-12">
        <span class="text-4xl md:text-5xl font-bold text-secondary-red">|</span>
        <h1 class="text-4xl md:text-5xl font-bold text-primary-gray">
          SPMB 2025
        </h1>
      </div>

      <!-- Main Content Box -->
      <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
        <!-- Brochure Section -->
        <div class="flex justify-center">
          <!-- Menambahkan cursor pointer dan event click untuk membuka popup -->
          <div 
            class="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
            @click="isPopupOpen = true"
          >
            <div class="relative">
              <img 
                src="/images/spmb/brosur.jpg" 
                alt="Brosur SPMB SMK Plus PNB" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <!-- Overlay hint saat hover -->
              <!-- <CHANGE> Mengganti teks dengan icon mata (Eye Icon) -->
              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="bg-white/90 p-4 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-gray">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="space-y-6">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-primary-gray mb-4">
              Bergabunglah dengan Kami
            </h2>
            <p class="text-primary-gray/80 text-lg leading-relaxed">
             Ayo ajak putra/i, kerabat, tetangga, dan seluruh masyarakat untuk bergabung di SMK Plus Pelita Nusantara—sekolah unggulan dengan fasilitas lengkap, guru profesional, dan lingkungan yang aman serta berkarakter.
            </p>
          </div>

          <!-- Features List -->
          <div class="space-y-4">
            <div v-for="(feature, index) in features" :key="index" class="flex gap-3">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-red/20 flex items-center justify-center">
                <span class="text-secondary-red font-bold">✓</span>
              </div>
              <div>
                <h3 class="font-semibold text-primary-gray">{{ feature.title }}</h3>
                <p class="text-sm text-primary-gray/70">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary-red to-secondary-red/90 px-8 py-12 md:px-12 md:py-16">
        <div class="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -left-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        <div class="relative z-10 max-w-2xl mx-auto text-center">
          <h3 class="text-3xl md:text-4xl font-bold text-primary-white mb-4">
            Siap Memulai Karir Cemerlang?
          </h3>
          <p class="text-lg text-primary-white/90 mb-8">
            Daftar sekarang melalui portal SPMB resmi kami dan jadilah bagian dari keluarga besar SMK Plus PNB.
          </p>
          
          <a 
            href="https://ppdb.smkpluspnb.sch.id"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-white text-secondary-red px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Daftar Sekarang</span>
            <span class="text-xl">→</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Image Popup Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isPopupOpen" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          @click="isPopupOpen = false"
        >
          <div 
            class="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            @click.stop
          >
            <!-- Close Button -->
            <button 
              class="absolute -top-12 right-0 md:-right-12 text-white hover:text-secondary-red transition-colors"
              @click="isPopupOpen = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Large Image -->
            <img 
              src="/images/spmb/brosur.jpg" 
              alt="Brosur Full View" 
              class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isPopupOpen = ref(false)

const features = [
  { title: 'Program Keahlian Sesuai Kebutuhan Industri', desc: 'Selaras dengan kebutuhan dunia kerja' },
  { title: 'Kurikulum Merdeka', desc: 'Pembelajaran fleksibel dan berorientasi siswa' },
  { title: 'Ekstrakurikuler Beragam', desc: 'Mengembangkan minat dan bakat' },
  { title: 'Pembinaan Karakter & Akhlak', desc: 'Membentuk pribadi berakhlak mulia' },
  { title: 'Kerja Sama Luas dengan DU/DI', desc: 'Mendukung magang dan penyerapan kerja' },
]

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isPopupOpen.ref = false
}

onMounted(() => window.addEventListener('keydown', handleEsc))
onUnmounted(() => window.removeEventListener('keydown', handleEsc))
</script>
