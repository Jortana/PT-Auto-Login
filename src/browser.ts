import puppeteer, { type Browser } from '@cloudflare/puppeteer'

let browserInstance: Browser | null = null

export async function getBrowser(env: Env): Promise<Browser> {
  if (!env.PAL_BROWSER) {
    throw new Error('Browser binding not available.')
  }

  if (!browserInstance) {
    browserInstance = await puppeteer.launch(env.PAL_BROWSER)
  }
  return browserInstance
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close()
    browserInstance = null
  }
}
