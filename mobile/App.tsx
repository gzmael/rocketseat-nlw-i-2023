import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter'
import { QueryClientProvider, focusManager } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import './src/lib/dayjs'
import { AppStateStatus, Platform } from 'react-native'

import { Loading } from './src/components/Loading'
import { useAppState } from './src/hooks/useAppState'
import { useOnlineManager } from './src/hooks/useOnlineManager'
import { queryClient } from './src/lib/query'
import { Routes } from './src/routes'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  })

  useEffect(() => {
    async function loadFontAsync() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }

    loadFontAsync()
  }, [fontsLoaded])

  useOnlineManager()
  useAppState(onAppStateChange)

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <StatusBar backgroundColor="transparent" style="light" translucent />
    </QueryClientProvider>
  )
}
