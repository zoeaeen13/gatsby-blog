import React from "react"
import { Link } from 'gatsby'
import styled from 'styled-components'
import yogaImg from '../images/category/yoga.jpeg'
import mountainImg from '../images/category/mountain.jpeg'
import kotlinImg from '../images/category/kotlin.jpeg'
import lidemyImg from '../images/category/lidemy.png'
import taitungImg from '../images/category/taitung.jpeg'
import travelImg from '../images/category/travel.jpeg'
import weeklyJournalImg from '../images/category/weeklyjournal.jpeg'

const ImageContainer = styled(Link)`
  background-position: center;
  background-size: cover;
  ${props => `
    background-image: url(${props.img});
  `}
  width: 100%;
  height: 0;
  padding-bottom: 30%;
  margin-top: 20px;
  overflow: hidden;
`

const CategoryBanner = ({ category }) => {
  let img = ''
  let link = ''
  switch (category) {
    case 'Yoga':
      img = yogaImg
      break;
    case '山裡的日子':
      img = mountainImg
      break;
    case 'Android':
      img = kotlinImg
      break;
    case '程式導師計畫':
      img = lidemyImg
      link = 'https://bootcamp.lidemy.com/'
      break;
    case '旅行日記':
      img = travelImg
      break;
    case 'Weekly Journal':
      img = weeklyJournalImg
      break;
    case '宅在台東的一百種生活':
      img = taitungImg
      break;
    default:
      break;
  }
  return (
    <ImageContainer to={link} img={img}/>
  )
}

export default CategoryBanner