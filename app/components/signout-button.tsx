'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const SignoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="text-black bg-white rounded-full hover:bg-opacity-70 hover:bg-white"
      full
    >
      Keluar
    </Button>
  )
}

export default SignoutButton
