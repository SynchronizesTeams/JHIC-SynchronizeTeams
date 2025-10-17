<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Kelola Portal Sekolah</h1>
            <p class="text-gray-600 mt-2">Kelola link portal resmi sekolah</p>
          </div>
          <button
            @click="showAddModal = true"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Portal
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-xl shadow-lg p-8">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Portals List -->
      <div v-else-if="portals.length > 0" class="space-y-4">
        <div
          v-for="portal in sortedPortals"
          :key="portal.id"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                {{ portal.icon || '🌐' }}
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ portal.title }}</h3>
                <a
                  :href="portal.url"
                  target="_blank"
                  class="text-blue-500 hover:underline text-sm"
                >
                  {{ portal.url }}
                </a>
                <div class="mt-1 flex items-center gap-4 text-sm">
                  <span class="text-gray-500">Order: {{ portal.order || 999 }}</span>
                  <span :class="portal.is_active ? 'text-green-600' : 'text-red-600'">
                    {{ portal.is_active ? 'Aktif' : 'Nonaktif' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="editPortal(portal)"
                class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="confirmDelete(portal)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Belum ada portal</h3>
        <p class="text-gray-600 mb-6">Tambahkan portal pertama untuk sekolah</p>
        <button
          @click="showAddModal = true"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Tambah Portal Pertama
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div
        v-if="showAddModal || showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="closeModals"
      >
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6" @click.stop>
          <h2 class="text-xl font-bold text-gray-900 mb-6">
            {{ showEditModal ? 'Edit Portal' : 'Tambah Portal Baru' }}
          </h2>
          
          <form @submit.prevent="showEditModal ? updatePortal() : addPortal()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Judul Portal
              </label>
              <input
                v-model="formData.title"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: E-Learning"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                v-model="formData.url"
                type="url"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://elearning.smkpnb.sch.id"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Icon (Emoji)
              </label>
              <input
                v-model="formData.icon"
                type="text"
                maxlength="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="📚"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Urutan Tampil
              </label>
              <input
                v-model.number="formData.order"
                type="number"
                min="1"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
            </div>

            <div class="flex items-center">
              <input
                v-model="formData.is_active"
                type="checkbox"
                id="is_active"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="is_active" class="ml-2 block text-sm text-gray-900">
                Portal Aktif
              </label>
            </div>

            <div class="flex gap-3 mt-6">
              <button
                type="button"
                @click="closeModals"
                class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {{ isSubmitting ? 'Menyimpan...' : (showEditModal ? 'Simpan Perubahan' : 'Tambah Portal') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="showDeleteModal = false"
      >
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6" @click.stop>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Hapus Portal?</h2>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus portal "{{ portalToDelete?.title }}"? Tindakan ini tidak dapat dibatalkan.
          </p>
          
          <div class="flex gap-3">
            <button
              @click="showDeleteModal = false"
              class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              @click="handleDelete"
              :disabled="isSubmitting"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {{ isSubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { SchoolPortal } from '~/composables/usePortals'

const router = useRouter()
const { user, token } = useAuth()
const { portals, isLoading, error, fetchPortals, createPortal, updatePortal: updatePortalApi, deletePortal } = usePortals()
const { showNotification } = useNotification()

// Check if user is admin
onMounted(async () => {
  if (!token.value || user.value?.role !== 'admin') {
    router.push('/login')
    return
  }
  
  try {
    await fetchPortals()
  } catch (error) {
    console.error('Failed to fetch portals:', error)
  }
})

// Sort portals by order
const sortedPortals = computed(() => {
  return [...portals.value].sort((a, b) => (a.order || 999) - (b.order || 999))
})

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isSubmitting = ref(false)
const portalToDelete = ref<SchoolPortal | null>(null)
const portalToEdit = ref<SchoolPortal | null>(null)

// Form data
const formData = ref({
  title: '',
  url: '',
  icon: '',
  order: 1,
  is_active: true
})

// Reset form
const resetForm = () => {
  formData.value = {
    title: '',
    url: '',
    icon: '',
    order: 1,
    is_active: true
  }
}

// Close all modals
const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  showDeleteModal.value = false
  resetForm()
  portalToEdit.value = null
  portalToDelete.value = null
}

// Add new portal
const addPortal = async () => {
  isSubmitting.value = true
  try {
    await createPortal(formData.value)
    showNotification({
      type: 'success',
      title: 'Berhasil',
      message: 'Portal berhasil ditambahkan'
    })
    closeModals()
  } catch (error) {
    showNotification({
      type: 'error',
      title: 'Gagal',
      message: 'Gagal menambahkan portal'
    })
  } finally {
    isSubmitting.value = false
  }
}

// Edit portal
const editPortal = (portal: SchoolPortal) => {
  portalToEdit.value = portal
  formData.value = {
    title: portal.title,
    url: portal.url,
    icon: portal.icon || '',
    order: portal.order || 1,
    is_active: portal.is_active !== false
  }
  showEditModal.value = true
}

// Update portal
const updatePortal = async () => {
  if (!portalToEdit.value?.id) return
  
  isSubmitting.value = true
  try {
    await updatePortalApi(portalToEdit.value.id, formData.value)
    showNotification({
      type: 'success',
      title: 'Berhasil',
      message: 'Portal berhasil diperbarui'
    })
    closeModals()
  } catch (error) {
    showNotification({
      type: 'error',
      title: 'Gagal',
      message: 'Gagal memperbarui portal'
    })
  } finally {
    isSubmitting.value = false
  }
}

// Confirm delete
const confirmDelete = (portal: SchoolPortal) => {
  portalToDelete.value = portal
  showDeleteModal.value = true
}

// Handle delete
const handleDelete = async () => {
  if (!portalToDelete.value?.id) return
  
  isSubmitting.value = true
  try {
    await deletePortal(portalToDelete.value.id)
    showNotification({
      type: 'success',
      title: 'Berhasil',
      message: 'Portal berhasil dihapus'
    })
    showDeleteModal.value = false
    portalToDelete.value = null
  } catch (error) {
    showNotification({
      type: 'error',
      title: 'Gagal',
      message: 'Gagal menghapus portal'
    })
  } finally {
    isSubmitting.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Kelola Portal - Admin Dashboard',
  description: 'Kelola portal resmi sekolah'
})
</script>
