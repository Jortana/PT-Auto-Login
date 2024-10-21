import type { SiteConfig } from '.'

export async function runCookieTasks(
  taskConfigs: (SiteConfig & { delay: number })[],
) {
  const tasks = taskConfigs.map((taskConfig) => {
    return async () => {
      const { name, url, cookies, delay } = taskConfig
      console.log(`[LOGIN] Start login task for ${name} in ${delay / 1000}s.`)
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
}

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
