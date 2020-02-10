//This is an amended version of SinglePost.js, not Triphound/SingleTour.js
//remove image, description, html
//change date to date(formatString: "MMMM DD, YYYY")
import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

//import Bio from "../components/bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Image from 'gatsby-image'

const SingleTourTemplate = (props) => { //replace with arrow function

    // const post = this.props.data.mdx
    // const siteTitle = this.props.data.site.siteMetadata.title
    // const { previous, next } = this.props.pageContext

    const post = props.data.mdx
    const siteTitle = props.data.site.siteMetadata.title
    const { previous, next } = props.pageContext

    return (
      <Layout location={props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          keywords={[`single place`, `usa`]}
          description={post.excerpt}
        />
        <section className="section">
            <div className="container">
              <h1>{post.frontmatter.title}</h1>
              <div>{post.frontmatter.featuredImage && <Image fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}</div>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(0),
                  marginTop: rhythm(1),
                }}
              >
                {post.frontmatter.date}
              </p>
              
              {post.frontmatter.price_from && (
                <h4>
                  Price from ${post.frontmatter.price_from}
                </h4>
              )}

              {post.frontmatter.tourId && post.id && (
                <h4>
                tourId: {post.frontmatter.tourId} / Id: {post.id}
                </h4>
              )}


              {post.frontmatter.tags && (
                <div>
                    tags: {post.frontmatter.tags}
                </div>
              )}


              {post.frontmatter.start_time_text && (
                <div>
                  start_time_text: {post.frontmatter.start_time_text}
                </div>
              )}
              {post.frontmatter.duration_text && (
                <div>
                  duration_text: {post.frontmatter.duration_text}
                </div>
              )}
              {post.frontmatter.includes && (
                  <p dangerouslySetInnerHTML={{ __html: post.frontmatter.includes }}/>
              )}
              {post.frontmatter.bring && (
                <div>
                  bring: {post.frontmatter.bring}
                  <p dangerouslySetInnerHTML={{ __html: post.frontmatter.bring }}/>
                </div>
              )}

              <hr
                style={{
                  marginBottom: rhythm(1),
                }}
              />

              <MDXRenderer>{post.body}</MDXRenderer>
              <hr
                style={{
                  marginBottom: rhythm(1),
                }}
              />

              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {previous && (
                    <Link to={`${previous.fields.slug}`} rel="prev">
                      ← {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link to={`${next.fields.slug}`} rel="next">
                      {next.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>

            </div>
        </section>

      </Layout>
    )
  //}
}

export default SingleTourTemplate

export const pageQuery = graphql`
  query TourBySlug($slugggg: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slugggg } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        tourId
        title
        template
        date
        price_from
        start_time_text
        duration_text
        main_photo
        includes
        bring
        tags
        categories {
            category
        }
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }       
      }
    }
  }
`
