import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from '../../config/ROUTES';

const Pages = () => {
  const router = useRouter();
  const { slug } = router.query;
  const EmptyComponent = () => 'You picked an empty component! This is an error.';
  const updatedSlug = slug?.replace(/-/g, '_')?.toUpperCase();
  const Component = ROUTES?.[updatedSlug]?.component || EmptyComponent;
  const props = ROUTES?.[updatedSlug]?.props || {};

  return (
    <>
      {slug && (
        <Head>
          <title>{slug?.substr(0, 1)?.toUpperCase() + slug?.substr(1)}</title>
        </Head>
      )}
      <Component {...props} />
    </>
  );
};

export default Pages;
