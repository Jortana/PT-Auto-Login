import { AutoLoginBot } from '~/bot/auto-login-bot'
import schedule from 'node-schedule'

const bot = new AutoLoginBot()
bot.initialize().then(() => {
  schedule.scheduleJob('0 0 0 * * ?', () => {
    // schedule.scheduleJob('* * * * * ?', () => {
    // console.log('hello')
    bot.autoLogin()
  })
})