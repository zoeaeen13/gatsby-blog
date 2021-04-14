import React from "react"
import styled from 'styled-components'
import PostCard from './postCard'

const Wrapper = styled.div`
`

const PostTypeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    font-size: 20px;
    font-weight: 700;
    color: #3a3a3a;
    margin: 0;
    padding: 0;
  }

  & > div {
    width: 70%;
    height: 2px;
    background: #3a3a3a;
  }
`

const TypeSection = ({type, posts}) => {
  return (
    <Wrapper>
      <PostTypeTitle>
        <h5>{type}</h5><div></div>
      </PostTypeTitle>
      {posts && (
        posts.map((post, index) => {
          return (
            <PostCard
              key={index}
              node={post.node}
            />
          )
        })
      )
      }
    </Wrapper>
  )
}

export default TypeSection