import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const PostLink = styled(Link)`
  font-size: 16px;
  line-height: 23px;
  letter-spacing: .48px;
  font-weight: 500;
  font-stretch: 100%;
  color: #666666;
  text-decoration: none;
  outline: none;
  transition: all .3s ease;

  &:hover {
    color: #C5322E;
    text-decoration: none;
  }
`
const PostDate = styled.p`
  color: #9e9e9e;
  font-size: 13px;
  font-weight: 500;
`

const PostItem = ({ type, node }) => {
  return (
    <>
      <PostLink to={node.fields.slug}>{node.frontmatter.title}</PostLink>
      {<PostDate>{node.frontmatter.date}</PostDate>}
    </>
  )
}

export default PostItem