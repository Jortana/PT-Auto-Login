type SiteConfig = {
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
        const delayMillis = Math.floor(Math.random() * 300000)
        return { ...siteConfig, delay: delayMillis }
      })

      console.log('[START] Start login tasks.')

      const tasks = taskConfigs.map((taskConfig) => {
        return async () => {
          const { name, url, cookies, delay } = taskConfig
          console.log(
            `[LOGIN] Start login task for ${name} in ${delay / 1000}s.`,
          )
          await sleep(delay)
          const response = await fetch(url, {
            headers: {
              Cookie: cookies,
            },
          })
          if (response.status === 200) {
            console.log(`[LOGIN SUCCESS] ${name} login success.`)
          } else {
            console.error(`[LOGIN FAILED] ${name} login failed.`)
          }
        }
      })

      await Promise.allSettled(tasks.map((task) => task()))

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

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
