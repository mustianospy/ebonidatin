<<<<<<< HEAD
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
=======
// app/api/push/subscribe/route.ts
import { createRouteHandlerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
>>>>>>> 5f7ecfe94c0ff42d7e2c8d499a6f34aef0565396

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

<<<<<<< HEAD
    // Your subscription logic here
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
=======
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const subscription = await req.json()

  if (!subscription) {
    return NextResponse.json({ error: "Missing subscription object" }, { status: 400 })
  }

  const { data, error } = await supabase.from("push_subscriptions").insert([{ user_id: user.id, subscription }])

  if (error) {
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 })
  }

  return NextResponse.json({ message: "Subscription saved" }, { status: 201 })
>>>>>>> 5f7ecfe94c0ff42d7e2c8d499a6f34aef0565396
}
