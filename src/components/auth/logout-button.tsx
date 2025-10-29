'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    if (response.ok) {
      router.push('/login')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className='block w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 text-center'
    >
      Logout
    </button>
  )
}
