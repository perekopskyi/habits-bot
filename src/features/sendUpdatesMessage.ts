import { bot } from '../botInstance'
import { getChats } from '../database/firebase'
import { formatDate } from '../utils'

const VERSION = '1.1.0'
const UPDATES = `
В цьому оновленні:
🔹 Виправлено логіку з нагадуваннями: Тепер щоденні нагадування будуть приходити тільки у приватні повідомлення, та було додано одне щотижневе нагадування для групп пивозаврів

`
export const sendUpdatesMessage = async () => {
  console.log('sendUpdatesMessage:', new Date().toUTCString())

  try {
    const uniqueChatIds = await getChats()

    for (const chatId of uniqueChatIds) {
      const isDirectChat = chatId > 0
      const message = `Зустрічай${isDirectChat ? 'те' : ''} #оновлення!

Версія: ${VERSION} (${formatDate(new Date())})
${UPDATES}`
      // Case for direct chat
      bot.api.sendMessage(chatId, message)
    }
  } catch (error) {
    console.log('sendReminder error:', error)
  }
}
