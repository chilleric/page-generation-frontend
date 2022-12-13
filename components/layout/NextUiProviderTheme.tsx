import { useGetDarkMode } from '@/hooks'
import { DarkTheme, LightTheme } from '@/styles/themes'
import { NextUIProvider } from '@nextui-org/react'
import { BackDropModal } from '../modals'

export const NextUiProviderTheme = ({ children }: { children: React.ReactNode }) => {
  const isDark = useGetDarkMode()

  return (
    <NextUIProvider theme={isDark ? DarkTheme : LightTheme}>
      {children} <BackDropModal />
    </NextUIProvider>
  )
}
