import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-card p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-foreground">Ebonidatin</h1>
        <p className="text-xl text-muted-foreground">Find meaningful connections with people who share your values</p>

        <div className="flex gap-4 justify-center pt-8">
          <Link href="/auth/login">
            <Button size="lg" className="px-8">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
