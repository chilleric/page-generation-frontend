import { OptionsType } from '@/types'

export const GenderList = () => {
  return [
    {
      value: 0,
      label: 'male',
    },
    {
      value: 1,
      label: 'female',
    },
  ] as OptionsType<number>[]
}

export const StatusList = () => {
  return [
    {
      value: 0,
      label: 'Active',
    },
    {
      value: 1,
      label: 'Deactivated',
    },
  ] as OptionsType<number>[]
}

export const StatusListBoolean = () => {
  return [
    {
      value: true,
      label: 'Active',
    },
    {
      value: false,
      label: 'Deactivated',
    },
  ] as OptionsType<boolean>[]
}

export const AccessStatus = () => {
  return [
    {
      value: 0,
      label: 'Active',
    },
    {
      value: 1,
      label: 'eactivated',
    },
  ] as OptionsType<number>[]
}

export const formatDate = 'yyyy-MM-dd'
