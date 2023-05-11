import { Context } from 'grammy'

export const getContextData = (ctx: Context) => {
  const callbackQuery = ctx.update.callback_query

  if (callbackQuery) {
    return {
      userId: callbackQuery.from.id,
    }
  }

  return {
    message: ctx.message.text.toLowerCase(),
    userId: ctx.message?.from.id,
  }
}
