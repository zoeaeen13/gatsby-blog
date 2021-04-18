import React from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { graphql } from "gatsby"
import { kebabCase } from 'lodash'
import 'gatsby-remark-vscode/styles.css';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import { DiscussionEmbed } from "disqus-react"

const CommentWrapper = styled.div`
margin: 10vh 0;
padding: 20px;
background: #F6F6F6;
`

const BlogPostTemplate = (props) => {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  const tags = post.frontmatter.tags
console.log('post', post)
  const disqusConfig = {
    shortname: 'gatsby-zoeaeen13',
    config: { identifier: props.uri, title: post.frontmatter.title},
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <article
        className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
      >
        <header className="post-content-header">
          <h1 className="post-content-title">{post.frontmatter.title}</h1>
          <div>
            <h5 className="post-content-date">{post.frontmatter.date}</h5>
            <Link to={`/category/${kebabCase(post.frontmatter.category)}`} className="post-content-category">{post.frontmatter.category}</Link>
          </div>
        </header>
        {/* {post.frontmatter.thumbnail && (
          <div className="post-content-image">
            <Img
              className="kg-image"
              fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
              alt={post.frontmatter.title}
            />
          </div>
        )} */}
        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <footer className="post-content-footer">
          {tags.map((tag, index) => <Tag key={index} to={`/tags/${kebabCase(tag)}`} >{tag}</Tag>)}
          <CommentWrapper>
            <DiscussionEmbed {...disqusConfig} />
          </CommentWrapper>
        </footer>
      </article>
    </Layout>
  )

}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      tableOfContents(
        maxDepth: 6
      )
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
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
`
