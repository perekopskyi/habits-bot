import { Context } from 'grammy'
import { MenuTemplate, createBackMainMenuButtons } from 'grammy-inline-menu'
import { getMyStatistic } from './getMyStatistic'

export const statsMenu = new MenuTemplate<Context>(getMyStatistic)

statsMenu.manualRow(createBackMainMenuButtons())
