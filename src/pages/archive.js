import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { find, orderBy } from 'lodash'
import Layout from "../components/layout"
import SEO from "../components/seo"
// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  let archiveList = []
  posts.forEach((post) => {
    const year = post.node.frontmatter.date.split(', ')[1]
    if (!find(archiveList, {year})) {
      archiveList.push({year, list: [post]})
    } else {
      archiveList.forEach(archive => {
        if (archive.year !== year) return
        archive.list.push(post)
      })
    }
  })

  archiveList.forEach(archive => {
    console.log('archive', archive)
  })
  // orderBy(archiveList, ['year', 'age'], ['asc', 'desc'])

  console.log('archiveList', archiveList)

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
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
