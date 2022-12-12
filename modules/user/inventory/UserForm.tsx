import { DatePicker, SelectCustom } from '@/components'
import { useResponsive } from '@/hooks'
import { GenderList } from '@/lib'
import { UserDetailFailure, UserResponseSuccess } from '@/types'
import { Card, Input, Text } from '@nextui-org/react'
import { inputStylesUser } from './User.inventory'

interface IUserForm {
  user: UserResponseSuccess
  onchangeUserState: Function
  errorState?: Partial<UserDetailFailure>
  editAble?: Partial<Record<keyof UserResponseSuccess, boolean>>
}

export const UserForm = ({ user, onchangeUserState, errorState, editAble }: IUserForm) => {
  const breakPoint = useResponsive()

  const genderList = GenderList()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Card css={{ $$cardColor: user.verified ? '$colors$success' : '$colors$primary' }}>
          <Card.Body>
            <Text>VERIFY</Text>
          </Card.Body>
        </Card>
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.created}
          label="Create"
          readOnly={!editAble?.created}
          {...inputStylesUser({
            error: errorState?.created && errorState.created,
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.modified}
          label="Modified"
          readOnly={!editAble?.modified}
          {...inputStylesUser({
            error: errorState?.modified && errorState.modified,
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.username}
          label="username"
          readOnly={!editAble?.username}
          onChange={(event) => {
            onchangeUserState({
              username: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({
            error: errorState?.username && errorState.username,
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.address}
          label="Address"
          readOnly={!editAble?.address}
          onChange={(event) => {
            onchangeUserState({
              address: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.address && errorState.address })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.firstName}
          label="firstName"
          readOnly={!editAble?.firstName}
          onChange={(event) => {
            onchangeUserState({
              firstName: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({
            error: errorState?.firstName && errorState.firstName,
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.lastName}
          label="lastName"
          readOnly={!editAble?.lastName}
          onChange={(event) => {
            onchangeUserState({
              lastName: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.lastName && errorState.lastName })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <DatePicker
          value={user.dob}
          label="dob"
          onChange={(event: string) => {
            onchangeUserState({
              dob: event,
            })
          }}
          buttonProps={inputStylesUser({
            error: errorState?.dob && errorState.dob,
          })}
          disable={!editAble?.dob}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <SelectCustom<number>
          value={user.gender}
          onChange={(value) => {
            onchangeUserState({
              gender: value,
            })
          }}
          label="gender"
          disabled={!editAble?.gender}
          options={genderList}
          buttonProps={{
            ...inputStylesUser({
              error: errorState?.gender && errorState.gender,
            }),
            width: '100%',
          }}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.phone}
          label="phone"
          readOnly={!editAble?.phone}
          onChange={(event) => {
            onchangeUserState({
              phone: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.phone && errorState.phone })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.email}
          label="email"
          readOnly={!editAble?.email}
          onChange={(event) => {
            onchangeUserState({
              email: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.email && errorState.email })}
        />
      </div>
    </div>
  )
}
