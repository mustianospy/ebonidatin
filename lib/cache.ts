interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class Cache {
  private store = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T, ttlSeconds = 300) {
    this.store.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > entry.ttl
    if (isExpired) {
      this.store.delete(key)
      return null
    }

    return entry.data as T
  }

  clear() {
    this.store.clear()
  }

  delete(key: string) {
    this.store.delete(key)
  }
}

export const cache = new Cache()
