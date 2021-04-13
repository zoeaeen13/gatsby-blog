import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'


const Wrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 32px;
  border-radius: 4px;
  background-color: #F6F6F6;

  & > div {
    padding-left: 20px;
  }
`

const Avatar = styled(Link)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-size: cover;
  background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)
`

const AuthorTitle = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  color: #414141;
  margin-bottom: 10px;

  &:hover {
    color: #C5322E;
    text-decoration: none;
  }
`


const Intro = () => {
  return (
    <Wrapper>
      <Avatar to="/about"/>
      <div>
        <AuthorTitle to="/about">老余 Zoe Yu</AuthorTitle>
        <p>Web Developer. I make Application for better life.</p>
      </div>
    </Wrapper>
  )
}


export default Intro