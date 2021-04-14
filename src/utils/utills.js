export function getArchiveList(nodes) {
  const yearList = new Set()
  nodes.forEach((post) => {
    const year = post.node.frontmatter.date.split(', ')[1]
    yearList.add(year)
  })

  const archiveList = []
  yearList.forEach((year) => {
    const posts = nodes.filter(post => post.node.frontmatter.date.split(', ')[1] === year)
    archiveList.push({ year, posts })
  })

  return archiveList
}