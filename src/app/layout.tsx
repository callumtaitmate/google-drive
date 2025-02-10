import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/ui/theme-provider";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider
} from '@clerk/nextjs'
import { PostHogProvider } from "./_providers/posthog-provider";
import Spinner from "~/components/ui/spinner";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "store-my-files",
  description: "Bare bones online file store, store-my-files.com.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

    <ClerkProvider>
      <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
        <body>
          <Suspense fallback={<Loading />}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <PostHogProvider>
                <ClerkLoading>
                  <div className="flex h-screen items-center justify-center">

                    <Spinner />

                  </div>
                </ClerkLoading>
                <ClerkLoaded>
                  {children}
                </ClerkLoaded>
              </PostHogProvider>
            </ThemeProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}