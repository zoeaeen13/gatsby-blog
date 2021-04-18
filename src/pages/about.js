import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import aboutImg from '../images/about.jpeg'
import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="ABout" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content" style={{padding: '3vw 0'}}>
        <div className="post-content-body">
          <img style={{paddingBottom: '2vw'}} src={aboutImg}/>
          <p>我是老余，目前是一名網頁前端開發者，專注於技術學習與寫作，近期開啟一週一天的遠距工作模式，希望未來成為日常。</p>
          <p>人生理想，是找一座喜歡的城住下，蓋棟簡單的房子，有個總讓我想笑的人在身邊，做著有意義、能創造價值的工作，按照自己想要的方式生活下去。</p>
        </div>
      </article>
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
