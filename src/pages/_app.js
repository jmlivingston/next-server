import 'bootswatch/dist/darkly/bootstrap.min.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ROUTES } from '../utility/CONSTANTS'
import './global.css'

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link href={ROUTES.HOME}>
            <a className="navbar-brand" href={ROUTES.HOME}>
              Home
            </a>
          </Link>
          <button
            className={`navbar-toggler${isNavOpen ? '' : ' collapsed'}`}
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen(!isNavOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href={ROUTES.CONVERT_FILE}>
                  <a
                    className={`nav-link${
                      pathname === ROUTES.CONVERT_FILE ? ' active' : ''
                    }`}
                    href={ROUTES.CONVERT_FILE}>
                    Convert File
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={ROUTES.JENKINS}>
                  <a
                    className={`nav-link${
                      pathname === ROUTES.JENKINS ? ' active' : ''
                    }`}
                    href={ROUTES.JENKINS}>
                    Jenkins
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container pt-2">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
