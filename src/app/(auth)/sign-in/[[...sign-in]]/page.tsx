import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <main className='flex min-h-screen w-full items-start justify-center overflow-y-auto py-8 sm:items-center sm:py-12'>
      <SignIn path="/sign-in" />
    </main>
  )
}

export default SignInPage
