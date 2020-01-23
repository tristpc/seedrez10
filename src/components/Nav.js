import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"
import { Menu, X } from 'react-feather'
import Logo from './Logo'
import styled from 'styled-components'

import './Nav.css' //contains remaining css of NavORIG.css not converted to styled components here

//Nav--Container
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;

  @media (max-width: 600px) {
      display: flex;
    }
`

//FOLLOWING ALL COMMENTED OUT AS CSS STILL USED FROM Nav.css
// //Nav tag
// const Nav = styled.div`
//   background: white;
//   position: sticky;
//   top: 0;
//   z-index: 1;
//   border-bottom: 1px solid var(--lightGrey);
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.025);
// ` 

// //Nav--Links
// //includes .Nav-active .Nav--Links as .Nav-active
// const NavLinks = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: row;
//   text-decoration: none;

//   & > * + * {
//     margin-left: 1rem;
//   }

//   & .Nav-active {
//     display: flex;
//   }

//   @media (max-width: 600px) {
//     display: none;
//     align-items: center;
//     flex-direction: column;
//     position: fixed;
//     justify-content: center;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: white;
//     animation: Nav--Links 0.2s ease;

//     & > * + * {
//         margin-left: 0;
//         margin-top: 1rem;
//       }
//   }
// `

// //Other possibility for .Nav-active .Nav--Links
// // .Nav-active .Nav--Links {
// //   display: flex;
// // }
// // const Title = styled(Text)`
// //   font-size: 18px;
// //   color: ${gray1};
// //   margin-bottom: 5px;
// // `;

// //NavLink :NOTE WAS ONLY .active
// const StyledNavLink = styled.div`
//   position: relative;
//   cursor: pointer;

//   & :hover, .active, :active, :focus {
//     color: var(--primary);
//     border-bottom-color: currentColor;
//     }
    
// `

// //Nav--Group
// const NavGroup = styled.div`
//   position: relative;
//   cursor: pointer;
// `

//.Nav .Logo NOT DONE/APPLIED
// const StyledLogo = styled.div`
//   margin-right: 3rem;
//   position: relative;
//   @media (max-width: 600px) {
//     z-index: 1;
//   }
// `

//Nav--GroupParent
// const GroupParent = styled.div`
//     padding-right: 3rem; 
    
//     & ::after {
//         content: '';
//         position: absolute;
//         top: calc(50% - 0.2rem);
//         right: 1rem;
//         border-bottom: 2px solid var(--darkGrey);
//         border-right: 2px solid var(--darkGrey);
//         display: block;
//         height: 0.8rem;
//         width: 0.8rem;
//         transition: 0.3s ease all;
//         transform: translateY(-50%) rotate(45deg);
//       }
// `

//Nav--GroupLink  PROBLEM!!!!
// const GroupLink = styled.div`
//     display: block;
//     position: relative;
//     width: 15rem;
// `

//Nav--GroupLinks
// const GroupLinks = styled.div`
//     position: absolute;
//     top: 100%;
//     left: 0;
//     width: auto;
//     background: white;
//     /* opacity: 0; */
//     max-height: 0;
//     overflow: hidden;
//     transition: 0.3s ease all;
//     @media (max-width: 600px) {
//         position: relative;
//         text-align: center;
//     }
// `

//Nav--MenuButton
const StyledButton = styled.button`
    display: none !important;
    @media (max-width: 600px) {
        display: block !important;
        margin-left: auto;
        z-index: 1;
      }
`

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <Container className="container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/tours/">Tours</NavLink>
            <NavLink to="/search">Search all tours</NavLink>
            <NavLink to="/blog/">Blog</NavLink>

            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'posts' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('posts') ||
                  //this.props.location.pathname.includes('blog') ||
                  this.props.location.pathname.includes('post-categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('posts')}
              >
                Places
              </span>
              <div className="Nav--GroupLinks">
                <NavLink to="/posts/" className="Nav--GroupLink">
                  All Places
                </NavLink>
                {subNav.posts.map((link, index) => (
                  <NavLink
                    to={link.slug}
                    key={'posts-subnav-link-' + index}
                    className="Nav--GroupLink"
                  >
                    {link.title}
                  </NavLink>
                ))}
              </div>
            </div>
            <NavLink to="/contact/">Contact</NavLink>

            <NavLink to="/app/profile">Profile</NavLink>
        
            {isLoggedIn() ? (
              <NavLink to="/app/agency">Agency</NavLink>
            ) : null}

            {isLoggedIn() ? (
              <a className="NavLink"
                href="/"
                onClick={event => {
                  event.preventDefault()
                  logout(() => navigate(`/app/login`))
                }}
              >
                Logout
              </a>
            ) : null}

          </div>
          <StyledButton
            className="Button-blank"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </StyledButton>
        </Container>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
