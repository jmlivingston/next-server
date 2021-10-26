import Head from 'next/head';
import Script from 'next/script';
import OptimizelyTester from '../../components/optimizely/OptimizelyTester';
import { OPTIMIZELY_CONFIG } from '../../config/CONSTANTS';

const OptimizelyRoutes = () => {
  return (
    <>
      <Head>
        <title>Optimizely</title>
        <Script src={`https://cdn.optimizely.com/js/${OPTIMIZELY_CONFIG.snippetId}.js`}></Script>
      </Head>
      <OptimizelyTester config={OPTIMIZELY_CONFIG} />
    </>
  );
};

export default OptimizelyRoutes;
