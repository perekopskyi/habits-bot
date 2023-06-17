import { bot } from '../botInstance'
import { getChats } from '../database/firebase'

const VERSION = '1.0.9'
const UPDATES = `
В цьому оновленні:
- Додано можливість переглянути лідерів алко-гонки (за весь час)
`

export const sendUpdatesMessage = async () => {
  console.log('sendUpdatesMessage:', new Date().toUTCString())

  try {
    const uniqueChatIds = await getChats()

    for (const chatId of uniqueChatIds) {
      const isDirectChat = chatId > 0
      const message = `Зустрічай${isDirectChat ? 'те' : ''} оновлення!

Версія: ${VERSION}
${UPDATES}`
      // Case for direct chat
      bot.api.sendMessage(chatId, message)
    }
  } catch (error) {
    console.log('sendReminder error:', error)
  }
}
