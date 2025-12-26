<template>
  <div class="bg-primary-white">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Notification Prompt -->
    <CommonNotificationPrompt />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  console.log(
      `%c
      _________                   .__                        .__            ___________                           
     /   _____/__.__. ____   ____ |  |_________  ____   ____ |__|_______ ___\__    ___/___ _____    _____   ______
     \_____  <   |  |/    \_/ ___\|  |  \_  __ \/  _ \ /    \|  \___   // __ \|    |_/ __ \\__  \  /     \ /  ___/
     /        \___  |   |  \  \___|   Y  \  | \(  <_> )   |  \  |/    /\  ___/|    |\  ___/ / __ \|  Y Y  \\___ \ 
    /_______  / ____|___|  /\___  >___|  /__|   \____/|___|  /__/_____ \\___  >____| \___  >____  /__|_|  /____  >
            \/\/         \/     \/     \/                  \/         \/    \/           \/     \/      \/     \/
      
      SynchronizeTeams`,
      "color:#00e5ff; font-family:monospace; font-size:12px;"
    )
  
    console.log(
      "%cCreated by SynchronizeTeams",
      "font-size:16px; font-weight:bold; color:#4CAF50;"
    )
  
    console.log(
      "%cVisit us → https://synchronizeteams.my.id",
      "font-size: 13px; color: #2196F3; text-decoration: underline; cursor: pointer;"
    )
})
</script>
