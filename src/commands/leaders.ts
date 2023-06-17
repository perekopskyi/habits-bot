import { Context } from 'grammy'
import { bot } from '../botInstance'
import { TopLeaders } from '../features/stats/topLiders'

bot.command('leaders', async (ctx: Context) => {
  console.log('/leaders:', new Date().toUTCString())

  try {
    const leaders = new TopLeaders()
    const message = await leaders.sendMessage()
    ctx.reply(message)
  } catch (error) {
    console.log('sendReminder error:', error)
  }
})
