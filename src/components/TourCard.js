//version of PostCard.js (11feb)

import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

//PostCard tag
const StyledLink = styled(Link)`
  text-decoration: none;
  background: white;
  color: inherit;
  border: 1px solid var(--lightGrey);
  border-radius: var(--borderRadius);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.15s ease-in-out;
  overflow: hidden;
  .PostCard:hover,
  .PostCard:focus {
  transform: translateY(-1px);
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
`

//PostCard--Image tag
const StyledImage = styled.div`
  margin: 0 0 2rem 0;
  width: 100%;
  position: relative;
  /*height: 15rem;*/
`

//PostCard--Content
const Content = styled.div`
  padding: 0 2.5rem 2.5rem;
`

//PostCard--Title 
const Title = styled.h3`
  margin: 0;
`

//PostCard--Category
const Category = styled.div`
  font-size: 1.2rem;
  min-height: 1.2em;
  line-height: 1;
  margin: 0.5em 0;
`

//PostCard--Excerpt
const Excerpt = styled.div`
  /*color: black;*/
`

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <StyledLink to={slug}>
      <StyledImage>
      {featuredImage && <Image fluid={featuredImage.childImageSharp.fluid} />}
      </StyledImage>
    <Content>
      {title && <Title>{title}</Title>}
      <Category>
        {categories && categories.map(cat => cat.category).join(', ')}
        {tour.node.frontmatter.price_from && <div>From ${tour.node.frontmatter.price_from}</div>}
      </Category>
      {excerpt && <Excerpt>{excerpt}</Excerpt>}
    </Content>
  </StyledLink>
)

export default PostCard
