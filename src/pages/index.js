import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Bio from '../components/bio'
import Layout from "../components/layout"
import SEO from "../components/seo"
import TypeSection from "../components/typeSection"
import Button from '../components/LinkButton'
// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"



const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const blogs = posts.filter(node => node.node.frontmatter.type === 'blog')
  const diarys = posts.filter(node => node.node.frontmatter.type === 'diary')

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Bio />
      <div className="post-feed">
        <TypeSection type={'Featured Posts'} posts={blogs}/>
        <Button to="/archive">All Posts →</Button>
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
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM, YYYY")
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
