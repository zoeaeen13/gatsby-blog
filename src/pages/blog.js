import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostCard } from '../components/postType'
import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const blogs = posts.filter(node => node.node.frontmatter.type === 'blog')

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`zoeaeen13`, `blog`, `gatsby`, `react`]}
      />
      <div className="post-feed">
        <header className="all-blog-head">
          <h1>Blog</h1>
        </header>
        {blogs && (
          blogs.map((post, index) => {
            return (
              <PostCard
                sub={'category'}
                key={index}
                node={post.node}
              />
            )
          })
        )}
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
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            type
            category
            tags
            mark
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
