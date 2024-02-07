import { AutoLoginBot } from '~/bot/auto-login-bot'

const bot = new AutoLoginBot()
bot.initialize().then(() => {
  bot.autoLogin()
})