<template>
  <div>
    <!-- Icon Display -->
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Icon
      </label>
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="showPicker = !showPicker"
          class="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center bg-white"
        >
          <component 
            v-if="selectedIcon" 
            :is="getIconComponent(selectedIcon)" 
            class="w-6 h-6 text-gray-700"
          />
          <span v-else class="text-gray-400">
            <Plus class="w-6 h-6" />
          </span>
        </button>
        <span class="text-sm text-gray-600">
          {{ selectedIcon ? socialIcons.find(i => i.name === selectedIcon)?.label : 'Pilih icon' }}
        </span>
      </div>
    </div>

    <!-- Icon Picker Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showPicker"
        class="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-80"
      >
        <div class="grid grid-cols-6 gap-2">
          <button
            v-for="icon in socialIcons"
            :key="icon.name"
            type="button"
            @click="selectIcon(icon.name)"
            :class="[
              'p-2 rounded-lg border-2 transition-all hover:scale-110',
              selectedIcon === icon.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            ]"
            :title="icon.label"
          >
            <component :is="getIconComponent(icon.name)" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  MessageCircle, // WhatsApp
  Send, // Telegram
  Music, // TikTok/Spotify
  Mail,
  Phone,
  MapPin,
  Link,
  Store,
  Book,
  Camera,
  ShoppingBag,
  Calendar,
  Users,
  Briefcase,
  Heart,
  Star,
  Coffee,
  Home,
  User,
  Settings,
  Plus
} from 'lucide-vue-next'

interface Props {
  modelValue?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const showPicker = ref(false)
const selectedIcon = ref(props.modelValue || '')

// Social media and popular icons
const socialIcons = [
  { name: 'globe', label: 'Website', component: Globe },
  { name: 'facebook', label: 'Facebook', component: Facebook },
  { name: 'instagram', label: 'Instagram', component: Instagram },
  { name: 'twitter', label: 'Twitter/X', component: Twitter },
  { name: 'github', label: 'GitHub', component: Github },
  { name: 'linkedin', label: 'LinkedIn', component: Linkedin },
  { name: 'youtube', label: 'YouTube', component: Youtube },
  { name: 'whatsapp', label: 'WhatsApp', component: MessageCircle },
  { name: 'telegram', label: 'Telegram', component: Send },
  { name: 'tiktok', label: 'TikTok', component: Music },
  { name: 'email', label: 'Email', component: Mail },
  { name: 'phone', label: 'Phone', component: Phone },
  { name: 'location', label: 'Location', component: MapPin },
  { name: 'link', label: 'Link', component: Link },
  { name: 'store', label: 'Store', component: Store },
  { name: 'portfolio', label: 'Portfolio', component: Book },
  { name: 'photography', label: 'Photography', component: Camera },
  { name: 'shop', label: 'Shop', component: ShoppingBag },
  { name: 'calendar', label: 'Calendar', component: Calendar },
  { name: 'team', label: 'Team', component: Users },
  { name: 'business', label: 'Business', component: Briefcase },
  { name: 'blog', label: 'Blog', component: Book },
  { name: 'personal', label: 'Personal', component: User },
  { name: 'home', label: 'Home', component: Home }
]

const iconComponents: Record<string, any> = {
  globe: Globe,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  whatsapp: MessageCircle,
  telegram: Send,
  tiktok: Music,
  email: Mail,
  phone: Phone,
  location: MapPin,
  link: Link,
  store: Store,
  portfolio: Book,
  photography: Camera,
  shop: ShoppingBag,
  calendar: Calendar,
  team: Users,
  business: Briefcase,
  blog: Book,
  personal: User,
  home: Home
}

const getIconComponent = (name: string) => {
  return iconComponents[name] || Globe
}

const selectIcon = (iconName: string) => {
  selectedIcon.value = iconName
  emit('update:modelValue', iconName)
  showPicker.value = false
}

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  selectedIcon.value = newVal || ''
})

// Close picker when clicking outside
onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.icon-picker') && showPicker.value) {
      showPicker.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
