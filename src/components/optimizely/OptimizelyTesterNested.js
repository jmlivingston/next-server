import PropTypes from 'prop-types';
import { useExperiment } from '.';

const OptimizelyTesterNested = ({ experiment }) => {
  const [variation] = useExperiment(experiment);
  return <div>useExperiment: {variation}</div>;
};

OptimizelyTesterNested.propTypes = {
  experiment: PropTypes.string,
};

export default OptimizelyTesterNested;
