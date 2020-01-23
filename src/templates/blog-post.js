import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Image from 'gatsby-image'

//class BlogPostTemplate extends React.Component {
const BlogPostTemplate = (props) => { //replace with arrow function
  //render() {

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
          description={post.frontmatter.description || post.excerpt}
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
                <MDXRenderer>{post.body}</MDXRenderer>
                <hr
                  style={{
                    marginBottom: rhythm(1),
                  }}
                />
                <Bio />

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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date
        description
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
