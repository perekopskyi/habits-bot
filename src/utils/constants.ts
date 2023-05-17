export enum Answer {
  YES = '/new_record/yes',
  NO = '/new_record/nope',
}

export const START_MENU_MESSAGE: string =
  'Здоров, Пивозавр! \nЗараз: ' + new Date().toLocaleString('UA-ua')


export const BUTTONS = {
  NOPE: {
    title: 'Ні',
    value: 'nope',
  },
  YES: {
    title: 'Так',
    value: 'yes',
  },
  NEW_RECORD: {
    title: 'Новий запис',
    value: 'new_record',
  },
  CHOOSE_DAY: {
    title: 'Вибрати інший день',
    value: 'choose_day'    
  }
}

export const NEW_RECORD_ADDED = 'Новий запис створено'
