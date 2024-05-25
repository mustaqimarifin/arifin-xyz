import { env } from 'site.config'
import { Resend } from 'resend'

/* if (!env.resendSecret) {
  throw new Error('RESEND_TOKEN environment variable is not set')
}
if (!env.resendAudience) {
  throw new Error('Missing RESEND_AUDIENCE_ID')
} */
export const resend = new Resend(env.resendSecret)

export const audienceId = env.resendAudience as string
