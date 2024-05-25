import { signIn, signOut } from '@/db/auth'
import styles from '$$/page/gb.module.css'

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider)
      }}
    >
      <button type="submit" className={styles['log-in']}>
        <svg width="20" height="20" role="img" aria-label="Kitteh">
          <use href="/sprite.svg#xyz" />
        </svg>
        {/* <img alt="GitHub logo" src="/github-logo.svg" width="20" height="20" /> */}
        <div className="ml-3">USE DEM SOCIALS</div>
      </button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type="submit" className={styles['log-out']}>
        Sign Out
      </button>
    </form>
  )
}
