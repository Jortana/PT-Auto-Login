import { runCookieTasks } from './task'
import { closeBrowser } from './browser'

export type SiteConfig = {
  name: string
  url: string
  cookies: string
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    try {
      const siteConfigs = await env.PAL.get<SiteConfig[]>('config', 'json')
      if (!siteConfigs) {
        return new Response('No config found', { status: 404 })
      }

      await autoLogin(siteConfigs, env)

      return new Response('Login tasks completed.', { status: 200 })
    } catch (error) {
      return new Response(
        error instanceof Error ? error.message : JSON.stringify(error),
        { status: 500 },
      )
    }
  },
  async scheduled(event, env, ctx) {
    try {
      const siteConfigs = await env.PAL.get<SiteConfig[]>('config', 'json')
      if (!siteConfigs) {
        throw new Error('No config found')
      }
      await autoLogin(siteConfigs, env)
    } catch (error) {
      console.error(error)
    }
  },
} satisfies ExportedHandler<Env>

async function autoLogin(siteConfigs: SiteConfig[], env: Env) {
  const taskConfigs = siteConfigs.map((siteConfig) => {
    // const delayMillis = Math.floor(Math.random() * 300000)
    // const delayMillis = Math.floor(Math.random() * 60000)
    const delayMillis = Math.floor(Math.random() * 100)
    return { ...siteConfig, delay: delayMillis }
  })

  console.log('[START] Start login tasks.')

  try {
    await runCookieTasks(taskConfigs, env)
  } finally {
    await closeBrowser()
  }

  console.log('[COMPLETE] Tasks completed.')
}
