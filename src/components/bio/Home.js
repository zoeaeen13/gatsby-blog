import React from "react"
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"

const HomeSection = styled.section`
  margin: 0 auto;
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
const HomeBackground = styled.div`
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
const HomeContent = styled.div`
  width: 55%;
  padding: 10%;

  @media (max-width: 850px) {
    width: 100%;
  }

  p {
    font-size: 15px;
    line-height:26px;

    .italic {
      font-style: italic;
    }

    .bold {
      font-weight: bold;
    }
  }
`

function HomeBio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <HomeSection>
            <div>
              <HomeBackground url='https://images.unsplash.com/photo-1618072691851-5319b71f2dc3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80'/>
              <HomeContent>
                <p>2016 年開始寫作，最早是為了記錄在北京和登山隊的日子，隨著身份轉變與生命經驗的增加，單純的版面設計沒辦法包容所有文章，決定從 Blogger 離開、自己建立一個部落格。</p>
                <p>希望能兼容不同形式的分享，在這裡記錄我的登山、旅行、瑜珈與程式，分享我的學習和生活。</p>
                <p>而「TRAVEL IN TIME.」取名來自我最喜歡的愛情電影 ——<span className="italic"> About Time </span>中對穿梭時空的規則，<span className="bold">前往我曾經去過並且能記住的地方</span>，提醒自己有意識留意生活中的細節、享受日常的簡單快樂，我期待部落格是這樣一種存在，在飛速的人生路上幫我留下一個參照點，於平凡中獲得幸福。</p>
                <p>謝謝你的造訪。</p>
              </HomeContent>
            </div>
          </HomeSection>
        )
      }}
    />
  )
}

export default HomeBio

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