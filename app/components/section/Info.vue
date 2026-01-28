<template>
  <div
    class="w-full rounded-2xl p-4 md:p-8 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm">
    <div class="flex items-center justify-center mb-6">
      <div class="inline-flex gap-3">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :aria-pressed="activeTab === tab.id"
          :class="[
            'px-3 py-2 text-md cursor-pointer md:text-base font-semibold transition-all duration-300 rounded-full focus:outline-none select-none',
            activeTab === tab.id
              ? 'bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white shadow-lg transform scale-105'
              : 'text-gray-600 hover:text-gray-800 hover:shadow-sm',
          ]">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <CommonVisiMisi v-if="activeTab === 'visimisi'" />

    <CommonProfile v-if="activeTab === 'profile'" />

    <CommonSapras v-if="activeTab === 'sapras'" />

  </div>
</template>

<script lang="ts" setup>
type TabKey = "profile" | "visimisi" | "sapras";

const activeTab = ref<TabKey>("profile");

const tabs: { id: TabKey; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "visimisi", label: "Visi & Misi" },
  { id: "sapras", label: "Sapras" },
];
</script>

<style scoped>
@media (max-width: 640px) {
  blockquote {
    font-size: 1rem;
  }
}
</style>
