import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import { graphql, StaticQuery } from "gatsby"
import Bio from '../components/bio'
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostType from "../components/postType"
// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"


const AllButtons = styled(Link)`
  margin: 20px 0 32px 0;
  display: inline-block;
  padding: 10px 24px;
  color: #C5322E;
  background-color: white;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  text-align: center;
  text-transform: initial;
  white-space: nowrap;
  border: 1px solid #C5322E;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    color: white;
    background-color: #C5322E;
    text-decoration: none;
  }
`
const BlogIndex = ({ data }, location) => {
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
        <PostType type={'Featured Posts'} posts={blogs}/>
        <AllButtons>All Posts →</AllButtons>
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
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
            date(formatString: "DD MMM, YYYY")
            title
            type
            description
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
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
