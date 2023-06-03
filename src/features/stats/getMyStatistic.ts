import { Context } from 'grammy'
import { Chat } from 'grammy/types'
import { getRecords, postChatV2 } from '../../database/firebase'
import { BETTER_TO_PRIVATE_CHAT } from '../../utils/constants'
import { getStatsWithEmojis } from './getStatsWithEmojis'
import { generateMessage } from './generateMessage'

export const getMyStatistic = async (ctx: Context): Promise<string> => {
  try {
    const user = ctx.msg?.chat
    if (!user || user.id < 0) {
      return BETTER_TO_PRIVATE_CHAT
    }

    const { first_name = '', last_name = '' } = user as Chat.PrivateChat
    await postChatV2(user)

    const allRecords = await getRecords()
    const usersRecords = allRecords[user.id]
    const fullName = `${first_name} ${last_name}`
    const statsData = getStatsWithEmojis(usersRecords)
    const message: string = generateMessage(fullName, statsData)
    return message
  } catch (error) {
    console.error(error)
    return 'Дивний аккаунт'
  }
}
