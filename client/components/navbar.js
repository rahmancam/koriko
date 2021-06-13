import React from 'react'

export default function NavBar () {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='#'>Koriko</a>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <a className='nav-link' href='https://rahmancam.github.io/koriko/' rel='noreferrer' target='_blank'>API Documentaion <span className='sr-only'>(current)</span></a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='https://github.com/rahmancam/koriko' rel='noreferrer' target='_blank'>Github Project</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
