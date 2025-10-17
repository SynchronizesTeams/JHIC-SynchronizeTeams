<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-primary-gray mb-2">Dashboard</h1>
        <p class="text-primary-gray/60">Kelola profile dan link Anda</p>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="flex gap-2 border-b border-primary-gray/20">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'px-6 py-3 font-semibold transition-all relative',
              activeTab === 'profile'
                ? 'text-secondary-red'
                : 'text-primary-gray/60 hover:text-primary-gray'
            ]"
          >
            Informasi Profile
            <div
              v-if="activeTab === 'profile'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-red"
            ></div>
          </button>
          <button
            @click="activeTab = 'links'"
            :class="[
              'px-6 py-3 font-semibold transition-all relative',
              activeTab === 'links'
                ? 'text-secondary-red'
                : 'text-primary-gray/60 hover:text-primary-gray'
            ]"
          >
            Kelola Links
            <div
              v-if="activeTab === 'links'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-red"
            ></div>
          </button>
        </div>
      </div>

      <!-- Profile Tab Content -->
      <div v-show="activeTab === 'profile'" class="space-y-6">
        <!-- Profile Preview Card -->
        <div class="bg-gradient-to-r from-secondary-red/5 to-transparent border border-primary-gray/20 rounded-2xl p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div v-if="photoPreview || userData.photo_url" class="w-16 h-16 rounded-full overflow-hidden">
                  <img :src="photoPreview || userData.photo_url" :alt="userData.name" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-red/20 to-primary-gray/10 flex items-center justify-center">
                  <svg class="w-8 h-8 text-secondary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-primary-gray">{{ userData.name }}</h3>
                <p class="text-sm text-primary-gray/60">{{ userData.email }}</p>
                <span class="inline-block mt-1 px-2 py-0.5 bg-secondary-red/10 text-secondary-red text-xs font-medium rounded-full">
                  {{ userData.role }}
                </span>
              </div>
            </div>
            <NuxtLink
              :to="`/personal-profile/${currentUser.username}`"
              target="_blank"
              class="flex items-center gap-2 px-4 py-2 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-full text-sm font-semibold hover:bg-primary-gray/5 hover:border-secondary-red/30 hover:text-secondary-red transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Lihat Profile
            </NuxtLink>
          </div>
        </div>

        <!-- Edit Profile Form -->
        <form @submit.prevent="updateProfile" class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg">
          <div class="px-6 py-4 border-b border-primary-gray/10 bg-gradient-to-r from-secondary-red/5 to-transparent">
            <h2 class="text-lg font-bold text-primary-gray">Edit Informasi Profile</h2>
          </div>

          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- No Induk -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  No Induk
                </label>
                <input
                  v-model="userData.no_induk"
                  type="text"
                  disabled
                  class="w-full px-4 py-3 bg-primary-gray/5 text-primary-gray/60 border-2 border-primary-gray/20 rounded-xl cursor-not-allowed"
                />
                <p class="text-xs text-primary-gray/40 mt-1">No Induk tidak dapat diubah</p>
              </div>

              <!-- Role -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Role
                </label>
                <input
                  v-model="userData.role"
                  type="text"
                  disabled
                  class="w-full px-4 py-3 bg-primary-gray/5 text-primary-gray/60 border-2 border-primary-gray/20 rounded-xl cursor-not-allowed capitalize"
                />
                <p class="text-xs text-primary-gray/40 mt-1">Role tidak dapat diubah</p>
              </div>

              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  No Telepon <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userData.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent"
                />
              </div>

              <!-- Jabatan -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Jabatan/Jurusan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userData.jabatan"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent"
                />
              </div>

              <!-- Tahun Ajaran Mulai -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Tahun Ajaran Mulai <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userData.tahun_ajaran_mulai"
                  type="text"
                  required
                  placeholder="2025"
                  class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent"
                />
              </div>

              <!-- Photo Profile Upload -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Foto Profile
                </label>
                <div class="flex items-center gap-4">
                  <!-- Preview -->
                  <div class="flex-shrink-0">
                    <div v-if="photoPreview || userData.photo_url" class="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-gray/20">
                      <img :src="photoPreview || userData.photo_url" alt="Preview" class="w-full h-full object-cover" />
                    </div>
                    <div v-else class="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-red/20 to-primary-gray/10 flex items-center justify-center border-2 border-primary-gray/20">
                      <svg class="w-12 h-12 text-secondary-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Upload Button -->
                  <div class="flex-1">
                    <input
                      ref="photoInput"
                      type="file"
                      accept="image/*"
                      @change="handlePhotoUpload"
                      class="hidden"
                    />
                    <button
                      type="button"
                      @click="$refs.photoInput.click()"
                      class="inline-flex items-center gap-2 px-4 py-2 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-xl text-sm font-semibold hover:bg-primary-gray/5 hover:border-secondary-red/30 transition-all"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Pilih Foto
                    </button>
                    <p class="text-xs text-primary-gray/60 mt-2">JPG, PNG, atau GIF (Max. 2MB)</p>

                    <!-- Remove Photo Button -->
                    <button
                      v-if="photoPreview || userData.photo_url"
                      type="button"
                      @click="removePhoto"
                      class="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 mt-2 font-semibold"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Hapus Foto
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alamat (Full Width) -->
            <div>
              <label class="block text-sm font-semibold text-primary-gray mb-2">
                Alamat <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="userData.alamat"
                required
                rows="3"
                class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-4">
              <button
                type="submit"
                class="px-8 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-2xl font-semibold hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-lg"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Links Tab Content -->
      <div v-show="activeTab === 'links'" class="space-y-6">
      <div class="mb-6">
        <button
          @click="openAddModal"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-2xl font-semibold hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Link Baru
        </button>
      </div>

      <!-- Links List -->
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg">
        <div class="px-6 py-4 border-b border-primary-gray/10 bg-gradient-to-r from-secondary-red/5 to-transparent">
          <h2 class="text-lg font-bold text-primary-gray">Links Anda ({{ links.length }})</h2>
        </div>

        <div v-if="links.length > 0" class="divide-y divide-primary-gray/10">
          <div
            v-for="(link, index) in links"
            :key="link.id"
            class="flex items-center gap-4 px-6 py-4 hover:bg-primary-gray/5 transition-colors group"
          >
            <!-- Drag Handle -->
            <div class="flex-shrink-0 cursor-move text-primary-gray/30 hover:text-primary-gray">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>
              </svg>
            </div>

            <!-- Icon -->
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-red/10 to-primary-gray/10 flex items-center justify-center text-2xl">
                {{ link.icon || '🔗' }}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-primary-gray text-sm">{{ link.title }}</h3>
              <p class="text-primary-gray/60 text-xs mt-0.5 truncate">{{ link.url }}</p>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs text-primary-gray/40">{{ link.clicks || 0 }} klik</span>
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="link.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                >
                  {{ link.isActive ? 'Aktif' : 'Nonaktif' }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 flex-shrink-0">
              <!-- Move Up -->
              <button
                @click="moveUp(index)"
                :disabled="index === 0"
                class="p-2 text-primary-gray/40 hover:text-secondary-red hover:bg-secondary-red/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Pindah ke atas"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                </svg>
              </button>

              <!-- Move Down -->
              <button
                @click="moveDown(index)"
                :disabled="index === links.length - 1"
                class="p-2 text-primary-gray/40 hover:text-secondary-red hover:bg-secondary-red/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Pindah ke bawah"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Toggle Active -->
              <button
                @click="toggleActive(link.id)"
                class="p-2 text-primary-gray/40 hover:text-secondary-red hover:bg-secondary-red/10 rounded-lg transition-colors"
                :title="link.isActive ? 'Nonaktifkan' : 'Aktifkan'"
              >
                <svg v-if="link.isActive" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>

              <!-- Edit -->
              <button
                @click="openEditModal(link)"
                class="p-2 text-primary-gray/40 hover:text-secondary-red hover:bg-secondary-red/10 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>

              <!-- Delete -->
              <button
                @click="confirmDelete(link)"
                class="p-2 text-primary-gray/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="p-12 text-center">
          <svg class="w-16 h-16 mx-auto text-primary-gray/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
          <p class="text-primary-gray/60 text-sm mb-4">Belum ada link yang ditambahkan</p>
          <button
            @click="openAddModal"
            class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-red text-primary-white rounded-full text-sm font-semibold hover:bg-secondary-red/90 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Tambah Link Pertama
          </button>
        </div>
      </div>
    </div>
    </div>

    <!-- Add/Edit Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeModal"
      >
        <transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="isModalOpen"
            @click.stop
            class="bg-primary-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
          >
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-primary-gray/10 flex items-center justify-between">
              <h3 class="text-lg font-bold text-primary-gray">
                {{ isEditMode ? 'Edit Link' : 'Tambah Link Baru' }}
              </h3>
              <button
                @click="closeModal"
                class="p-2 text-primary-gray/60 hover:text-secondary-red hover:bg-secondary-red/10 rounded-full transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <form @submit.prevent="saveLink" class="px-6 py-6">
              <div class="space-y-4">
                <!-- Title Field -->
                <div>
                  <label class="block text-sm font-semibold text-primary-gray mb-2">
                    Judul Link <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="Contoh: LinkedIn Profile"
                    class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent placeholder:text-primary-gray/40"
                    required
                  />
                </div>

                <!-- URL Field -->
                <div>
                  <label class="block text-sm font-semibold text-primary-gray mb-2">
                    URL <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.url"
                    type="url"
                    placeholder="https://example.com"
                    class="w-full px-4 py-3 bg-primary-white text-primary-gray border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent placeholder:text-primary-gray/40"
                    required
                  />
                </div>

                <!-- Icon Field -->
                <div>
                  <label class="block text-sm font-semibold text-primary-gray mb-2">
                    Icon Emoji <span class="text-red-500">*</span>
                  </label>
                  <div class="flex gap-2">
                    <input
                      v-model="formData.icon"
                      type="text"
                      placeholder="🔗"
                      maxlength="2"
                      class="w-20 px-4 py-3 bg-primary-white text-primary-gray text-2xl text-center border-2 border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent"
                      required
                    />
                    <div class="flex-1 flex items-center gap-2 text-xs text-primary-gray/60">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>Gunakan emoji sebagai icon</span>
                    </div>
                  </div>
                </div>

                <!-- Popular Icons -->
                <div>
                  <p class="text-xs font-semibold text-primary-gray/60 mb-2">Icon Populer:</p>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="emoji in popularEmojis"
                      :key="emoji"
                      type="button"
                      @click="formData.icon = emoji"
                      class="w-10 h-10 flex items-center justify-center text-2xl bg-primary-gray/5 hover:bg-secondary-red/10 rounded-lg transition-colors"
                    >
                      {{ emoji }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Modal Actions -->
              <div class="flex gap-3 mt-6">
                <button
                  type="button"
                  @click="closeModal"
                  class="flex-1 px-4 py-3 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-2xl font-semibold hover:bg-primary-gray/5 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-2xl font-semibold hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-sm"
                >
                  {{ isEditMode ? 'Simpan Perubahan' : 'Tambah Link' }}
                </button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDeleteModalOpen"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeDeleteModal"
      >
        <transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="isDeleteModalOpen"
            @click.stop
            class="bg-primary-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden p-6"
          >
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-primary-gray mb-2">Hapus Link?</h3>
              <p class="text-sm text-primary-gray/60">
                Apakah Anda yakin ingin menghapus link <strong>{{ linkToDelete?.title }}</strong>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div class="flex gap-3">
              <button
                @click="closeDeleteModal"
                class="flex-1 px-4 py-3 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-2xl font-semibold hover:bg-primary-gray/5 transition-all"
              >
                Batal
              </button>
              <button
                @click="deleteLink"
                class="flex-1 px-4 py-3 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { mockPersonalProfiles, mockCurrentUser } from '~/utils/mockData'
import type { PersonalLink } from '~/types/personalProfile'
import type { User } from '~/types/user'
import NavigationBar from '~/components/common/NavigationBar.vue'

// Tab state
const activeTab = ref<'profile' | 'links'>('profile')

// User data for profile editing
const userData = ref<User>({ ...mockCurrentUser })

// Photo upload state
const photoPreview = ref<string | null>(null)
const photoFile = ref<File | null>(null)
const photoInput = ref<HTMLInputElement | null>(null)

// Mock current logged in user (nanti dari auth)
const currentUser = {
  username: 'johndoe',
  name: 'John Doe'
}

// Get user's links
const userProfile = mockPersonalProfiles.find(p => p.username === currentUser.username)
const links = ref<PersonalLink[]>(userProfile?.links || [])

// Modal state
const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingLinkId = ref<string | null>(null)

// Delete modal state
const isDeleteModalOpen = ref(false)
const linkToDelete = ref<PersonalLink | null>(null)

// Form data
const formData = ref({
  title: '',
  url: '',
  icon: ''
})

// Popular emojis
const popularEmojis = ['🔗', '💼', '💻', '📸', '🎥', '🌐', '📝', '🎨', '🏀', '🐦', '📧', '📱']

// Handle photo upload
const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('File harus berupa gambar (JPG, PNG, atau GIF)')
    return
  }

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran file maksimal 2MB')
    return
  }

  // Save file and create preview
  photoFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

