export interface Notification {
  id: string
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  requireInteraction?: boolean
}

class NotificationManager {
  async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.warn("[v0] Notifications not supported")
      return false
    }

    if (Notification.permission === "granted") {
      return true
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission()
      return permission === "granted"
    }

    return false
  }

  async send(notification: Notification): Promise<void> {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return
    }

    if ("serviceWorker" in navigator && "PushManager" in window) {
      const registration = await navigator.serviceWorker.ready
      registration.showNotification(notification.title, {
        body: notification.body,
        icon: notification.icon,
        badge: notification.badge,
        tag: notification.tag,
        requireInteraction: notification.requireInteraction,
      })
    }
  }

  async subscribeToNotifications(vapidPublicKey: string): Promise<PushSubscription | null> {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("[v0] Push notifications not supported")
      return null
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      })
      return subscription
    } catch (error) {
      console.error("[v0] Failed to subscribe to notifications:", error)
      return null
    }
  }
}

export const notificationManager = new NotificationManager()
