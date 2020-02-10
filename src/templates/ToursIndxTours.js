//version of ToursIndxREALORIG.js without pages, pagecats
import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import SEO from "../components/seo"
import TourSection from '../components/PostSection'
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
  posts = [],
  pageContext,
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

      const { tag, place, tagsRegion, allRegions } = this.props.pageContext;
      console.log("tag="+tag)
      console.log("place="+place)
      console.log("tagsRegion="+tagsRegion)

      return (
        <main className="Places">
          
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
const ToursIndx = ({ data: { posts } }) => (

  <Layout>
    <SEO
        title="Tours list"
        keywords={[`tours`, `regions`]}
        description="The best tours in the region"
        lang="English"
    />

    <ToursIndxTemplate
      posts={posts.edges.map(post => ({
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
  query {
    
    posts: allMdx(
        filter: {frontmatter: {tags: { in: ["Biking"] } meeting: { eq: "La Fortuna" } }}
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
            tags
            meeting
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
    
  }
`
