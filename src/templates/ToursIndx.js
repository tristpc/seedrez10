//version of BlogIndex.js'
import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import SEO from "../components/seo"
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import SideBar from '../components/SideBarTest'

/**
 * Filter posts by date. Feature dates will be filtered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentClass} string
 */
export const byCategory = (posts, title, contentClass) => {
  const isCategory = contentClass === 'placeCategories' //was 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const ToursIndxTemplate = ({
  title,
  subtitle,

  posts = [],
  postCategories = [],
  enableSearch = true,
  contentClass
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
        posts && !!posts.length
          ? byCategory(byDate(posts), title, contentClass)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Places">

          {!!postCategories.length && (
            <section className="section thin">
              <div className="container">
                <PostCategoriesNav enableSearch categories={postCategories} />
              </div>
            </section>
          )}

          
          {!!posts.length && (
            <section className="section">
              <div className="container">
                <div className="mainblock">                
                  <div className="aside">
                    <SideBar />
                  </div>
                  <div className="content">
                    <TourSection posts={filteredPosts} />
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default ToursIndx for front-end
const ToursIndx = ({ data: { page, posts, postCategories } }) => (

  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <SEO
        title="Tours list"
        keywords={[`tours`, `regions`]}
        description="The best tours in the region"
        lang="English"
    />

    <ToursIndxTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      postCategories={postCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default ToursIndx

export const pageQuery = graphql`
  ## query name must be unique to this file
  query ToursIndx($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      fields {
        contentClass
      }
      frontmatter {
        title
        excerpt
        template
        subtitle

      }
    }

    posts: allMdx(
        filter: { fields: { contentClass: { eq: "tour" } } }
        sort: { order: DESC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
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
    }
    postCategories: allMdx(
      filter: { fields: { contentClass: { eq: "placeCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
