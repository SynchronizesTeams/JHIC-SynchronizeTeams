export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  url?: string
  requireInteraction?: boolean
}

export interface NotificationPermissionState {
  permission: NotificationPermission
  isSupported: boolean
  isSubscribed: boolean
}
