import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArchiveSection from '../components/archiveSection'
import { getArchiveList } from '../utils/utills'
// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const nodes = data.allMarkdownRemark.edges
  const archiveList = getArchiveList(nodes.filter(node => node.node.frontmatter.type !== 'life'))

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Archive"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      {/* <header className="archive-page-head">
        <h1>Archive</h1>
      </header> */}
      <div className="archive-wrapper">
        {archiveList.map((archive, index) => {
          return <ArchiveSection key={index} year={archive.year} posts={archive.posts}/>
        })}
      </div>
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
