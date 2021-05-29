import React from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import aboutImg from '../images/about.jpeg'
import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="ABout" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <section className="post-content" style={{padding: '1.5vw 0'}}>
        <div className="post-content-body">
          <img style={{paddingBottom: '1vw'}} src={aboutImg}/>
          <div className="post-content-about">
            <article>
              <h4>TRAVEL IN TIME.</h4>
              <p>取名來自我喜歡的電影—— 《About Time》 中對穿梭時空的規則，<b>前往我曾經去過並且能記住的地方</b>，提醒自己有意識留意生活中的細節。</p>
              <p>最早是在 Instagram 上紀錄登山和旅行日常，後來篇幅逐漸加長，從 blogger 開始寫起，目前是使用 <b>gatsby + GitHub Pages</b> 來管理自己想要的內容樣式。</p>
              <div>
                生活是由各種事物交會堆疊的，希望這個網站可以收藏我在各個時期的想法、不同面向的成長：
                <ul>
                  <li>BLOG<span>— 累積主題寫作及回顧思考</span></li>
                  <li>LIFE<span>— 記錄日常</span></li>
                  <li>CODING<span>— 工作與程式上的學習筆記</span></li>
                  <li>PROJECTS<span>— 帶來成長的個人專案</span></li>
                </ul>
                隨時歡迎與我聯繫 zoeaeen13@gmail.com
              </div>
            </article>
            <article>
              <h4>嗨！我叫老余</h4>
              <p>成長於東部，求學時因為旅行和爬山而到處跑跳，目前在台北工作，時不時 Work from Home。</p>
              <p>大學幾乎待在<Link to="/category/山裡的日子">登山隊</Link>，從那時培養起獨立自主的習慣，也因為同伴關係而喜歡上中級山探勘，後來因為交換住了一陣子的<Link to="/tags/西班牙">西班牙</Link>，而有機會去騎行<Link to="/tags/朝聖之路">朝聖之路</Link>和完成法國科西嘉島<Link to="/tags/gr-20"> GR20 縱走</Link>。</p>
              <p>回台灣後，我開始對程式產生興趣而決定搬去台南一年，在<Link to="/tags/好想工作室">好想工作室</Link>認識了一群好朋友，一起吃遍台南、在<Link to="/tags/馬祖">馬祖</Link>小島上旅居，漸漸找到嚮往的生活方式。</p>
              <p>目前是一名網頁前端開發者，專注於<Link to="/coding">技術學習</Link>與<Link to="/blog">寫作</Link>，近期開啟一週一天的遠距工作模式，希望未來成為日常。而現階段的人生理想，是找一座喜歡的城住下，蓋棟簡單的房子，有個讓我想笑的人在身邊，做有意義、能創造價值的工作，按照自己喜歡的方式生活下去。</p>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    benchAccounting: file(
      relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
