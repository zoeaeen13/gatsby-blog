import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoryBanner from "../components/categoryBanner"
import { getArchiveList } from "../utils/utills"
import ArchiveSection from '../components/archiveSection'

class CategoryPageTemplate extends React.Component {
  render() {
    const category = this.props.pageContext.category
    const posts = this.props.data.allMarkdownRemark.edges
    const siteTitle = this.props.data.site.siteMetadata.title
    const archiveList = getArchiveList(posts)
    console.log('category___archive______', archiveList)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={`${category}`}
          keywords={[`${category}`, `blog`]}
        />
        <header className="category-page-head">
          <h1>{category}</h1>
          <CategoryBanner category={category}/>
        </header>
        <div className="archive-wrapper">
          {archiveList.map(archive => {
            return <ArchiveSection type="card" year={archive.year} list={archive.posts}/>
          })}
        </div>
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
