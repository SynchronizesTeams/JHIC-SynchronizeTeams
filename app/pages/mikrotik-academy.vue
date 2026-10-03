<script setup lang="ts">
import type { MikrotikAcademyContent } from '~/types/mikrotik-academy'
import contentJson from '~/contents/mikrotik-academy.json'

const content = contentJson as MikrotikAcademyContent
const { seo, hero, tentang, kepalaSekolah, trainer, metode, kurikulum, kontak } = content

useSeoMeta({
  title: seo.title, // titleTemplate menambah " | SMK Plus Pelita Nusantara"
  description: seo.description,
  ogTitle: seo.ogTitle,
  ogDescription: seo.description,
  ogUrl: seo.canonical,
})

useHead({
  link: [{ rel: 'canonical', href: seo.canonical, key: 'canonical' }],
})

// Class literal agar terdeteksi Tailwind; dipilih dari nilai porsi di JSON
const porsiSpan: Record<number, string> = { 25: 'col-span-1', 75: 'col-span-3' }
const porsiSpanMd: Record<number, string> = { 25: 'md:col-span-1', 75: 'md:col-span-3' }

// Butir metode dipisah: yang punya porsi masuk bar, sisanya tampil sebagai baris ikon
const metodePorsi = computed(() => metode.daftar.filter((item) => item.porsi !== null))
const metodeLain = computed(() => metode.daftar.filter((item) => item.porsi === null))

// Accordion kurikulum: satu ref, paling banyak satu modul terbuka
const openModul = ref<number | null>(null) // semua tertutup saat dimuat (Req 9.8)
const toggleModul = (nomor: number) => {
  // Buka modul lain menutup yang terbuka; klik modul terbuka menutup semuanya (Req 9.4, 9.9, 9.10)
  openModul.value = openModul.value === nomor ? null : nomor
}
</script>

