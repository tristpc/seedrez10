//version of BlogIndex.js'
//Cannot read property 'tag' of undefined
import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import SEO from "../components/seo"
import TourSection from '../components/PostSection'
//import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import SideBar from '../components/SideBarTest'

// Export Template for use in CMS preview
export const PlaceCatIndex = ({ pageContext, data }) => (
  <Location>
    {({ location }) => {
      const { tag, place, tagsRegion, allRegions } = pageContext;

      let { edges: posts, totalCount } = data.allMdx;
      const arrTagsRegion = tagsRegion.split(",")
      const arrAllRegions = allRegions.split(",")
  
      let enableSearch = true,
      filteredPosts = posts
  
      //* Add filter
      let queryObj = location.search.replace('?', '')
        queryObj = qs.parse(queryObj)
  
      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = posts.filter(post =>
          post.node.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

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
const ToursIndx = ({ data }) => (

  <Layout>
    <SEO
        title="Tours list"
        keywords={[`tours`, `regions`]}
        description="The best tours in the region"
        lang="English"
    />

    <PlaceCatIndex/>
  </Layout>
)

export default ToursIndx

export const pageQuery = graphql`
  ## query name must be unique to this file
  query {
    allMdx(
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
            tags
            price_from
            meeting
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
    
  }
`
