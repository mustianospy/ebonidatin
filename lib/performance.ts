export function reportWebVitals(metric: any) {
  if (typeof window !== "undefined" && "navigator" in window) {
    const body = JSON.stringify(metric)
    navigator.sendBeacon("/api/metrics", body)
  }
}

export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`[v0] ${name} took ${end - start}ms`)
}

export async function measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()
  const result = await fn()
  const end = performance.now()
  console.log(`[v0] ${name} took ${end - start}ms`)
  return result
}
