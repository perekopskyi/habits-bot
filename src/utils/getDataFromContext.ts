import { Context } from 'grammy'

export const getContextData = (ctx: Context) => {
  const callbackQuery = ctx.update.callback_query

  if (callbackQuery) {
    return {
      userId: callbackQuery && callbackQuery.from.id,
    }
  }

  const message =
    ctx.message && ctx.message.text && ctx.message.text.toLowerCase()

  const chatId = ctx.msg?.chat.id
  const isPublicChat = chatId && chatId < 0

  return {
    chatId,
    isPublicChat,
    message,
    userId: ctx.message && ctx.message.from.id,
  }
}
