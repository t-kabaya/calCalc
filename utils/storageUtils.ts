import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'

export const db = new Storage({ storageBackend: AsyncStorage })
