<template>
  <div class="relative w-full min-h-fit overflow-hidden">
    <section ref="heroSection" class="relative">
      <div
        ref="heroContent"
        class="min-h-fit flex flex-col items-center justify-center">
        <div
          ref="logo"
          class="w-full aspect-video rounded-xl overflow-hidden">
          <img
            src="/videoplaceholder.png"
            alt="Logo"
            class="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>

</script>
<style scoped>
html,
body {
  scroll-behavior: smooth;
}
</style>