import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div>
      <div className='container text-center' style={{display: 'none'}}>
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>  <t/ >
        <Link to='/devices' activeClassName='page-layout__nav-item--active'>Devices</Link>
      </div>

      <div className='page-layout__viewport'>
        {children}
      </div>
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
