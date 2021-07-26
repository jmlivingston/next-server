// OptimizelyProvider ancestor is required (see OptimizelyContext.js)
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { OptimizelyContext } from './OptimizelyContext';

const OptimizelyVariation = ({ children, experiment, variation }) => {
  const { getExperiment } = useContext(OptimizelyContext);
  let contextVariation;
  let hasError = false;
  try {
    contextVariation = getExperiment({ experiment })?.variation;
  } catch (error) {
    // TODO: Add logging
    hasError = true;
  }
  return variation === contextVariation?.id || hasError ? children : null;
};

OptimizelyVariation.propTypes = {
  children: PropTypes.node,
  experiment: PropTypes.string,
  variation: PropTypes.string,
};

export default OptimizelyVariation;
