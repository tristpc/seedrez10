//* based on TourRegionsNav.js, https://flaviocopes.com/css-grid/ 

import React from 'react'
import { Link } from 'gatsby'

//import TourSearch from './TourSearch' //version of BlogSearch
import './SideBar.css' //https://www.w3schools.com/howto/howto_css_sidebar_responsive.asp

const SideBar = () => {

  

  return (
  
    <div className="sidebar">
     

      <div className="subtitle">REGION</div>
      <Link exact="true" to={`/all/`}>
        All
      </Link>

      <div className="subtitle">CATEGORY</div>


    </div>
  )
}

export default SideBar
