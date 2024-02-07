import path from 'path'
import { readFile } from 'fs/promises'
import { Site } from '~/interface/site'

export async function loadSite(): Promise<Site[]> {
  const siteConfigPath = process.env.SITE_CONFIG_PATH
  if (!siteConfigPath) {
    return []
  }

  try {
    const siteConfigFile = path.join(__dirname, '../../', siteConfigPath)
    const sitesContent = await readFile(siteConfigFile, 'utf-8')
    const sites = JSON.parse(sitesContent)
    return sites
  } catch (error) {
    throw new Error(error as string)
  }
}