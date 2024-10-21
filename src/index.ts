import { runCookieTasks } from './task'

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

      const taskConfigs = siteConfigs.map((siteConfig) => {
        // const delayMillis = Math.floor(Math.random() * 300000)
        const delayMillis = Math.floor(Math.random() * 60000)
        return { ...siteConfig, delay: delayMillis }
      })

      console.log('[START] Start login tasks.')

      await runCookieTasks(taskConfigs)

      console.log('[COMPLETE] Tasks completed.')

      return new Response('Login tasks completed.', { status: 200 })
    } catch (error) {
      return new Response(
        error instanceof Error ? error.message : JSON.stringify(error),
        { status: 500 },
      )
    }
  },
} satisfies ExportedHandler<Env>
