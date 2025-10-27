export default function AuthCallbackLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-50 to-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Processing sign in...</p>
      </div>
    </div>
  )
}
