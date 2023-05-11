import { bot } from '../botInstance'
import { getChats } from '../database/firebase'

export const sendReminder = async () => {
  try {
    const uniqueChatIds = await getChats()

    for (const chatId of uniqueChatIds) {
      const isDirectChat = chatId > 0
      const greeting = !isDirectChat ? 'Здоров, пивозаври!' : 'Здоров!'

      // Case for direct chat
      if (isDirectChat) {
        bot.api.sendMessage(
          chatId,
          `${greeting} 
Нагадування внести данні`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Поїхали!',
                    callback_data: 'new_record',
                  },
                ],
              ],
            },
          }
        )
      } else {
        // Отправляем сообщение с кнопками
        bot.api.sendMessage(
          chatId,
          `${greeting} 
Нагадування внести данні`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Поїхали!',
                    callback_data: 'new_record',
                    url: 'https://t.me/PivozavrThe_bot',
                  },
                ],
              ],
            },
          }
        )
      }
    }
  } catch (error) {
    console.log('sendReminder error:', error)
  }
}
