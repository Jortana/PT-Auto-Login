import path from 'path'
import { readFile } from 'fs/promises'
import { Site } from '~/interface/site'

export async function loadSite(): Promise<Omit<Site, 'delay'>[]> {
  try {
    const projectRoot = process.cwd()
    const siteConfigFile = path.join(projectRoot, './config/site.json')
    const sitesContent = await readFile(siteConfigFile, 'utf-8')
    const sites = JSON.parse(sitesContent)
    return sites
  } catch (error) {
    throw new Error(error as string)
  }
}