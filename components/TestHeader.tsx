'use client'

import Link from 'next/link'

export default function TestHeader() {
  return (
    <header className="bg-red-500 p-4 text-white">
      <div className="flex space-x-4">
        <Link href="/" className="hover:underline">
          首页
        </Link>
        <Link href="/deals" className="hover:underline">
          优惠
        </Link>
        <Link href="/about" className="hover:underline">
          关于
        </Link>
        <Link href="/contact" className="hover:underline">
          联系
        </Link>
      </div>
    </header>
  )
}