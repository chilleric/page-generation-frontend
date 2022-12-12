import { AuthLayout } from '@/components/layout/AuthLayout'
import { NextUiProviderTheme } from '@/components/layout/NextUiProviderTheme'
import store from '@/redux/store'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <NextUiProviderTheme>
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        </NextUiProviderTheme>
      </CookiesProvider>
    </Provider>
  )
}

export default MyApp
