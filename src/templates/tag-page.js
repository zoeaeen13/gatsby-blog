import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostCard } from "../components/postType"

const TagPageTemplate = ({pageContext, data, location}) => {
    const tag = pageContext.tag
    const tagList = pageContext.tags
    const posts = data.allMarkdownRemark.edges
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={`#${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
          keywords={[`${tag}`, `blog`, `gatsby`, `javascript`, `react`]}
        />
        <header className="tag-page-head">
          <h1>#{tag}({data.allMarkdownRemark.totalCount})</h1>
        </header>
        <div className="post-feed">
          {posts.map(({ node }) => {
            return (
              <PostCard
                sub={'category'}
                key={node.fields.slug}
                type={node.frontmatter.type}
                node={node}
                postClass={`post`}
              />
            )
          })}
        </div>
      </Layout>
    )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query PostByTag($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            tags
            category
            type
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
