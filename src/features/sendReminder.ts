import { bot } from '../botInstance'
import { getChats, getUsers } from '../database/firebase'
import { createFullName } from '../utils'

const directButton = { text: 'Поїхали!', callback_data: 'new_record' }
const chatButton = { ...directButton, url: 'https://t.me/PivozavrThe_bot' }

type Button = {
  text: string
  callback_data: string
  url?: string
}

const sendMessage = (chatId: number, message: string, button: Button) => {
  bot.api.sendMessage(chatId, message, {
    reply_markup: {
      inline_keyboard: [[button]],
    },
  })
}

// Only for groups
export const sendWeeklyReminder = async () => {
  console.log('sendedWeeklyReminder:', new Date().toUTCString())

  try {
    const uniqueChatIds = await getChats()

    for (let chatId of uniqueChatIds) {
      const isGroupChat = chatId < 0
      if (isGroupChat) {
        const message = `Здоров, пивозаври!
Усі внесли данні за попередній тиждень? Даю шанс`

        sendMessage(chatId, message, chatButton)
      }
    }
  } catch (error) {
    console.log('sendWeeklyReminder error:', error)
  }
}

// Only for directs
export const sendReminder = async () => {
  console.log('sendedReminder:', new Date().toUTCString())

  try {
    const uniqueChatIds = await getChats()
    const users = await getUsers()

    for (const chatId of uniqueChatIds) {
      const isDirectChat = chatId > 0
      if (isDirectChat) {
        const userId =
          Object.keys(users).find((id: string) => Number(id) === chatId) || ''
        const name = createFullName(users[userId])
        const message = `Здоров, ${name}!
Нагадування внести данні`

        sendMessage(chatId, message, directButton)
      }
    }
  } catch (error) {
    console.log('sendReminder error:', error)
  }
}
