import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'


const Tag = styled(Link)`
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

export default Tag