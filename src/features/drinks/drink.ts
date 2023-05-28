import { Context } from 'grammy'
import { MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { NEW_RECORD_ADDED, getStartMessage } from '../../utils/constants'
import { secondMenu } from './secondMenu'
import { store } from '../../utils/store'
import { BUTTONS } from '../../utils/constants'

export const startMenuText = (ctx: Context) => {
  // TODO Check if it's first touch

  if (!ctx.callbackQuery) return getStartMessage()

  const data = ctx.callbackQuery.data
  switch (data) {
    case '/new_record/yes':
      return store.message || NEW_RECORD_ADDED
    case '/new_record/nope':
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
