import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ROUTES } from '../../config/ROUTES';

const COUNTER_INTERVAL = 2;

const Redirector = () => {
  const { query } = useRouter();
  const [counter, setCounter] = useState(COUNTER_INTERVAL);

  useEffect(() => {
    let intervalHandle;
    setCounter(3);
    if (query.redirect) {
      intervalHandle = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 1) {
            setCounter(COUNTER_INTERVAL);
            clearInterval(intervalHandle);
            if (typeof window !== 'undefined' && query.redirect) {
              if (query.top) {
                window.top.location.href = query.redirect;
              } else {
                window.location.href = query.redirect;
              }
            }
          } else {
            return prevCounter - 1;
          }
        });
      }, 1000);
    }
    return () => {
      clearTimeout(intervalHandle);
      setCounter(COUNTER_INTERVAL);
    };
  }, [query.redirect, query.top]);

  return (
    <div className="text-center">
      {query.redirect ? (
        <>
          <h1>Simulating a success challenge</h1>
          Redirecting after challenge to {query.redirect} in:
          <h2>{counter?.toString()} seconds!</h2>
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
