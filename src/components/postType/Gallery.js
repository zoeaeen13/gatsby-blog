import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const PostCard = styled.article`
  position: relative;
  display: flex;
  margin-bottom: 5vh;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
  }
`
const PostCover = styled(Link)`
  position: relative;
  display: block;
  width: 500px;
  height: 338px;
  padding-bottom: 18%;
  overflow: hidden;
  background-size: cover;
  background-position: center center;

  ${props => `
    background-image: url(${props.url? props.url:''});
  `}

  @media (max-width: 1024px) {
    width: 100%;
    padding-bottom: 55%;

    & > div {
      opacity: 1;
    }

    & article {
      visibility: visible;
    }
  }

  &:hover {
    & > div {
      opacity: 1;
    }

    & article {
      visibility: visible;
    }
  }
`
const Mask = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, .3);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity .3s ease-in-out;
`
const PostContent = styled.div`
  position: absolute;
  top: 50px;
  left: 550px;
  padding: 10px;
  white-space: normal;
  width: 250px;
  height: 180px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  font-style: italic;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
  }
`
const PostDetail = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  visibility: hidden;
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: white;

  h3, h5 {
    text-align:right;
    margin: 0;
    padding: 0;
    font-family: "IBM Plex Serif",source-han-serif-tc,serif;
    font-size: 28px;
  }
  h5 {
    font-size: 13px;
  }
`

const PostGallery =  ({ node }) => {
  const tags = node.frontmatter.tags
  return (
    <PostCard>
      <PostCover to={node.fields.slug} url={node.frontmatter.thumbnail.childImageSharp.fluid.src}>
        <Mask />
        <PostDetail>
          <h5>{node.frontmatter.date}</h5>
          <h3>{node.frontmatter.title}</h3>
        </PostDetail>
      </PostCover>
      <PostContent>{node.excerpt}</PostContent>
    </PostCard>
  )}


export default PostGallery