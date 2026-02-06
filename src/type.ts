export type SiteConfig = {
  name: string
  url: string
  cookies: string
}

export type TaskConfig = SiteConfig & {
  delay: number
}
