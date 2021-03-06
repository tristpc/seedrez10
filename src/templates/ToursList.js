//version of ToursIndxREALORIG.js without pages, pagecats
import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import SEO from "../components/seo"
import TourSection from '../components/TourSection' //version of PostSection (11feb)
//import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import SideBar from '../components/SideBar'
import ListPageHeader from '../components/ListPageHeader' //version of PageHeader

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
  contentClass,
  totalCount
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

      const { tag, place, tagsRegion, allRegions } = pageContext;
      //const { tag, tagFull, tagT, tagM, place, tagsRegion, allRegions } = pageContext;

      //let { totalCount } = data.allMdx;
      const arrTagsRegion = tagsRegion.split(",")
      const arrAllRegions = allRegions.split(",")
      //console.log("totalCount="+totalCount)
    //   console.log("tagFull="+tagFull)
    //   console.log("tagT="+tagT)
    //   console.log("tagM="+tagM)

      return (
        <main className="Places">

          <ListPageHeader
            place={place}
            tag={tag}
            count = {totalCount}
          />
          
          {!!posts.length && (
            <section className="section">
              <div className="container">
                <div className="mainblock">                
                  <div className="aside">
                    <SideBar enableSearch 
                      regions={arrAllRegions}
                      tags={arrTagsRegion}
                      place = {place} 
                      tag={tag} />
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
const ToursIndx = ({ pageContext, data: { posts } }) => (

  <Layout>
    <SEO
        title="Tours list"
        keywords={[`tours`, `regions`]}
        description="The best tours in the region"
        lang="English"
    />

    <ToursIndxTemplate
      pageContext={pageContext}
      totalCount={posts.totalCount}
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
  query($tag: String, $place: String) {
    
    posts: allMdx(
        filter: {frontmatter: {tags: { in: [$tag] } meeting: { eq: $place } contentClass: {eq: "tour" } }}
        sort: { order: ASC, fields: [frontmatter___price_from] }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            tourId
            price_from
            contentClass
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

