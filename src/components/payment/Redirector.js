import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ROUTES } from '../../config/CONSTANTS';

const Redirector = () => {
  const { query } = useRouter();
  const [counter, setCounter] = useState(5);
  let intervalHandle;

  useEffect(() => {
    if (query.redirect) {
      intervalHandle = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 1) {
            clearInterval(intervalHandle);
            if (typeof window !== 'undefined' && query.redirect) {
              window.location.href = query.redirect;
            }
          }
          return prevCounter - 1;
        });
      }, 1000);
      return () => clearTimeout(intervalHandle);
    }
  }, [query.redirect]);

  return (
    <div className="text-center">
      {query.redirect ? (
        <>
          <h1>Simulating a success challenge</h1>
          Redirecting after challenge to {query.redirect} in:
          <h2>{counter.toString()} seconds!</h2>
        </>
      ) : (
        <div className="alert alert-danger">
          Warning: ?redirect query string required <br />
          <Link href={`${ROUTES.REDIRECT.path}?redirect=http://www.google.com`} passHref={true} replace={true}>
            <a className="navbar-brand">Example</a>
          </Link>
        </div>
      )}
    </div>
  );
};

Redirector.propTypes = {};

export default Redirector;
