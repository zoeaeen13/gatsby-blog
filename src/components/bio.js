/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"

const BioSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    justify-content: space-between;
    background: #f6f6f6;
    margin: 0 10vw;
    
    @media (max-width: 850px) {
      flex-direction: column;
      margin: 0 5vw;
    }
  }
`

const ImageWrapper = styled.div`
  width: 45%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  background-size: auto;
  ${props => `
    background: url(${props.url}) no-repeat;
  `}
  
  @media (max-width: 850px) {
    width: 100%;
    height: 0;
    padding-bottom: 75%;
  }
`
const Content = styled.div`
  box-sizing: border-box;
  width: 55%;
  padding: 40px;

  @media (max-width: 850px) {
    width: 100%;
  }

  p {
    font-size: 18px;
    line-height:28px;

    span {
      font-weight: bold;
    }
  }
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <BioSection>
            <div>
              <ImageWrapper url='https://images.unsplash.com/photo-1618072691851-5319b71f2dc3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80'/><Content>
                <p>I’m <span>Ubud</span>, a Front-End and Ghost CMS theme developer based in Cairo, Egypt. I left my full-time job at Trustious in 2016. Then I created Aspire Themes to provide simple, well-designed, and functional Ghost CMS themes.</p>
                <p>Founded the Arabic blogging platform oktob.io in 2015 which was acquired by Toriom in 2017.</p>
                <p>My goal is to work on something meaningful. I craft themes that offer value and joy to the communities and individuals who use them.</p>
                <p>You can do a lot with a fast, powerful, and slick site that runs on Ghost. It makes me feel proud and happy to see my themes being used for a variety of purposes.</p>
                <p>Thank you to everyone who has supported me over these years.</p>
              </Content>
            </div>
          </BioSection>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
