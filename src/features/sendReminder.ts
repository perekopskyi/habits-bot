import { bot } from '../botInstance'
import { getChats } from '../database/firebase'

export const sendReminder = async () => {
  console.log('sendedReminder:', new Date().toUTCString())

  const directButton = { text: 'Поїхали!', callback_data: 'new_record' }
  const chatButton = { ...directButton, url: 'https://t.me/PivozavrThe_bot' }

  try {
    const uniqueChatIds = await getChats()

    for (const chatId of uniqueChatIds) {
      const isDirectChat = chatId > 0
      const greeting = !isDirectChat ? 'Здоров, пивозаври!' : 'Здоров!'

      // Case for direct chat
      bot.api.sendMessage(
        chatId,
        `${greeting} 
Нагадування внести данні`,
        {
          reply_markup: {
            inline_keyboard: [[isDirectChat ? directButton : chatButton]],
          },
        }
      )
    }
  } catch (error) {
    console.log('sendReminder error:', error)
  }
}
