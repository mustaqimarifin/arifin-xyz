'use client'

import type { Session } from 'next-auth'
import { auth } from '@/db/auth'
import { useState } from 'react'

export const useSession = () => {
  const [session, setSession] = useState<null | Session>(null)

  return (
    <button
      onClick={async () => {
        await auth()
        setSession(session)
      }}
    ></button>
  )
}
