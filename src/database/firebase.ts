// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, push, ref, update } from 'firebase/database'
import { ChatModel, RecordModel } from './models'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
}

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(firebase)

const db = getDatabase(firebase)
const dbRef = ref(db)

export const writeDataToDb = async (userId: number, record: RecordModel) => {
  // Check if record exists
  const response = await get(child(dbRef, `/records/${userId}`))
  const userRecords = response.exists() && response.val()
  const existsRecord =
    userRecords &&
    Object.values(userRecords).find(
      ({ answer, date }: any) => date === record.date
    )

  // Write the data
  const updates: any = {
    [`/records/${userId}/${existsRecord ? existsRecord.date : record.date}`]:
      record.answer,
  }
  return update(dbRef, updates)
}

export const postChat = async (chat: ChatModel) => {
  // TODO use some store
  // Get all chats from DB
  const snapshot = await get(child(dbRef, `chats`))
  const allChats = snapshot.exists() ? snapshot.val() : []

  const uniqueChatIds: number[] = Array.from(new Set(allChats))

  const hasAlreadyExistedChat = uniqueChatIds.some(id => id === chat.chatId)
  const updatedChats = hasAlreadyExistedChat
    ? uniqueChatIds
    : [...uniqueChatIds, chat.chatId]
  return update(dbRef, { '/chats': updatedChats })
}

// UserID equal to Personal Chat ID
export const postChatV2 = async (user: any) => {
  const snapshot = await get(child(dbRef, `users`))
  const allUsers = snapshot.exists() && snapshot.val()

  if (!allUsers) return update(dbRef, { '/users': { [user.id]: user } })

  const hasAlreadyExistedUser = Object.keys(allUsers).some(
    (id: string) => Number(id) === user.id
  )

  if (hasAlreadyExistedUser) return // Do nothing

  const updatedUsers = {
    ...allUsers,
    [user.id]: user,
  }

  return update(dbRef, { '/users': updatedUsers })
}

export const removeChat = async (chat: ChatModel) => {
  const snapshot = await get(child(dbRef, `chats`))
  const updates: ChatModel[] = snapshot.exists()
    ? snapshot.val().filter((item: ChatModel) => item.chatId !== chat.chatId)
    : []
  return update(dbRef, { '/chats': updates })
}

const getDBData = async (key: string) => {
  try {
    const snapshot = await get(child(dbRef, key))

    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log('No data available')
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

export const getChats = () => getDBData('chats')
export const getRecords = () => getDBData('records')
export const getUsers = () => getDBData('users')

// For backups
export const getAllDBData = async () => {
  try {
    const snapshot = await get(ref(db, '/'))
    return snapshot.exists() ? snapshot.val() : null
  } catch (error) {
    console.log('getAllDBData:', error)
  }
}
