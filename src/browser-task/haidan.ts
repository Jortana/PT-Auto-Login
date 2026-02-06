import type { TaskConfig } from '../type'
import type { BrowserContext } from '@cloudflare/puppeteer'

export default async function haidanTask(
  taskConfig: TaskConfig,
  ctx: BrowserContext,
) {
  const { name, url, cookies } = taskConfig
  console.log(`[BROWSER TASK] Start browser task for ${name}`)
  const page = await ctx.newPage()
  try {
    // 设置 cookies
    const cookieArray = cookies.split('; ').map((cookie) => {
      const [name, value] = cookie.split('=')
      return { name, value, domain: new URL(url).hostname }
    })
    await page.setCookie(...cookieArray)

    // 访问页面
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.waitForSelector('input#modalBtn', { visible: true })
    await page.click('input#modalBtn')

    console.log(`[BROWSER TASK SUCCESS] ${name} browser task success.`)
  } catch (error) {
    console.error(`[BROWSER TASK FAILED] ${name} browser task failed:`, error)
  } finally {
    await page.close()
  }
}
