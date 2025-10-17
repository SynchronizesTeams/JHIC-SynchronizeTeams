<template>
  <div class="bg-primary-white">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Notification Prompt -->
    <NotificationPrompt />
  </div>
</template>

<script setup lang="ts">
import NotificationPrompt from '~/components/common/NotificationPrompt.vue'
</script>
