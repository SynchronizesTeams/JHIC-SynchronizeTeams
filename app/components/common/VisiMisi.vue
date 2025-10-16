<template>
  <div>
    <div class="text-center max-w-2xl mx-auto my-6">
      <div class="w-32 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded"></div>

      <blockquote class="relative text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed italic tracking-tight">
        <p class="mb-1">"Succeeded By Character!</p>
        <p class="mt-1">We Are Different!</p>
        <p class="mt-1">The Future is Ours!"</p>
      </blockquote>

      <p class="mt-8 text-sm font-medium italic text-gray-500">
        SMK Plus Pelita Nusantara
      </p>

      <div class="w-28 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mt-8 mb-8 rounded"></div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      <div
        v-for="info in props.infoBoxes"
        :key="info.title"
        class="group bg-white/60 backdrop-blur-sm rounded-xl p-4 h-fit flex flex-col justify-center items-center text-center shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-3">
          <svg
            class="w-6 h-6 text-red-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
          </svg>
        </div>

        <h3 class="text-lg font-bold text-gray-800">{{ info.title }}</h3>
        <p class="text-sm text-gray-600 mt-2">{{ info.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
  infoBoxes?: { title: string; content: string }[];
}>(), {
  title: "Visi dan Misi",
  description: `
    <p class="mb-2"><b>Visi:</b> Menjadi sekolah unggulan dalam bidang kejuruan yang menghasilkan lulusan berkarakter dan berdaya saing global.</p>
    <p class="mb-2"><b>Misi:</b> Menyelenggarakan pendidikan berkualitas dengan kurikulum relevan, mengembangkan potensi siswa, dan membangun karakter yang kuat.</p>
    <p><b>Slogan:</b> Success by character, we are different</p>
  `,
  linkText: "Pelajari Lebih Lanjut",
  linkUrl: "#",
  infoBoxes: () => [
    {
      title: "Visi",
      content:
        "Mewujudkan SMK yang unggul dalam mutu dan prestasi menghasilkan peserta didik yang berkarakter terampil, entrepreneur dan religius.",
    },
    { title: "Misi", content: "Pendidikan berkualitas" },
  ],
});
</script>

<style scoped>
@media (max-width: 640px) {
  blockquote {
    font-size: 1rem;
  }
}
</style>