import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

class CategoryPageTemplate extends React.Component {
  render() {
    const props = this.props
    // const tag = this.props.pageContext.tag
    // const posts = this.props.data.allMarkdownRemark.edges
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          // title={`#${tag}`}
          // title={`#${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
          // keywords={[`${tag}`, `blog`, `gatsby`, `javascript`, `react`]}
        />
        {/* <header className="tag-page-head">
          <h1>#{tag}({props.data.allMarkdownRemark.totalCount})</h1>
        </header>
        <div className="post-feed">
          {posts.map(({ node }) => {
            return (
              <PostCard
                key={node.fields.slug}
                node={node}
                postClass={`post`}
              />
            )
          })}
        </div> */}
      </Layout>
    )
  }
}

export default CategoryPageTemplate

export const pageQuery = graphql`
  query PostByCategory($category: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $category } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
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
