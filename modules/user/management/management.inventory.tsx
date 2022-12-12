import { convertValueToLabel, GenderList, StatusList, StatusListBoolean } from '@/lib'
import { ActionType, HeaderTableType } from '@/types'
import { NextRouter } from 'next/router'

export const HeaderUserTable = () => {
  return [
    {
      key: 'actions',
      name: '',
    },
    {
      key: 'gender',
      name: 'gender',
    },
    {
      key: 'dob',
      name: 'dob',
    },
    {
      key: 'firstName',
      name: 'firstName',
    },
    {
      key: 'email',
      name: 'email',
    },
    {
      key: 'phone',
      name: 'phone',
    },
    {
      key: 'created',
      name: 'created',
    },
    {
      key: 'verified',
      name: 'verified',
    },
    {
      key: 'deleted',
      name: 'deleted',
    },
  ] as HeaderTableType[]
}

export const ListActions = () => {
  return [
    {
      content: 'detail',
      icon: <>detail</>,
      func: (id: string, router: NextRouter) => {
        router.push(`/user/${id}`)
      },
    },
  ] as ActionType[]
}

export const listFunctionParseValue = () => {
  const statusList = StatusList()

  const genderList = GenderList()

  const statusListBoolean = StatusListBoolean()

  return {
    gender: (value: number) => {
      return convertValueToLabel(value, genderList)
    },
    verified: (value: boolean) => {
      return convertValueToLabel(value, statusListBoolean)
    },
    deleted: (value: number) => {
      return convertValueToLabel(value, statusList)
    },
  }
}
