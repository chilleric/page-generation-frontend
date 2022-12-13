import { useApiCall } from '@/hooks'
import { authenticationSelector } from '@/redux/authentication'
import { resendVerifySignUp, verifySignUp } from '@/services'
import { Button, FormElement, Input, Loading, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { inputStyles } from './sign-up.inventory'

export const SignUpVerify = () => {
  const codeRef = useRef<FormElement>(null)

  const router = useRouter()

  const { signUpRequest } = useSelector(authenticationSelector)

  const { loading, setLetCall } = useApiCall({
    callApi: () => verifySignUp(signUpRequest.email, codeRef.current?.value || ''),
    handleSuccess() {
      router.push('/login')
    },
  })

  const resultResend = useApiCall({
    callApi: () => resendVerifySignUp(signUpRequest.email),
  })

  const handleVerify = () => {
    setLetCall(true)
  }

  const handleResend = () => {
    resultResend.setLetCall(true)
  }

  return (
    <>
      <Text size={18}>
        Step 4:
        <Text b css={{ marginLeft: 10 }}>
          Verify Account!
        </Text>
      </Text>
      <Input ref={codeRef} {...inputStyles({})} labelLeft="Code" />
      <Row justify="flex-end">
        <Button auto light onClick={handleResend}>
          Resend
        </Button>
        <Button disabled={loading} auto onClick={handleVerify}>
          {loading ? <Loading /> : <>Verify</>}
        </Button>
      </Row>
    </>
  )
}
