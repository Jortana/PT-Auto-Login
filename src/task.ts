import { parseSiteName } from './parse-site'
import type { TaskConfig } from './type'
import { getBrowser } from './browser'
import type { BrowserContext } from '@cloudflare/puppeteer'

export async function runCookieTasks(taskConfigs: TaskConfig[], env: Env) {
  const tasks = taskConfigs.map((taskConfig) => {
    return async () => {
      const { url, name } = taskConfig
      const siteName = parseSiteName(url)

      switch (siteName) {
        case 'HDFans':
        case 'BTSCHOOL': {
          await directVisitTask(taskConfig)
          break
        }
        case 'HAIDAN': {
          const browser = await getBrowser(env)
          const ctx = await browser.createBrowserContext()
          const handler = await import('./browser-task/haidan')
          await browserTask(taskConfig, ctx, handler.default)
          break
        }
        default: {
          console.error(`[UNSUPPORTED SITE] ${siteName} is not supported.`)
          return
        }
      }
    }
  })

  await Promise.allSettled(tasks.map((task) => task()))
}

/**
 * 直接访问链接的任务
 */
async function directVisitTask(taskConfig: TaskConfig) {
  const { name, url, cookies, delay } = taskConfig
  console.log(
    `[DIRECT VISIT] Start direct visit task for ${name} in ${delay / 1000}s.`,
  )
  await sleep(delay)
  const response = await fetch(url, {
    headers: {
      Cookie: cookies,
    },
  })
  if (response.status === 200) {
    console.log(`[DIRECT VISIT SUCCESS] ${name} direct visit success.`)
  } else {
    console.error(`[DIRECT VISIT FAILED] ${name} direct visit failed.`)
  }
}

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 使用浏览器访问的任务（适合需要 JS 渲染的站点）
 */
async function browserTask(
  taskConfig: TaskConfig,
  ctx: BrowserContext,
  handler: (taskConfig: TaskConfig, ctx: BrowserContext) => Promise<void>,
) {
  const { name, delay } = taskConfig
  console.log(
    `[BROWSER TASK] Start browser task for ${name} in ${delay / 1000}s.`,
  )

  await sleep(delay)

  try {
    await handler(taskConfig, ctx)
    console.log(`[BROWSER TASK SUCCESS] ${name} browser task handler success.`)
  } catch (error) {
    console.error(
      `[BROWSER TASK FAILED] ${name} browser task handler failed:`,
      error,
    )
  }
}
