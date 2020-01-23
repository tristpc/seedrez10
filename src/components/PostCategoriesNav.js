import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import styled from 'styled-components'

//import './PostCategoriesNav.css'

//PostCategoriesNav
const PostCategoriesNavCss = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;

  & > * + * {
    margin-left: 1rem;
  }

  & input[type='text'] {
    right: 0;
    position: absolute;
    border: 0;
    padding: 1rem 2rem;
    border-radius: 2rem;
    font-size: 1.4rem;
    color: black;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  }

  & input[type='text']:focus {
    outline: none;
  }

  & input[type='text']::placeholder {
    color: black;
  }

  @media (max-width: 600px) {
    & input[type='text'] {
      position: relative;
      width: 100%;
    }
  }
`

const PostCategoriesNav = ({ categories, enableSearch }) => (
  <PostCategoriesNavCss>
    <Link className="NavLink" exact="true" to={`/posts/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </PostCategoriesNavCss>
)

export default PostCategoriesNav
