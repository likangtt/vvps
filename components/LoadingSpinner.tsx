export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <div className="absolute inset-0 rounded-full border-2 border-primary-500/20"></div>
        <div className="absolute inset-2 rounded-full border-2 border-primary-500/10 animate-pulse"></div>
      </div>
    </div>
  )
}