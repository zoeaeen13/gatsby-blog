import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { forEach } from 'lodash'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArchiveItem from '../components/ArchiveItem'
// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const nodes = data.allMarkdownRemark.edges
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

  console.log('archiveList_____', archiveList)

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      {archiveList.map(archive => {
        return <ArchiveItem year={archive.year} list={archive.posts}/>
      })}
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            type
            tags
            category
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex props data={data} {...props} />
    )}
  />
)
