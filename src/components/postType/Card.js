import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import { kebabCase } from 'lodash'
const PostArticle = styled.article`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;

  @media (max-width: 800px) {
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
  transition: opacity .3s ease-in-out;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 800px) {
    width: 100%;
    padding-bottom: 55%;
  }
`

const Category = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  padding-right: 10px;
  margin-bottom: 10px;
  margin-right: 10px;

  @media (max-width: 800px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
  }

  
  h4 {
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    font-size: 16px;
    color: #687385;
    font-weight: 700;
    white-space: nowrap;

    @media (max-width: 800px) {
      margin: 0;
      margin-right: 10px;
      font-size: 12px;
      font-weight: bold;
      color: #919aa9;
    }
  }

  a {
    white-space: nowrap;
    color: #687385;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: #4a4a4a;
    }

    @media (max-width: 800px) {
      font-size: 12px;
      font-weight: bold;
      color: #919aa9;
    }
  }
`

const Content = styled.div`
  width: ${props => props.type === 'coding' ? '75%': '50%'};
  padding-right: 10px;

  a {
    display: block;
    font-size: 20px;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    color: #4a4a4a;

    &:hover {
      color: #C5322E;
      text-decoration: none;
    }
  }

  p {
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.type === 'coding' ? '2': '3'};
    -webkit-box-orient: vertical;
  }

  @media (max-width: 800px) {
    width: 100%;
    padding-right: 0px;
  }
`
const TagWrap = styled.div`
  a {
    display: block;
    @media (max-width: 800px) {
      display: none;
    }
  }
`


const PostCard =  ({ sub, type, node }) => {
  const tags = node.frontmatter.tags
  return (
  <PostArticle>
    <Category>
      <h4>{node.frontmatter.date}</h4>
      {sub === 'category' ?
        (<Link to={`/category/${kebabCase(node.frontmatter.category)}`}>{node.frontmatter.category}</Link>) :
        (<TagWrap>
          {tags.map((tag, index) => <Link key={index} to={`/tags/${kebabCase(tag)}`}>{`#${tag}`}</Link>)}
        </TagWrap>)
      }
    </Category>
    <Content type={type}>
      <Link to={node.fields.slug}>{node.frontmatter.title || node.fields.slug}</Link>
      <p>{node.excerpt !== '???'? node.excerpt : ''}</p>
    </Content>
    {node.frontmatter.thumbnail && <PostCover to={node.fields.slug} url={node.frontmatter.thumbnail.childImageSharp.fluid.src} />}
  </PostArticle>
)}


export default PostCard