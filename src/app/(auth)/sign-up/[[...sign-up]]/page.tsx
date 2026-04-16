import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <main className='flex min-h-screen w-full items-start justify-center overflow-y-auto py-8 sm:items-center sm:py-12'>
      <SignUp path="/sign-up" />
    </main>
  )
}

export default SignUpPage
