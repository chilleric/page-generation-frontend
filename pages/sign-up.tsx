import { LoginLayout } from '@/components/layout/LoginLayout'
import { Modal } from '@nextui-org/react'
import { SignUpForm } from '@/modules'

const SignUpPage = () => {
  return (
    <LoginLayout>
      <Modal open preventClose>
        <SignUpForm />
      </Modal>
    </LoginLayout>
  )
}

export default SignUpPage
