import { signIn, signOut } from "../auth"

export function SignIn({
  provider
}: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button
      className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8"
     
    >
      <img alt="GitHub logo" src="/github-logo.svg" width="20" height="20" />
      <div className="ml-3">Sign in with GitHub</div>
    </button>
    </form>
  )
}

export function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 mb-6">
        Sign Out
      </button>
    </form>
  )
}