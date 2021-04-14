import React from "react"
import styled from 'styled-components'
import yogaImg from '../images/category/yoga.jpeg'
import mountainImg from '../images/category/mountain.jpeg'

const ImageContainer = styled.div`
  background-position: center;
  background-size: cover;
  ${props => `
    background-image: url(${props.url});
  `}
  width: 100%;
  height: 0;
  padding-bottom: 30%;
  margin-top: 20px;
  overflow: hidden;
`

const CategoryBanner = ({ category }) => {
  let url = ''
  switch (category) {
    case 'Yoga':
      url = yogaImg
      break;
    case '山裡的日子':
      url = mountainImg
      break;
    default:
      break;
  }
  return (
    <ImageContainer url={url}/>
  )
}

export default CategoryBanner