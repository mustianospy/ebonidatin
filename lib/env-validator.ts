export function validateEnvironment() {
  const requiredEnvVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingVars.length > 0) {
    console.error("[v0] Missing required environment variables:", missingVars)
    throw new Error(`Missing environment variables: ${missingVars.join(", ")}`)
  }

  return true
}
