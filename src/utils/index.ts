import i18next from 'i18next'
import { Context } from 'grammy'
import { Answer } from './constants'
import { RecordModel } from '../database/models'
import { writeDataToDb } from '../database/firebase'
import { getContextData } from './getDataFromContext'

export const checkIsNewChat = (ctx: Context): boolean => {
  const newInChat = (ctx.update.message as any)?.new_chat_member?.id
  const me = ctx.me.id
  return newInChat === me
}

export const checkIsLeftFromChat = (ctx: Context): boolean => {
  const leftFromChat = (ctx.update.message as any)?.left_chat_member?.id
  const me = ctx.me.id
  return leftFromChat === me
}

const getCallbackData = (ctx: Context): string =>
  ctx.update.callback_query.data || 'Дивна відповідь'

export const createAnswer = async (ctx: Context) => {
  const data = getCallbackData(ctx)

  const { userId } = getContextData(ctx)
  const date = formatDate(new Date())

  const answer = data === Answer.NO ? false : true
  // Create a record body
  const record: RecordModel = {
    answer,
    date,
  }
  await writeDataToDb(userId, record)
  return createMessage(record)
}

const createMessage = (record: RecordModel): string => `Запис створено: 
${record.date} - ${record.answer ? 'Так, пив' : 'Ні, не пив'}`

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export const getAllWords = (key: string) => {
  const languages = Object.keys(i18next.store.data)
  return languages
    .map(lang => i18next.store.data[lang].translation[key].join('|'))
    .join('|')
}
