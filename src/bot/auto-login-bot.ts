import { log } from '~lib/logger'
import { loadSite } from '~lib/load'
import { Site } from '~interface/site'

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
      this.log.error('CONFIG ERROR', `Please complete the config file at ${process.env.ACCOUNT_CONFIG_PATH}`)
    }
    this.sites = sites
  }

  autoLogin() {
    this.sites.forEach(async (site) => {
      const res = await fetch(site.url, {
        headers: {
          Cookie: site.cookies
        }
      })
      if (res.status === 200) {
        this.log('LOGIN SUCCESS', `The site ${site.name} has signed up successfully!`)
      }
    })
  }
}