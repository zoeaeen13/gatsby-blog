import React from "react"
import styled from 'styled-components'
import { PostCard, PostTitle } from '../components/postType'

const ItemWrapper = styled.div`
border-bottom: 1px solid #eeeeee;
padding: 24px 0 36px 0;
`
const ArchiveTitle = styled.h4`
  margin: 0;
  padding: 0;
  padding-bottom: 24px;
  font-size: 22px;
  font-weight: 600;
`

const ArchiveSection =  ({ type, year, posts }) => {
  return (
    <ItemWrapper>
      <ArchiveTitle>{year}</ArchiveTitle>
      {posts.map((post, index) => {
        return type === 'card'?  <PostCard type={post.node.frontmatter.type} key={index} node={post.node} /> : <PostTitle key={index} node={post.node}/>
      })}
    </ItemWrapper>
)}


export default ArchiveSection