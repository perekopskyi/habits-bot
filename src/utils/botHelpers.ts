import { Context } from 'grammy'
import { bot } from '../botInstance'

export const removePrevMessage = (ctx: Context) => {
  if (!ctx.callbackQuery) return

  // Remove prev. message
  const chatId = ctx.callbackQuery.message && ctx.callbackQuery.message.chat.id
  const messageId =
    ctx.callbackQuery.message && ctx.callbackQuery.message.message_id
  if (chatId && messageId) bot.api.deleteMessage(chatId, messageId)
}