<template>
  <div class="bg-primary-white text-primary-gray pb-16">
    <!-- SECTION: Hero -->
    <section class="px-6 mt-4" aria-labelledby="hero-title">
      <div class="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-primary-gray min-h-[30rem] md:min-h-[36rem] flex items-end">
        <!-- Latar foto penuh + overlay gelap agar teks terbaca -->
        <div class="absolute inset-0">
          <MikrotikAcademyImage
            :src="hero.gambar.src"
            :alt="hero.gambar.alt"
            ratio-class="h-full w-full"
            rounded-class=""
            eager
          />
        </div>
        <div class="absolute inset-0 bg-primary-gray/85" aria-hidden="true" />

        <div class="relative z-10 w-full max-w-3xl p-6 sm:p-10 md:p-14">
          <!-- Satu-satunya h1 di halaman -->
          <h1 id="hero-title" class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-primary-text">
            {{ hero.judulUtama }}
          </h1>
          <p class="mt-3 text-lg md:text-xl font-semibold text-primary-white">
            {{ hero.subjudul }}
          </p>
          <p class="mt-5 text-base leading-relaxed text-primary-white">
            {{ hero.deskripsi }}
          </p>

          <a
            :href="hero.cta.href"
            class="mt-8 inline-flex min-h-11 items-center px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white shadow-lg hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-text"
          >
            {{ hero.cta.label }}
          </a>

          <!-- Garis kredensial: teks biasa dengan LED merah -->
          <ul
            aria-label="Kredensial program"
            class="mt-10 border-t border-primary-text/15 pt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-white"
          >
            <li v-for="k in hero.kredensial" :key="k" class="flex items-center gap-2">
              <span aria-hidden="true" class="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-secondary-red ring-1 ring-primary-text/40" />
              <span>{{ k }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SECTION: Tentang #tentang -->
    <section id="tentang" class="scroll-mt-28 px-6 py-16" aria-labelledby="tentang-title">
      <div class="max-w-7xl mx-auto">
        <div class="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          <!-- Kolom teks -->
          <div class="lg:col-span-7">
            <MikrotikAcademyLabel :text="tentang.label" />
            <h2 id="tentang-title" class="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight text-primary-gray break-words">
              {{ tentang.judul }}
            </h2>
            <template v-for="sub in tentang.subbagian" :key="sub.judul">
              <h3 class="mt-8 text-xl font-bold">{{ sub.judul }}</h3>
              <p class="mt-3 text-base leading-relaxed text-primary-gray/80">{{ sub.teks }}</p>
            </template>
          </div>

          <!-- Kolom foto -->
          <div class="mt-8 lg:mt-0 lg:col-span-5">
            <MikrotikAcademyImage
              :src="tentang.gambar.src"
              :alt="tentang.gambar.alt"
              ratio-class="aspect-[4/3]"
            />
          </div>
        </div>

        <!-- Kartu sertifikasi MTCNA, lebar penuh -->
        <div class="mt-10 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-primary-gray/10 grid gap-6 md:grid-cols-[auto_1fr] items-start">
          <div class="w-20 md:w-24">
            <MikrotikAcademyImage
              :src="tentang.sertifikasi.logo.src"
              :alt="tentang.sertifikasi.logo.alt"
              ratio-class="aspect-square"
              rounded-class="rounded-xl"
              fit="contain"
            />
          </div>
          <div>
            <h3 class="text-2xl font-bold">{{ tentang.sertifikasi.judul }}</h3>
            <p class="mt-3 text-base leading-relaxed text-primary-gray/80">{{ tentang.sertifikasi.teks }}</p>
            <p class="mt-4 text-sm">
              <span class="text-primary-gray/70">{{ tentang.sertifikasi.kemitraanLabel }}:</span>
              <span class="font-semibold">{{ tentang.sertifikasi.kemitraan }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: Kepala Sekolah -->
    <section class="px-6 py-8" aria-labelledby="kepala-sekolah-title">
      <!-- Panel putih flat: dipisah dengan border, tidak ditinggikan -->
      <div class="max-w-7xl mx-auto bg-white rounded-3xl border border-primary-gray/10 p-6 md:p-10 md:grid md:grid-cols-12 md:gap-10 items-center">
        <!-- Kolom foto -->
        <div class="md:col-span-4">
          <div class="max-w-xs">
            <MikrotikAcademyImage
              :src="kepalaSekolah.foto.src"
              :alt="kepalaSekolah.foto.alt"
              ratio-class="aspect-[3/4]"
            />
          </div>
        </div>

        <!-- Kolom teks -->
        <div class="mt-8 md:mt-0 md:col-span-8">
          <MikrotikAcademyLabel :text="kepalaSekolah.label" />
          <h2 id="kepala-sekolah-title" class="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight text-primary-gray break-words">
            {{ kepalaSekolah.nama }}
          </h2>
          <p class="mt-2 text-sm font-medium text-primary-gray/70">{{ kepalaSekolah.jabatan }}</p>
          <p class="mt-6 text-base leading-relaxed text-primary-gray/80">{{ kepalaSekolah.pernyataan }}</p>

          <blockquote class="mt-8">
            <!-- Tanda kutip dekoratif -->
            <svg
              aria-hidden="true"
              class="h-8 w-8 text-primary-gray/20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.5 6C6.46 6 4 8.46 4 11.5V18h6.5v-6.5H7c0-1.38 1.12-2.5 2.5-2.5V6Zm10 0c-3.04 0-5.5 2.46-5.5 5.5V18h6.5v-6.5H17c0-1.38 1.12-2.5 2.5-2.5V6Z" />
            </svg>
            <p class="mt-3 text-2xl md:text-3xl font-semibold leading-snug text-primary-gray">{{ kepalaSekolah.quote }}</p>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- SECTION: Trainer #trainer -->
    <section id="trainer" class="scroll-mt-28 px-6 py-16" aria-labelledby="trainer-title">
      <div class="max-w-7xl mx-auto">
        <MikrotikAcademyLabel :text="trainer.label" />
        <h2 id="trainer-title" class="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight text-primary-gray break-words">
          {{ trainer.judul }}
        </h2>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-primary-gray/80">{{ trainer.quoteSection }}</p>

        <!-- Dua kartu setara: kolom sama lebar, tinggi disamakan lewat grid stretch -->
        <ul class="mt-10 grid gap-6 lg:grid-cols-2">
          <li
            v-for="(t, i) in trainer.daftar"
            :key="i"
            class="flex"
          >
            <!-- Kartu flat: dipisah dengan border, tanpa shadow -->
            <article class="w-full bg-white rounded-2xl border border-primary-gray/10 p-6">
              <div class="sm:flex sm:gap-6">
                <div class="w-40 sm:w-44 shrink-0">
                  <MikrotikAcademyImage
                    :src="t.foto.src"
                    :alt="t.foto.alt"
                    ratio-class="aspect-[3/4]"
                  />
                </div>
                <div class="mt-4 sm:mt-0 min-w-0">
                  <h3 class="text-2xl font-bold">{{ t.nama }}</h3>
                  <p class="mt-1 text-sm font-medium text-primary-gray/70">{{ t.peran }}</p>
                  <!-- Label tersembunyi untuk pembaca layar sebelum daftar badge -->
                  <p class="sr-only">{{ trainer.labelSertifikasi }}</p>
                  <ul class="mt-4 flex flex-wrap gap-2">
                    <li v-for="b in t.badgeSertifikasi" :key="b">
                      <span class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold bg-secondary-red/10 text-secondary-red">
                        {{ b }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Sertifikat: selalu 2 kolom agar ukuran tiap sertifikat sama di kedua kartu.
                   Rasio A4 portrait + contain supaya scan tidak terpotong. -->
              <ul class="mt-6 grid grid-cols-2 gap-4">
                <li v-for="s in t.sertifikat" :key="s.judul">
                  <figure>
                    <MikrotikAcademyImage
                      :src="s.gambar.src"
                      :alt="s.gambar.alt"
                      ratio-class="aspect-[210/297]"
                      rounded-class="rounded-xl"
                      fit="contain"
                    />
                    <figcaption class="mt-2 text-sm text-primary-gray/70">{{ s.judul }}</figcaption>
                  </figure>
                </li>
              </ul>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- SECTION: Metode #metode -->
    <section id="metode" class="scroll-mt-28 px-6 py-16" aria-labelledby="metode-title">
      <div class="max-w-7xl mx-auto">
        <MikrotikAcademyLabel :text="metode.label" />
        <h2 id="metode-title" class="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight text-primary-gray break-words">
          {{ metode.judul }}
        </h2>

        <!-- Bar porsi dekoratif; informasi lengkap ada di dl di bawahnya -->
        <div aria-hidden="true" class="mt-10 grid h-3 grid-cols-4 gap-1 md:gap-6">
          <span
            v-for="item in metodePorsi"
            :key="item.judul"
            :class="[porsiSpan[item.porsi as number], 'rounded-sm', item.porsi === 75 ? 'bg-secondary-red' : 'bg-primary-gray/25']"
          />
        </div>

        <dl class="mt-6 grid gap-6 grid-cols-1 md:grid-cols-4">
          <!-- Butir berporsi: lebar kolom sejajar dengan segmen bar -->
          <div v-for="item in metodePorsi" :key="item.judul" :class="porsiSpanMd[item.porsi as number]">
            <dt class="flex items-center gap-2 text-xl font-bold">
              <span
                aria-hidden="true"
                :class="['h-2.5 w-2.5 shrink-0 rounded-[2px]', item.porsi === 75 ? 'bg-secondary-red' : 'bg-primary-gray/25']"
              />
              {{ item.judul }}
            </dt>
            <dd class="mt-1 text-sm text-primary-gray/70">{{ item.deskripsi }}</dd>
          </div>

          <!-- Butir tanpa porsi: baris penuh dengan ikon router -->
          <div
            v-for="item in metodeLain"
            :key="item.judul"
            class="md:col-span-4 mt-2 border-t border-primary-gray/10 pt-6 flex items-center gap-4"
          >
            <div aria-hidden="true" class="h-11 w-11 shrink-0 rounded-xl bg-secondary-red/10 flex items-center justify-center">
              <svg
                class="h-6 w-6 text-secondary-red"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
              >
                <!-- Antena -->
                <path d="M17 11V6" />
                <!-- Badan router -->
                <rect x="2.5" y="11" width="19" height="8" rx="2" />
                <!-- Empat port -->
                <rect x="5.5" y="14" width="2" height="2" rx="0.4" />
                <rect x="9" y="14" width="2" height="2" rx="0.4" />
                <rect x="12.5" y="14" width="2" height="2" rx="0.4" />
                <rect x="16" y="14" width="2" height="2" rx="0.4" />
              </svg>
            </div>
            <div>
              <dt class="text-xl font-bold">{{ item.judul }}</dt>
              <dd class="mt-1 text-sm text-primary-gray/70">{{ item.deskripsi }}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>

    <!-- SECTION: Kurikulum #kurikulum -->
    <section id="kurikulum" class="scroll-mt-28 px-6 py-8" aria-labelledby="kurikulum-title">
      <div
        class="max-w-7xl mx-auto bg-white rounded-3xl border border-primary-gray/10 p-6 md:p-10 lg:grid lg:grid-cols-12 lg:gap-10"
      >
        <div class="lg:col-span-4">
          <MikrotikAcademyLabel :text="kurikulum.label" />
          <h2
            id="kurikulum-title"
            class="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight text-primary-gray break-words"
          >
            {{ kurikulum.judul }}
          </h2>
          <p class="mt-4 text-base leading-relaxed text-primary-gray/80">{{ kurikulum.deskripsi }}</p>
        </div>

        <!-- Accordion tombol: satu ref openModul, paling banyak satu modul terbuka (Req 9.4 sampai 9.10) -->
        <ol class="mt-8 lg:mt-0 lg:col-span-8 divide-y divide-primary-gray/10">
          <li v-for="modul in kurikulum.modul" :key="modul.nomor">
            <h3>
              <button
                type="button"
                :id="`modul-${modul.nomor}-trigger`"
                :aria-expanded="openModul === modul.nomor"
                :aria-controls="`modul-${modul.nomor}-panel`"
                class="flex w-full min-h-11 items-center gap-4 rounded-xl px-2 py-3 text-left hover:bg-primary-gray/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-red/50"
                @click="toggleModul(modul.nomor)"
              >
                <!-- Port bernomor dengan LED status, dekoratif -->
                <span
                  aria-hidden="true"
                  class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-2 border-primary-gray/20 text-base font-bold tabular-nums"
                >
                  {{ modul.nomor }}
                  <span
                    class="absolute right-1 top-1 h-1.5 w-1.5 rounded-[1px]"
                    :class="openModul === modul.nomor ? 'bg-secondary-red' : 'bg-primary-gray/20'"
                  />
                </span>
                <span class="flex-1 min-w-0 text-lg font-semibold break-words">
                  <span class="sr-only">{{ kurikulum.labelModul }} {{ modul.nomor }}: </span>{{ modul.nama }}
                </span>
                <span class="shrink-0 text-sm text-primary-gray/70">
                  {{ modul.topik.length }} {{ kurikulum.labelTopik }}
                </span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="h-5 w-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none"
                  :class="openModul === modul.nomor && 'rotate-180'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </h3>
            <!-- v-show: daftar topik tetap di DOM saat tertutup (Req 9.3) -->
            <div
              v-show="openModul === modul.nomor"
              :id="`modul-${modul.nomor}-panel`"
              role="region"
              :aria-labelledby="`modul-${modul.nomor}-trigger`"
            >
              <ul
                class="grid gap-x-6 gap-y-2 pb-5 pl-4 pr-2 sm:grid-cols-2 sm:pl-[4.25rem] text-sm text-primary-gray/80"
              >
                <li v-for="t in modul.topik" :key="t">{{ t }}</li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- SECTION: Kontak #kontak -->
    <section id="kontak" class="scroll-mt-28 px-6 py-16" aria-labelledby="kontak-title">
      <div class="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-10 items-center">
        <div class="lg:col-span-7">
          <MikrotikAcademyImage :src="kontak.gambar.src" :alt="kontak.gambar.alt" ratio-class="aspect-video" />
        </div>

        <div class="mt-8 lg:mt-0 lg:col-span-5">
          <MikrotikAcademyLabel :text="kontak.label" />
          <h2
            id="kontak-title"
            class="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight text-primary-gray break-words"
          >
            {{ kontak.judul }}
          </h2>
          <p class="mt-2 text-lg font-semibold">{{ kontak.namaSekolah }}</p>

          <ul class="mt-6 space-y-3">
            <li>
              <a
                :href="kontak.whatsapp.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex min-h-11 items-center gap-4 rounded-xl p-2 hover:bg-primary-gray/5 hover:text-secondary-red transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-red/50"
              >
                <span
                  aria-hidden="true"
                  class="h-11 w-11 shrink-0 rounded-xl bg-secondary-red/10 flex items-center justify-center"
                >
                  <!-- Gelembung chat -->
                  <svg
                    focusable="false"
                    class="h-6 w-6 text-secondary-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.9-.9L3 20.5l1.5-4.6A8.4 8.4 0 0 1 3.6 12 8.5 8.5 0 0 1 12 3.5a8.4 8.4 0 0 1 9 8z" />
                  </svg>
                </span>
                <span class="flex flex-col min-w-0">
                  <span class="text-sm text-primary-gray/70">{{ kontak.whatsapp.label }}</span>
                  <span class="font-semibold">{{ kontak.whatsapp.teks }}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                :href="kontak.email.href"
                class="group flex min-h-11 items-center gap-4 rounded-xl p-2 hover:bg-primary-gray/5 hover:text-secondary-red transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-red/50"
              >
                <span
                  aria-hidden="true"
                  class="h-11 w-11 shrink-0 rounded-xl bg-secondary-red/10 flex items-center justify-center"
                >
                  <!-- Amplop -->
                  <svg
                    focusable="false"
                    class="h-6 w-6 text-secondary-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <span class="flex flex-col min-w-0">
                  <span class="text-sm text-primary-gray/70">{{ kontak.email.label }}</span>
                  <span class="font-semibold break-all">{{ kontak.email.teks }}</span>
                </span>
              </a>
            </li>
            <li>
              <address class="not-italic flex items-start gap-4 p-2">
                <span
                  aria-hidden="true"
                  class="h-11 w-11 shrink-0 rounded-xl bg-secondary-red/10 flex items-center justify-center"
                >
                  <!-- Pin lokasi -->
                  <svg
                    focusable="false"
                    class="h-6 w-6 text-secondary-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </span>
                <span class="flex flex-col min-w-0">
                  <span class="text-sm text-primary-gray/70">{{ kontak.alamat.label }}</span>
                  <span class="font-semibold leading-relaxed">{{ kontak.alamat.teks }}</span>
                </span>
              </address>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/*
 * Sengaja tidak scoped: scroll-behavior: smooth global berasal dari style
 * tidak scoped di NavigationBar.vue. Aturan ini menimpanya hanya saat
 * pengguna meminta reduced motion.
 */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }
}
</style>