// Remove photo
const removePhoto = () => {
  photoPreview.value = null
  photoFile.value = null
  userData.value.photo_url = undefined
  if (photoInput.value) {
    photoInput.value.value = ''
  }
}

// Update profile function
const updateProfile = () => {
  // In real app:
  // 1. Upload photo file to server if photoFile exists
  // 2. Update user profile with new data
  // const formData = new FormData()
  // if (photoFile.value) {
  //   formData.append('photo', photoFile.value)
  // }
  // formData.append('data', JSON.stringify(userData.value))
  // await $fetch('/api/user/profile', { method: 'PATCH', body: formData })

  console.log('Updating profile:', userData.value)
  console.log('Photo file:', photoFile.value)
  alert('Profile berhasil diperbarui!')
}

// Open add modal
const openAddModal = () => {
  isEditMode.value = false
  editingLinkId.value = null
  formData.value = {
    title: '',
    url: '',
    icon: '🔗'
  }
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

// Open edit modal
const openEditModal = (link: PersonalLink) => {
  isEditMode.value = true
  editingLinkId.value = link.id
  formData.value = {
    title: link.title,
    url: link.url,
    icon: link.icon || '🔗'
  }
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

// Close modal
const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

// Save link (add or edit)
const saveLink = () => {
  if (isEditMode.value && editingLinkId.value) {
    // Edit existing link
    const index = links.value.findIndex(l => l.id === editingLinkId.value)
    if (index !== -1) {
      links.value[index] = {
        ...links.value[index],
        title: formData.value.title,
        url: formData.value.url,
        icon: formData.value.icon
      }
    }
    // In real app: await $fetch(`/api/links/${editingLinkId.value}`, { method: 'PATCH', body: formData.value })
  } else {
    // Add new link
    const newLink: PersonalLink = {
      id: Date.now().toString(),
      title: formData.value.title,
      url: formData.value.url,
      icon: formData.value.icon,
      order: links.value.length + 1,
      isActive: true,
      clicks: 0
    }
    links.value.push(newLink)
    // In real app: await $fetch('/api/links', { method: 'POST', body: formData.value })
  }

  closeModal()
}

// Confirm delete
const confirmDelete = (link: PersonalLink) => {
  linkToDelete.value = link
  isDeleteModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

// Close delete modal
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  linkToDelete.value = null
  document.body.style.overflow = ''
}

// Delete link
const deleteLink = () => {
  if (linkToDelete.value) {
    links.value = links.value.filter(l => l.id !== linkToDelete.value!.id)
    // In real app: await $fetch(`/api/links/${linkToDelete.value.id}`, { method: 'DELETE' })
  }
  closeDeleteModal()
}

// Toggle active/inactive
const toggleActive = (id: string) => {
  const link = links.value.find(l => l.id === id)
  if (link) {
    link.isActive = !link.isActive
    // In real app: await $fetch(`/api/links/${id}/toggle`, { method: 'PATCH' })
  }
}

// Move link up
const moveUp = (index: number) => {
  if (index > 0) {
    const temp = links.value[index]
    links.value[index] = links.value[index - 1]
    links.value[index - 1] = temp

    // Update order
    links.value.forEach((link, i) => {
      link.order = i + 1
    })
    // In real app: await $fetch('/api/links/reorder', { method: 'PATCH', body: { orders: links.value.map(l => ({ id: l.id, order: l.order })) } })
  }
}

// Move link down
const moveDown = (index: number) => {
  if (index < links.value.length - 1) {
    const temp = links.value[index]
    links.value[index] = links.value[index + 1]
    links.value[index + 1] = temp

    // Update order
    links.value.forEach((link, i) => {
      link.order = i + 1
    })
    // In real app: await $fetch('/api/links/reorder', { method: 'PATCH', body: { orders: links.value.map(l => ({ id: l.id, order: l.order })) } })
  }
}

// Cleanup on unmount
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

// SEO
useHead({
  title: 'Dashboard - Kelola Profile & Links',
  meta: [
    { name: 'description', content: 'Kelola informasi profile dan link Anda' }
  ]
})
</script>
