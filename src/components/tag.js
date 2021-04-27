import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

export const BlogTag = styled(Link)`
  padding: 8px 24px;
  margin-right: 16px;
  font-size: 12px;
  margin-bottom: 16px;
  font-weight: 500;
  letter-spacing: .5px;
  line-height: 24px;
  color: #181818;
  border: 1px solid #ECECEC;
  border-radius: 4px;

  &:hover {
    color: #C5322E;
    text-decoration: none;
  }
`

export const PageTag = styled(Link)`
  margin-right: 16px;
  margin-bottom: 16px;
  border-bottom: 2px solid transparent;
  padding: 4px 16px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .5px;
  line-height: 24px;
  color: #181818;
  background: #F6F6F6;
  transition: all .3s ease-in-out;


  &:hover {
    border-color: #181818;
    text-decoration: none;
  }
`

const TagDivider = styled.div`
  margin: 5vh 0;
  width: 100%;
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
    width: 85%;
    height: 2px;
    background: #3a3a3a;
  }
`

export const Divider = () => {
  return (
    <TagDivider>
      <h5>Tags</h5><div></div>
    </TagDivider>
  )
}