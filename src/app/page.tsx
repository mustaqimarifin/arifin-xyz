import { Clock, Fade, HomePageNav } from '@/components/client'
import styles from '@/components/client/client.module.css'
import { pg_ink } from '@/db/actions'
import { Suspense } from 'react'
export default async function Page() {
  /*   const HomeBG = slow(async () => await import('@/components/client').then((mod) => mod.HomeBG), {
    ssr: false,
  }) */

  await pg_ink('https://arifin.xyz')

  return (
    <section>
      <HomePageNav />
      <Suspense>
        <Fade>
          <div className={styles['bg-wrap']} />
        </Fade>
        <div id="clock" className={styles.clock}>
          <Clock />
        </div>
      </Suspense>
    </section>
  )
}
