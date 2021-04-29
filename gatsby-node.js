const path = require(`path`)
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagPage = path.resolve(`./src/templates/tag-page.js`)
  const categoryPage = path.resolve(`./src/templates/category-page.js`)
  
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                date
                category
                mark
                description
                log
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    const postsByTags = {}
    const categorySet = new Set()

    posts.forEach((post, index) => {
      // Get tags for tags pages.
      if (post.node.frontmatter.tags) {
        post.node.frontmatter.tags.forEach(tag => {
          if (!postsByTags[tag]) {
            postsByTags[tag] = []
          }
          postsByTags[tag].push(post.node)
        });
      }

      // Get categories for categories pages.
      if (post.node.frontmatter.category) {
        categorySet.add(post.node.frontmatter.category)
      }

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous: index === posts.length - 1 ? null : posts[index + 1].node,
          next: index === 0 ? null : posts[index - 1].node,
        },
      })
    })

    // Create tags pages.
    const tags = Object.keys(postsByTags)
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagPage,
        context: {
          tag,
          tags: tags.sort()
        }
      })
    })

    // Create categories pages.
    categorySet.forEach(category => {
      createPage({
        path: `/category/${_.kebabCase(category)}/`,
        component: categoryPage,
        context: {
          category
        }
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
