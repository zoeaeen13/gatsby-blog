import React from "react"
import styled from 'styled-components'
import PostItem from '../components/postItem'
import PostCard from '../components/postCard'

const ItemWrapper = styled.div`
border-bottom: 1px solid #eeeeee;
padding: 24px 0 36px 0;
`
const ArchiveTitle = styled.h4`
  margin: 0;
  padding: 0;
  padding-bottom: 24px;
  font-size: 22px;
  font-weight: 500;
`

const ArchiveSection =  ({ type, year, list }) => {
  return (
    <ItemWrapper>
      <ArchiveTitle>{year}</ArchiveTitle>
      {list.map((post, index) => {
        return type === 'card'?  <PostCard key={index} node={post.node} /> : <PostItem key={index} node={post.node}/>
      })}
    </ItemWrapper>
)}


export default ArchiveSection