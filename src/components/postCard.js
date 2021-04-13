import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const PostCard = styled.article`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;
  // border-bottom: 2px solid #f6f6f6;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const PostCover = styled(Link)`
  display: block;
  width: 27%;
  height:0;
  padding-bottom: 18%;
  overflow: hidden;
  background-size: cover;
  ${props => `
    background-image: url(${props.url? props.url:''});
  `}

  @media (max-width: 700px) {
    width: 100%;
    padding-bottom: 55%;
  }
`

const Category = styled.div`
  width: 20%;
  padding-right: 10px;
  
  h4 {
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    font-size: 16px;
    color: #687385;
    font-weight: 700;
  }

  a {
    color: #687385;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: #4a4a4a;
    }
  }
`

const Content = styled.div`
  width: 50%;
  padding-right: 10px;

  a {
    display: block;
    font-size: 20px;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    color: #4a4a4a;
  }

  p {
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:3 ;
    -webkit-box-orient: vertical;
  }

  @media (max-width: 700px) {
    width: 100%;
    padding-right: 0px;
  }
`

const postCard =  ({ node }) => (
  <PostCard>
    <Category>
      <h4>{node.frontmatter.date}</h4>
      <Link to={`/category/${node.frontmatter.category}`}>{node.frontmatter.category}</Link>
    </Category>
    <Content>
      <Link to={node.fields.slug}>{node.frontmatter.title || node.fields.slug}</Link>
      <p>{node.frontmatter.description}</p>
    </Content>
    {node.frontmatter.thumbnail && <PostCover to={node.fields.slug} url={node.frontmatter.thumbnail.childImageSharp.fluid.src} />}
  </PostCard>
)


export default postCard