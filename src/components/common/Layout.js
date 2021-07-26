import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ROUTES } from '../../utility/CONSTANTS';

function Layout({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link href={ROUTES.HOME.path}>
            <a className="navbar-brand" href={ROUTES.HOME.path}>
              {ROUTES.HOME.display}
            </a>
          </Link>
          <button
            className={`navbar-toggler${isNavOpen ? '' : ' collapsed'}`}
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {Object.entries(ROUTES)
                .filter(([key, route]) => !route.disabled && key !== 'HOME')
                .map(([key, route]) => {
                  return (
                    <li className="nav-item" key={key}>
                      <Link href={route.path}>
                        <a className={`nav-link${pathname === route.path ? ' active' : ''}`} href={route.path}>
                          {route.display}
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid pt-2">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default Layout;
