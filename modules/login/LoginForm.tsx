import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { encodeBase64 } from '@/lib'
import { callForgotPassword, login } from '@/services'
import { LoginResponseFailure, LoginResponseSuccess } from '@/types'
import { Button, FormElement, Input, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { inputStyles } from './login.inventory'

export const LoginForm = () => {
  const emailRef = useRef<FormElement>(null)
  const passwordRef = useRef<FormElement>(null)
  const router = useRouter()
  const [cookies, setCookie] = useCookies([DEVICE_ID, USER_ID])

  const resultForgotPassword = useApiCall({
    callApi: () => callForgotPassword(emailRef?.current?.value || ''),
  })

  const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
    callApi: () =>
      login({
        username: emailRef.current ? emailRef.current.value : '',
        password: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
      }),
    handleSuccess(message, data) {
      if (data.needVerify) {
        router.push('/verify?type=verifyEmail')
      }
      if (data.verify2Fa) {
        router.push(`/verify?type=verify2FA&email=${emailRef.current?.value || ''}`)
      }
      if (!data.needVerify && !data.verify2Fa) {
        setCookie(DEVICE_ID, data.deviceId, {
          path: '/',
          expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        })
        setCookie(USER_ID, data.userId, {
          path: '/',
          expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        })
        router.push('/')
      }
    },
  })

  const { error, loading, setLetCall, handleReset } = result

  const handleLogin = () => {
    setLetCall(true)
  }

  const handleSignUp = () => {
    router.push('/sign-up')
  }

  useEffect(() => {
    if (cookies.deviceId && cookies.userId) {
      router.push('/')
    }
  }, [cookies])

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Sign in
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={emailRef}
          {...inputStyles({ error: error?.result?.username && error.result.username })}
          labelLeft="username"
          onFocus={handleReset}
        />
        <Input
          ref={passwordRef}
          {...inputStyles({ error: error?.result?.password && error.result.password })}
          type="password"
          labelLeft="password"
          onFocus={handleReset}
        />
        <Row justify="flex-end">
          <Button
            disabled={loading}
            auto
            light
            onClick={() => resultForgotPassword.setLetCall(true)}
          >
            Forgot Password?
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} auto onClick={handleSignUp}>
          Sign Up
        </Button>
        <Button disabled={loading} auto onClick={handleLogin}>
          {loading ? <Loading /> : <>Sign In</>}
        </Button>
      </Modal.Footer>
    </>
  )
}
