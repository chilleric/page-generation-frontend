import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken, getListEditAble, lostOddProps } from '@/lib'
import { addNewUser } from '@/services'
import { UserRequest, UserRequestFailure, UserResponseSuccess } from '@/types'
import { Button, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { DefaultUser, initUserRequest, UserForm } from '../inventory'

export const UserCreate = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])
  const router = useRouter()

  const [UserState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const createResult = useApiCall<UserRequest, UserRequestFailure>({
    callApi: () =>
      addNewUser({
        user: lostOddProps<UserRequest>(initUserRequest, UserState),
        token: generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
      }),
  })

  const onchangeUserState = (newUpdate: Partial<UserResponseSuccess>) => {
    const newUserState = { ...UserState }
    setUserState({ ...newUserState, ...newUpdate })
  }

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <Text h2 showIn="sm">
        Create User
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text h1 hideIn="sm">
          Create User
        </Text>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button
            color="success"
            onClick={() => {
              createResult.setLetCall(true)
            }}
            disabled={createResult.loading}
            size="sm"
          >
            {createResult.loading ? <Loading /> : <>Save</>}
          </Button>
          <Button
            color="warning"
            onClick={() => {
              router.push('/user/management')
            }}
            disabled={createResult.loading}
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
      <div style={{ paddingTop: 40 }}>
        <UserForm
          user={UserState}
          onchangeUserState={onchangeUserState}
          errorState={createResult.error?.result}
          editAble={getListEditAble(initUserRequest)}
        />
      </div>
    </div>
  )
}
