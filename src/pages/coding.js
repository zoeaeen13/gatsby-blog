import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CodingBio } from '../components/bio'
import { PostIntro } from '../components/postType'
import "../utils/normalize.css"
import "../utils/css/screen.css"

const CodingBlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const codingPosts = posts.filter(node => node.node.frontmatter.type === 'coding')

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`zoeaeen13`, `lidemy`, `javascript`, `react`]}
      />
      <div className="coding-post-feed">
        <CodingBio />
        {codingPosts && (
          codingPosts.map((post, index) => {
            return (
              <PostIntro
                sub={'category'}
                key={index}
                node={post.node}
              />
            )
          })
        )
        }
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
            description
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
      <CodingBlogIndex props data={data} {...props} />
    )}
  />
)
