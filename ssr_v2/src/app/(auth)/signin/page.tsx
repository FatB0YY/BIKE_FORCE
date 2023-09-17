import GoogleButton from '@/components/Auth/GoogleButton'
import SignInForm from '@/components/Auth/SignInForm'

const SignIn = async () => {
  return (
    <div>
      <h1>SignIn</h1>
      <GoogleButton />
      <div>or</div>
      <SignInForm />
    </div>
  )
}

export default SignIn
