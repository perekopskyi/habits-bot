import { Context } from 'grammy'
import { checkForProfanity } from '../utils/checkWords'
import { getContextData } from '../utils/getDataFromContext'

export const profanityFilter = (ctx: Context): string | null => {
  const { message } = getContextData(ctx)
  const answer = checkForProfanity(message)
  return answer
}
