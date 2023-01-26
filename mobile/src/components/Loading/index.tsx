import { ActivityIndicator, View } from 'react-native'

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#09090A',
      }}
    >
      <ActivityIndicator color="#7c3aed" size={64} />
    </View>
  )
}

export { Loading }
