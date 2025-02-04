'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { env } from '~/env'
import dynamicLoader from 'next/dynamic'


const SuspendedPostHogPageView = dynamicLoader(() => import('./PageViewTracker'), { ssr: false })

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false // Disable automatic pageview capture, as we capture manually
      })
  }, [])

  return (
    <PHProvider client={posthog}>
        <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}