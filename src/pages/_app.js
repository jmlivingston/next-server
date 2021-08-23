import 'bootswatch/dist/darkly/bootstrap.min.css'; // darkly, yeti, lux
import Layout from '../components/common/Layout';
import './global.css';

const LayoutWrapper = (props) => {
  const showLayout = !props.router.asPath.includes('/pages/redirector');
  return <Layout {...props} pageProps={{ ...props.pageProps, showLayout }} />;
};

export default LayoutWrapper;
