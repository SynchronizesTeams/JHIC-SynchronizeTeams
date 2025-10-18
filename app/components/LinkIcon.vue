<template>
  <component 
    v-if="iconName && iconComponent" 
    :is="iconComponent" 
    :class="iconClass"
  />
  <Link v-else :class="iconClass" />
</template>

<script setup lang="ts">
import {
  Link,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  MessageCircle,
  Send,
  Music,
  Mail,
  Phone,
  MapPin,
  Store,
  Book,
  Camera,
  ShoppingBag,
  Calendar,
  Users,
  Briefcase,
  User,
  Home
} from 'lucide-vue-next'

interface Props {
  icon?: string
  class?: string
}

const props = defineProps<Props>()

const iconClass = computed(() => props.class || 'w-6 h-6')
const iconName = computed(() => props.icon)

// Icon components mapping
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

const iconComponent = computed(() => {
  if (!iconName.value) return null
  return iconComponents[iconName.value] || null
})
</script>
