export enum Answer {
  YES = '/new_record/yes',
  NO = '/new_record/nope',
}

const getCurrentDateTime = () =>
  new Date()
    .toLocaleString('uk-UA', {
      timeZone: 'Europe/Kiev',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(',', '')

export const getStartMessage = (): string =>
  '👋 Здоров, Пивозавр! \n🕰Зараз: ' + getCurrentDateTime()

export const BUTTONS = {
  STATS: {
    title: '📊 Моя статистика',
    value: 'my_statistic',
  },
  NOPE: {
    title: '😕 Ні',
    value: 'nope',
  },
  YES: {
    title: '🍺 Так',
    value: 'yes',
  },
  DRINK_YESTERDAY: {
    title: '🍻 Пив учора',
    value: 'drink_yesterday',
  },
  NEW_RECORD: {
    title: '📝 Новий запис',
    value: 'new_record',
  },
  CHOOSE_DAY: {
    title: '🗓 Вибрати інший день',
    value: 'choose_day',
  },
}

export const NEW_RECORD_ADDED = '🧾 Новий запис створено'
export const BETTER_TO_PRIVATE_CHAT = 'Краще напиши у приватні повідомлення'
