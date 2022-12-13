import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { resendVerify2FA, resendVerifySignUp, Verify2FA, verifySignUp } from '@/services'
import { LoginResponseSuccess } from '@/types'
import { Button, Input, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { inputStyles } from './verify.inventory'

export const VerifyForm = () => {
  const [isCode, setIsCode] = useState<boolean>(false)
  const router = useRouter()
  const [, setCookie] = useCookies([USER_ID, DEVICE_ID])

  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const handleLogin = () => {
    router.push('/login')
  }

  useEffect(() => {
    if (router?.query.type === 'verify2FA') {
      setEmail(router?.query.email?.toString() || '')
      setIsCode(true)
    }
  }, [router])

  const verify2FACall = useApiCall<LoginResponseSuccess, string>({
    callApi: () => Verify2FA(email, code),
    handleSuccess(_, data) {
      setCookie(DEVICE_ID, data.deviceId, {
        path: '/',
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      })
      setCookie(USER_ID, data.userId, {
        path: '/',
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      })
      router.push('/')
    },
  })

  const verifyEmail = useApiCall<string, string>({
    callApi: () => verifySignUp(email, code),
    handleSuccess() {
      router.push('/login')
    },
  })

  const resultResendEmail = useApiCall<string, string>({
    callApi: () => resendVerifySignUp(email),
    handleSuccess(message) {
      if (message) {
        setIsCode(true)
      }
    },
  })

  const resultResend2FA = useApiCall<string, string>({
    callApi: () => resendVerify2FA(email),
    handleSuccess(message) {
      if (message) {
        setIsCode(true)
      }
    },
  })

  const handleSubmit = () => {
    if (router?.query.type === 'verify2FA') verify2FACall.setLetCall(true)
    if (router?.query.type === 'verifyEmail') verifyEmail.setLetCall(true)
  }

  const handleReset = () => {
    if (router?.query.type === 'verify2FA') verify2FACall.handleReset()
    if (router?.query.type === 'verifyEmail') verifyEmail.handleReset()
  }

  const handleResend = () => {
    if (router?.query.type === 'verify2FA') resultResend2FA.setLetCall(true)
    if (router?.query.type === 'verifyEmail') resultResendEmail.setLetCall(true)
  }

  const loading =
    resultResend2FA.loading ||
    verifyEmail.loading ||
    verify2FACall.loading ||
    resultResendEmail.loading

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {router?.query.type === 'verify2FA' ? '2FA' : 'Email'}
        </Text>
      </Modal.Header>
      <Modal.Body>
        {!isCode ? (
          <Input
            {...inputStyles({})}
            labelLeft="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleReset}
          />
        ) : (
          <>
            <Input
              {...inputStyles({})}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              labelLeft="Code"
              onFocus={handleReset}
            />
            <Row justify="flex-end">
              <Button
                disabled={resultResend2FA.loading || resultResendEmail.loading}
                auto
                light
                onClick={handleResend}
              >
                Resend ?
              </Button>
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} auto onClick={handleLogin}>
          Sign In
        </Button>
        {isCode ? (
          <Button disabled={loading} auto onClick={handleSubmit}>
            {loading ? <Loading /> : <>Submit</>}
          </Button>
        ) : (
          <Button disabled={loading} auto onClick={() => resultResendEmail.setLetCall(true)}>
            {loading ? <Loading /> : <>Send</>}
          </Button>
        )}
      </Modal.Footer>
    </>
  )
}
