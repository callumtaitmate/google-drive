'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Icons } from '~/components/ui/icons'
import { cn } from '~/lib/utils'
import Link from 'next/link'


export default function SignInPage() {
  return (
    <section className='py-24'>
      <div className="grid w-full grow items-center px-4 sm:justify-center">
        <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignIn.Step name="start">
                  <Card >
                    <CardHeader>
                      <CardTitle>Sign in to store-my-files</CardTitle>
                      <CardDescription>Welcome back! Please sign in to continue</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <div className="grid grid-cols-1">
                        <Clerk.Connection name="google" asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading scope="provider:google">
                              {(isLoading) =>
                                isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <Icons.google className="mr-2 size-4" />
                                    Google
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                      </div>
                      <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        or
                      </p>
                      <Clerk.Field name="identifier" className="space-y-1">
                        <Clerk.Label asChild>
                          <Label>Email address</Label>
                        </Clerk.Label>
                        <Clerk.Input type="email" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>


                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  'Continue'
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>

                        <Button variant="link" size="sm" asChild>
                          <Link href="/sign-up">
                            Don&apos;t have an account? Sign up
                          </Link>
                        </Button>




                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Step>


                <SignIn.Step name="verifications">
                  <SignIn.Strategy name="password">
                    <Card className="w-full sm:w-96">
                      <CardHeader>
                        <CardTitle>Enter your password</CardTitle>
                        <p className="text-sm text-muted-foreground">

                          Welcome back <SignIn.SafeIdentifier /></p>
                      </CardHeader>
                      <CardContent className="grid gap-y-4">
                        <Clerk.Field name="password" className="space-y-2">
                          <Clerk.Input type="password" asChild>
                            <Input />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button disabled={isGlobalLoading}>
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin" />
                                  ) : (
                                    'Continue'
                                  )
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>

                          <SignIn.Action navigate="forgot-password" asChild>
                            <Button variant="link">
                              Forgot password?
                            </Button>
                          </SignIn.Action>

                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>

                  <SignIn.Strategy name="reset_password_email_code">
                    <Card className="w-full sm:w-96">
                      <CardHeader>
                        <CardTitle>Check your email</CardTitle>
                      </CardHeader>
                      <CardContent>

                        <p className="text-sm text-muted-foreground">
                          We sent a code to <SignIn.SafeIdentifier />.
                        </p>

                        <Clerk.Field name="code">
                          <Clerk.Input
                            type="otp"
                            className="flex justify-center has-[:disabled]:opacity-50 mt-2"
                            autoSubmit
                            render={({ value, status }) => {
                              return (
                                <div
                                  data-status={status}
                                  className={cn(
                                    'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                                    {
                                      'z-10 ring-2 ring-ring ring-offset-background':
                                        status === 'cursor' || status === 'selected',
                                    },
                                  )}
                                >
                                  {value}
                                  {status === 'cursor' && (
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                      <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                    </div>
                                  )}
                                </div>
                              )
                            }}
                          />
                          <Clerk.FieldError />
                        </Clerk.Field>


                        <div className="grid w-full gap-y-4 mt-4">

                          <SignIn.Action submit asChild>
                            <Button disabled={isGlobalLoading}>
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin" />
                                  ) : (
                                    'Verify'
                                  )
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardContent>
                    </Card>

                  </SignIn.Strategy>

                </SignIn.Step>



                <SignIn.Step name="forgot-password">
                  <Card className="w-full sm:w-96">
                    <CardHeader className=''>
                      <CardTitle><h1>Forgot your password?</h1></CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-y-4">

                      <SignIn.SupportedStrategy name="reset_password_email_code" asChild>

                        <Button disabled={isGlobalLoading}> Reset password
                        </Button>
                      </SignIn.SupportedStrategy>

                      <SignIn.Action navigate="previous" asChild>

                        <Button variant="link">

                          Go back
                        </Button>
                      </SignIn.Action>


                    </CardContent>
                  </Card>
                </SignIn.Step>

                <SignIn.Step name="reset-password">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Reset your password</CardTitle></CardHeader>
                    <CardContent className="grid gap-y-4">

                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label>New password</Clerk.Label>
                        <Clerk.Input required asChild>

                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>

                      <Clerk.Field name="confirmPassword" className="space-y-2" >

                        <Clerk.Label>Confirm Password</Clerk.Label>
                        <Clerk.Input required asChild>

                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>

                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                'Reset Password'
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </CardContent>
                  </Card>




                </SignIn.Step>










              </>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      </div>

    </section>
  )


}