import React from "react"
import styled from 'styled-components'
import { PostCard } from './postType'
const Wrapper = styled.div`
margin-bottom: 20px;
`

const PostTypeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    font-size: 18px;
    font-weight: 700;
    color: #3a3a3a;
    margin: 0;
    padding: 0;
  }

  & > div {
    width: 77%;
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
          if (index < 3) {
            return (
              <PostCard
                sub={'category'}
                key={index}
                node={post.node}
              />
            )
          } else {
            return null
          }
        })
      )}
    </Wrapper>
  )
}

export default TypeSection