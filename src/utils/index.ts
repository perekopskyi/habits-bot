import i18next from 'i18next'
import { Context } from 'grammy'
import { Answer } from './constants'
import { RecordModel } from '../database/models'
import { writeDataToDb } from '../database/firebase'
import { getContextData } from './getDataFromContext'
import { formatDate } from './dates'

export { formatDate }

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
  (ctx.callbackQuery && ctx.callbackQuery.data) || 'Дивна відповідь'

const createRecord = (ctx: Context, dateInput: string | undefined) => {
  const data = getCallbackData(ctx)

  const date = dateInput ? dateInput : formatDate(new Date())

  const answer = data === Answer.NO ? false : true
  // Create a record body
  const record: RecordModel = {
    answer,
    date,
  }
  return record
}

export const createAnswer = async (
  ctx: Context,
  dateInput?: string | undefined
) => {
  const { userId } = getContextData(ctx)
  const record = createRecord(ctx, dateInput)

  // Save to DB
  await writeDataToDb(userId as number, record)
  return createMessage(record)
}

const createMessage = (record: RecordModel): string => `Запис створено: 
${record.date} - ${record.answer ? 'Так, пив' : 'Ні, не пив'}`

export const getAllWords = (key: string): string => {
  const languages = Object.keys(i18next.store.data)
  return languages
    .map((lang: string) =>
      (i18next.store.data[lang] as any).translation[key].join('|')
    )
    .join('|')
}
