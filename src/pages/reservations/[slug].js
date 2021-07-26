import Head from 'next/head';
import OptimizelyTester from '../../components/optimizely/OptimizelyTester';
import { OPTIMIZELY_CONFIG } from '../../config/CONSTANTS';

const OptimizelyRoutes = () => {
  return (
    <>
      <Head>
        <title>Optimizely</title>
        <script src={`https://cdn.optimizely.com/js/${OPTIMIZELY_CONFIG.snippetId}.js`}></script>
      </Head>
      <OptimizelyTester config={OPTIMIZELY_CONFIG} />
    </>
  );
};

export default OptimizelyRoutes;
