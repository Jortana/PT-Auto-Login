const sitesRegex = [
  {
    regex: /https:\/\/hdfans\.org.*/,
    name: 'HDFans',
  },
  {
    regex: /https:\/\/pt\.btschool\.club.*/,
    name: 'BTSCHOOL',
  },
  {
    regex: /https:\/\/(www\.)?haidan\.video.*/,
    name: 'HAIDAN',
  },
]

/**
 * 根据站点的 URL 解析出站点的名称
 */
export function parseSiteName(url: string) {
  const site = sitesRegex.find((site) => site.regex.test(url))
  return site?.name
}
