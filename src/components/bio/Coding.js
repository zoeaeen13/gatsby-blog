import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import AvatarImg from '../../images/avatar.jpeg'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 20px 0 30px 0;

  @media (max-width: 850px) {
    flex-direction: column;
    justify-content: center;
    align-self: center;
  }

  & > div {
    padding-left: 20px;

    @media (max-width: 850px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  }

  p {
    margin: 0;
    padding: 0;
    @media (max-width: 850px) {
      text-align: center;
    }
  }
`

const Avatar = styled(Link)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 10px;
  background-size: cover;
  ${props => `
    background-image: url(${props.url})
  `}
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
const LinkWrap = styled.div`
  padding: 10px 0;

  a {
    color: #4a4a4a;
    margin: 0 5px;
  }
`

function CodingBio() {
  return (<StaticQuery
    query={codingBioQuery}
    render={data => {
      const { author, social } = data.site.siteMetadata
      return (
        <Wrapper>
          <Avatar to="/about" url={AvatarImg} />
          <div>
            <AuthorTitle to="/about">{`老余 ${author}`}</AuthorTitle>
            <p>Web Developer. I make Application for better life.</p>
            <LinkWrap>
              <a href={`https://www.facebook.com/${social.facebook}`}>
                <FontAwesomeIcon icon={faFacebookSquare}/>
              </a>
              <a href={`https://twitter.com/${social.twitter}`} >
                <FontAwesomeIcon icon={faTwitter}/>
              </a>
              <a href={`https://github.com/${social.github}`}>
                <FontAwesomeIcon icon={faGithub}/>
              </a>
            </LinkWrap>
          </div>
        </Wrapper>
      )
    }}
  />)
}


export default CodingBio

const codingBioQuery = graphql`
  query CodingBioQuery {
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
          github
          facebook
        }
      }
    }
  }
`