import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostGallery } from '../components/postType'
import "../utils/normalize.css"
import "../utils/css/screen.css"

const LifeBlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const lifePosts = posts.filter(node => node.node.frontmatter.type === 'life')

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`zoeaeen13`, `life`]}
      />
      <div className="life-post-feed">
        {/* <LifeBio /> */}
        <div className="life-post-wrap">
          {lifePosts && (
            lifePosts.map((post, index) => {
              return (
                <PostGallery
                  key={index}
                  node={post.node}
                />
              )
            })
          )}
        </div>
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
            date(formatString: "MMM DD, YYYY")
            title
            type
            category
            tags
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
      <LifeBlogIndex props data={data} {...props} />
    )}
  />
)
