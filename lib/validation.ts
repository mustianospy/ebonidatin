import { z } from "zod"

export const messageSchema = z.object({
  content: z.string().min(1).max(5000),
  message_type: z.enum(["text", "image", "voice", "gif"]),
  receiver_id: z.string().uuid(),
  match_id: z.string().uuid().optional(),
})

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(100),
})

export const profileSchema = z.object({
  bio: z.string().max(500).optional(),
  age: z.number().min(18).max(120).optional(),
  location: z.string().optional(),
  interests: z.array(z.string()).optional(),
})

export type Message = z.infer<typeof messageSchema>
export type User = z.infer<typeof userSchema>
export type Profile = z.infer<typeof profileSchema>
