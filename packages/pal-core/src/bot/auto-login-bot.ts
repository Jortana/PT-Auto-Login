import { log } from '~lib/logger'
import { loadSite } from '~lib/load'
import { Site } from '~interface/site'
import chalk from 'chalk'

export class AutoLoginBot {
  public log: typeof log
  private sites: Site[]

  constructor() {
    this.log = log
    this.sites = []
  }

  async initialize() {
    const sites = await loadSite()
    if (!sites.length) {
      this.log.error('CONFIG ERROR', `Please complete the config file at ${process.env.SITE_CONFIG_PATH}`)
      process.exit(1)
    }
    // 每个子任务加一个随机 0 - 5min 的延迟
    this.sites = sites.map((site) => {
      const delayMillis = Math.floor(Math.random() * 300000)
      return { ...site, delay: delayMillis }
    })
  }

  autoLogin() {
    // 开始本次任务
    this.log('START', 'Start login tasks.')

    let operateNum = 0
    this.sites.forEach((site) => {
      this.log('LOGIN PREPARE', `${chalk.underline(site.name)} login in ${site.delay}ms.`)
      setTimeout(async () => {
        const res = await fetch(site.url, {
          headers: {
            Cookie: site.cookies
          }
        })
        if (res.status === 200) {
          this.log.success('LOGIN SUCCESS', `${chalk.underline(site.name)} login success.`)
        } else {
          this.log.error('LOGIN FAIL', `${chalk.underline(site.name)} login fail.`)
        }

        operateNum += 1
        if (operateNum === this.sites.length) {
          this.log('COMPLETE', 'Tasks completed.')
        }
      }, site.delay)
    })

  }
}