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
    this.sites = sites
  }

  autoLogin() {
    this.log('START', 'Start login tasks')
    this.sites.forEach(async (site) => {
      const res = await fetch(site.url, {
        headers: {
          Cookie: site.cookies
        }
      })
      if (res.status === 200) {
        this.log.success('LOGIN SUCCESS', `${chalk.underline(site.name)} login success.`)
      }
    })
  }
}