import { Context } from 'grammy'
import { Chat } from 'grammy/types'
import { postChatV2 } from '../../database/firebase'
import { getRecords } from '../../database/firebase'
import { generateMessage } from './generateMessage'
import { getStatsWithEmojis } from './getStatsWithEmojis'

export const getStats = async (ctx: Context) => {
  ctx.reply(`Якщо вірити даним, які надавали всі учасники, то:`)
  // Save user in DB if not existed
  const user = ctx.msg?.chat
  await postChatV2(user)

  // Get All Public Chats
  const records = await getRecords()

  const recordsKeys = Object.keys(records).map((key: string): number =>
    Number(key)
  )

  recordsKeys.forEach(async (accountId: number) => {
    try {
      const { first_name = '', last_name = '' } = (await ctx.api.getChat(
        accountId
      )) as Chat.PrivateChat
      const fullName = `${first_name} ${last_name}`
      const statsData = getStatsWithEmojis(records[accountId])
      const message = generateMessage(fullName, statsData)
      ctx.reply(message)
    } catch (error) {
      ctx.reply('Дивний аккаунт')
      console.error(error)
    }
  })
}
