import { NavBarItemType } from '@/types'

export const NavBarItems: NavBarItemType[] = [
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'User',
    path: '/user',
    children: [
      { label: 'User Management', path: '/user/management' },
      { label: 'Create User', path: '/user/create' },
    ],
  },
  {
    label: 'Inventory',
    path: '/inventory',
    children: [
      { label: 'Inventory Management', path: '/inventory/management' },
      { label: 'Create Inventory', path: '/inventory/create' },
    ],
  },
]
