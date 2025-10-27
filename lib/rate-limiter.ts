interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>()

  check(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now()
    const entry = this.store.get(key)

    if (!entry || now > entry.resetTime) {
      this.store.set(key, {
        count: 1,
        resetTime: now + windowMs,
      })
      return true
    }

    if (entry.count < limit) {
      entry.count++
      return true
    }

    return false
  }

  reset(key: string) {
    this.store.delete(key)
  }
}

export const rateLimiter = new RateLimiter()
