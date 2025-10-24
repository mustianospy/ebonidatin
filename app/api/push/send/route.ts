import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
// app/api/push/send/route.ts
import { createRouteHandlerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import webPush from "web-push"

webPush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { userId, payload } = await req.json()

  if (!userId || !payload) {
    return NextResponse.json({ error: "Missing userId or payload" }, { status: 400 })
  }

  const { data: subscriptions, error } = await supabase
    .from("push_subscriptions")
    .select("subscription")
    .eq("user_id", userId)

  if (error) {
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }

  const notificationPromises = subscriptions.map((s) =>
    webPush.sendNotification(s.subscription, JSON.stringify(payload)),
  )

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Your push notification logic here
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    await Promise.all(notificationPromises)
    return NextResponse.json({ message: "Notifications sent" }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 })
  }
}
