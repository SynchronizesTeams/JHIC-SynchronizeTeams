<template>
  <div>
    <!-- Tagline -->
    <div class="text-center max-w-2xl mx-auto my-6">
      <div
        class="w-32 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded"></div>

      <blockquote
        class="relative text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed italic tracking-tight">
        <p class="mb-1">"Succeeded By Character!</p>
        <p class="mt-1">We Are Different!</p>
        <p class="mt-1">The Future is Ours!"</p>
      </blockquote>

      <p class="mt-8 text-sm font-medium italic text-gray-500">
        SMK Plus Pelita Nusantara
      </p>

      <div
        class="w-28 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mt-8 mb-8 rounded"></div>
    </div>

    <!-- 3 Cards with Photo-Title-Description -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-12">
      <div
        v-for="card in cards"
        :key="card.title"
        class="bg-white rounded-2xl overflow-visible shadow-lg hover:shadow-2xl transition-all duration-300 group relative">

        <!-- Photo Section -->
        <div class="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200">
          <NuxtImg
            :src="card.image"
            :alt="card.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <!-- Title Badge (Outside Photo Container) - Highest Z-Index -->
        <div class="absolute inset-x-0 top-[176px] flex justify-center px-4 z-30">
          <span class="bg-white px-4 py-2 rounded-full shadow-xl font-bold text-gray-800 text-xs sm:text-sm whitespace-nowrap max-w-[85%] overflow-hidden text-ellipsis text-secondary-red">
            {{ card.title }}
          </span>
        </div>

        <!-- Description Section -->
        <div class="px-6 pt-8 pb-6 text-center relative z-0">
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- School Profile Description -->
    <div class="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-md">
      <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">Profil Sekolah</h3>
      <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
        <p class="mb-4">
          <strong>SMK Plus Pelita Nusantara</strong> adalah lembaga pendidikan vokasi yang berkomitmen untuk menghasilkan lulusan yang berkualitas, berkarakter, dan siap bersaing di dunia industri. Dengan mengusung tagline <em>"Succeeded By Character"</em>, kami fokus pada pembentukan karakter siswa yang kuat, terampil, dan memiliki jiwa entrepreneur.
        </p>
        <p class="mb-4">
          Didukung oleh tenaga pendidik yang profesional dan berpengalaman, fasilitas modern, serta kerjasama dengan berbagai industri terkemuka, SMK Plus Pelita Nusantara menjadi pilihan tepat bagi para siswa yang ingin meraih kesuksesan di era digital.
        </p>
        <p>
          Kami percaya bahwa pendidikan bukan hanya tentang transfer ilmu, tetapi juga tentang membangun karakter, mengembangkan soft skills, dan mempersiapkan generasi muda untuk menjadi pemimpin masa depan yang berintegritas dan berdaya saing global.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cards = [
  {
    title: 'Terampil',
    image: 'https://picsum.photos/seed/visi/600/400',
    description: 'Mewujudkan SMK yang unggul dalam mutu dan prestasi menghasilkan peserta didik yang berkarakter terampil, entrepreneur dan religius.'
  },
  {
    title: 'Religius',
    image: 'https://picsum.photos/seed/misi/600/400',
    description: 'Menyelenggarakan pendidikan berkualitas dengan kurikulum relevan yang mengembangkan potensi siswa secara maksimal dan membangun karakter yang kuat.'
  },
  {
    title: 'Entreprenuer',
    image: 'https://picsum.photos/seed/motto/600/400',
    description: 'Succeeded by Character, We Are Different! Kami berkomitmen membentuk lulusan yang tidak hanya cerdas, tetapi juga memiliki integritas dan jiwa kepemimpinan.'
  }
]
</script>

<style scoped>
@media (max-width: 640px) {
  blockquote {
    font-size: 1rem;
  }
}

.prose p {
  text-align: justify;
}
</style>
