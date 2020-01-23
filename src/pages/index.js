import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Gatsby Starter Website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home page"
          keywords={[`places`, `gatsby`, `javascript`, `react`]}
          description="The perfect guide to stunning places" 
          lang="English"
        />
        <section className="section">
              <div className="container">
                  <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" />
                  <h1>
                    Hey people{" "}
                    <span role="img" aria-label="wave emoji">
                      👋
                    </span>
                  </h1>
                  <p>Welcome to the home page.</p>
                  <p>
                    This starter comes out of the box with styled components, mdx and Gatsby's
                    default starter blog running on Netlify CMS.
                  </p>
                  <p>Now to build something!</p>
                  <Link to="/blog/">
                    <Button marginTop="35px">Go to Blog</Button>
                  </Link>
              </div>
        </section>
      </Layout>
    )
  }
}

export default IndexPage
