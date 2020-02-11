//This is a modified version of PostSection.js

import React from 'react'
import PostCard from '../components/PostCard' //modified version of PostCard
import styled from 'styled-components'

//PostSection
const Section = styled.div`
`

//PostSection--Grid tag
const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: stretch;

  & > * {
    width: calc(33.33% - 2rem);
    margin-bottom: 4rem;
  }

  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 4rem;

    &  > * {
      width: auto;
      margin: 0;
    }
  }

  @media screen and (max-width: 888px) {
    & > * {
      width: 100%;
      max-width: 50rem;
      margin: 0 auto 4rem;
      display: block;
    }

    @supports (display: grid) {
        display: block;
        grid-template-columns: 1;
        grid-gap: 0;
    }
  }
`

//PostSection--Title tag
const Title = styled.h2`
  width: 100%;
  max-width: 200px;
  margin: 0 auto 4rem auto;
  line-height: 1.2;
`

//PostSection button
const Button = styled.button`
  margin-top: 1rem;
  margin-top: 5rem;
  background: white;
  border: 2px solid black;
  padding: 1rem 2rem;
  cursor: pointer;

  & :hover {
  background: black;
  border: 2px solid white;
  color: white;
  }
`

class PostSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { posts, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visiblePosts = posts.slice(0, limit || posts.length)

    return (
      <Section>
        {title && <Title>{title}</Title>}
        {!!visiblePosts.length && (
          <Grid>
            {visiblePosts.map((post, index) => (
              <PostCard key={post.title + index} {...post} />
            ))}
          </Grid>
        )}
        {showLoadMore && visiblePosts.length < posts.length && (
          <div className="taCenter">
            <Button onClick={this.increaseLimit}>
              {loadMoreTitle}
            </Button>
          </div>
        )}
      </Section>
    )
  }
}

export default PostSection
