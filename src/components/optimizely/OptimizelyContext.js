// Optimizely snippet required: https://help.optimizely.com/Set_Up_Optimizely/Implement_the_one-line_snippet_for_Optimizely_X
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

const OptimizelyContext = createContext();

const OptimizelyProvider = ({ children, mocks }) => {
  const [data, setData] = useState({ experiments: {} });

  useEffect(() => {
    let experiments;
    try {
      experiments = mocks || window.optimizely?.get('state').getExperimentStates();
    } catch (error) {
      // TODO: Add logging
    }
    setData({ experiments });
  }, [mocks]);

  const getExperiment = ({ experiment }) => data.experiments?.[experiment.toString()];

  return (
    <OptimizelyContext.Provider value={{ getExperiment, experiments: data.experiments }}>
      {children}
    </OptimizelyContext.Provider>
  );
};

OptimizelyProvider.propTypes = {
  children: PropTypes.node,
  mocks: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      experimentName: PropTypes.string,
      variations: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })
      ),
    })
  ),
};

// Example mocks
// {
//   101: {
//     variation: { id: '201', name: 'Mock Variation: 201' },
//     id: '101',
//     experimentName: 'One zero one',
//   },
// }

export { OptimizelyContext, OptimizelyProvider };
