import { Context } from 'grammy'
import { MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import {
  Answer,
  BUTTONS,
  NEW_RECORD_ADDED,
  getStartMessage,
} from '../../utils/constants'
import { store } from '../../utils/store'
import { secondMenu } from './secondMenu'

export const startMenuText = (ctx: Context) => {
  // TODO Check if it's first touch

  if (!ctx.callbackQuery) return getStartMessage()

  const data = ctx.callbackQuery.data

  const { NEW_RECORD, DRINK_YESTERDAY } = BUTTONS

  switch (data) {
    case Answer.YES:
      return store.message || NEW_RECORD_ADDED

    case Answer.NO:
    case `${NEW_RECORD.value}/${DRINK_YESTERDAY.value}`:
      console.log('CASE /new_record/nope')
      return store.message

    default:
      return getStartMessage()
  }
}

export const startMenu = new MenuTemplate<Context>(startMenuText)

// TODO change button if record already  exists
startMenu.submenu(
  BUTTONS.NEW_RECORD.title,
  BUTTONS.NEW_RECORD.value,
  secondMenu
)

export const menuDrinksMiddleware = new MenuMiddleware('/', startMenu)
console.log(menuDrinksMiddleware.tree())
