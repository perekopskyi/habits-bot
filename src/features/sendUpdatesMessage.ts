import { bot } from '../botInstance'
import { getChats } from '../database/firebase'

const VERSION = '1.0.8'
const UPDATES = `
В цьому оновленні:
- Додано кнопку "📊 Моя статистика" для перегляду статисктики тижня
- Додано кнопку "🍻 Пив учора" для кращого користувацького досвіду 
- Додано емоджи до повідомлень і кнопок для кращого інтерактиву (щоб навіть дітлахам заходілося користуватись 😅)
- Додані повідомлення про оновлення`

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
