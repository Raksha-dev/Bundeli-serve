import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-7xl mb-6">🍽️</p>
        <h2 className="text-4xl font-bold text-[#4A2C17] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Page not found
        </h2>
        <p className="text-[#8C6F5A] mb-8">Looks like this dish isn't on the menu.</p>
        <Link
          href="/"
          className="inline-flex bg-[#D4380D] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#B83209] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
