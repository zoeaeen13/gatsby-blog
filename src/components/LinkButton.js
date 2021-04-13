import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const LinkButton = styled(Link)`
  margin: 20px 0 32px 0;
  display: inline-block;
  padding: 10px 24px;
  color: #C5322E;
  background-color: white;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  text-align: center;
  text-transform: initial;
  white-space: nowrap;
  border: 1px solid #C5322E;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    color: white;
    background-color: #C5322E;
    text-decoration: none;
  }
`

export default LinkButton