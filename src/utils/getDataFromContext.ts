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

  return {
    message,
    userId: ctx.message && ctx.message.from.id,
  }
}
