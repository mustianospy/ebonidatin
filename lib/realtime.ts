import { createClient } from "@/lib/supabase/client"

export class RealtimeManager {
  private channels = new Map<string, any>()

  subscribeToMessages(matchId: string, onMessage: (message: any) => void) {
    const supabase = createClient()
    const channel = supabase
      .channel(`messages:${matchId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `match_id=eq.${matchId}` },
        (payload) => {
          onMessage(payload.new)
        },
      )
      .subscribe()

    this.channels.set(`messages:${matchId}`, channel)
    return () => this.unsubscribe(`messages:${matchId}`)
  }

  subscribeToUserStatus(userId: string, onStatusChange: (status: string) => void) {
    const supabase = createClient()
    const channel = supabase
      .channel(`user:${userId}`)
      .on("presence", { event: "sync" }, () => {
        onStatusChange("online")
      })
      .on("presence", { event: "leave" }, () => {
        onStatusChange("offline")
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ user_id: userId, online_at: new Date().toISOString() })
        }
      })

    this.channels.set(`user:${userId}`, channel)
    return () => this.unsubscribe(`user:${userId}`)
  }

  unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName)
    if (channel) {
      channel.unsubscribe()
      this.channels.delete(channelName)
    }
  }

  unsubscribeAll() {
    this.channels.forEach((channel) => {
      channel.unsubscribe()
    })
    this.channels.clear()
  }
}

export const realtimeManager = new RealtimeManager()
