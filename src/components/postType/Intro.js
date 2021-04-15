import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import { kebabCase } from 'lodash'

const IntroWrapper = styled.div`
  padding: 20px;

  @media (max-width: 850px) {
    padding: 20px 0;
  }

  hr {
    margin: 0;
    padding: 0;
    width: 10px;
    height: 1px;
    background: #9a9a9a;
  }
`

const PostDetail = styled.div`
  display: flex;
  margin: 10px 0;

  p, a {
    margin: 0;
    padding: 0;
    margin-right: 10px;
    color: #9e9e9e;
    font-size: 13px;
    font-weight: 500;
  }

  a {
    font-weight: bold;
    text-decoration: none;
  }
`

const PostLink = styled(Link)`
  margin-bottom: .25rem;
  font-size: 1.9rem;
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: .48px;

  color: #666666;
  text-decoration: none;
  outline: none;
  transition: all .3s ease;

  &:hover {
    color: #C5322E;
    text-decoration: none;
  }
`

const PostDesc = styled.p`
  font-size: 16px;
  overflow:hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

`

const PostIntro = ({ node }) => {
  return (
    <IntroWrapper>
      <PostLink to={node.fields.slug}>{node.frontmatter.title}</PostLink>
      <PostDetail>
        <p>{node.frontmatter.date}</p>
        <Link to={`/category/${kebabCase(node.frontmatter.category)}`}>{node.frontmatter.category}</Link>
      </PostDetail>
      <PostDesc>{node.frontmatter.description || node.excerpt}</PostDesc>
      <hr/>
    </IntroWrapper>
  )
}

export default PostIntro