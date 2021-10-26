import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getMocks, OptimizelyExperiment, OptimizelyProvider, OptimizelyVariation } from '.';
import OptimizelyTesterNested from './OptimizelyTesterNested';

const OptimizelyTester = ({ config }) => {
  const [isMock, setIsMock] = useState(false);
  const [mocks, setMocks] = useState();
  // Get first experiment in config or hard code to use another
  const experiment = Object.keys(config.experiments)[0];
  const [variation, setVariation] = useState();
  const activeExperiment = config.experiments[experiment];
  const variations = activeExperiment?.variations;

  useEffect(() => {
    const queryString = window.location.search
      .substring(1)
      .split('&')
      .reduce((acc, value) => {
        const values = value.split('=');
        return { ...acc, [values[0]]: values[1] };
      }, {});
    const variation = queryString.optimizely_x || Object.keys(activeExperiment.variations)[0];
    setVariation(variation);
    const mocks = getMocks({
      experiment,
      isMock,
      variation,
    });
    setMocks(mocks);
  }, [activeExperiment.variations, experiment, isMock]);

  return (
    <OptimizelyProvider mocks={isMock ? mocks : undefined}>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="setMock"
          checked={isMock}
          onChange={() => setIsMock(!isMock)}
        />
        <label className="form-check-label" htmlFor="setMock">
          Use mock data?
        </label>
      </div>
      <hr />
      <OptimizelyExperiment experiment={activeExperiment?.id}>
        {(variation) => <div>OptimizelyExperiment (render function): {variation}</div>}
      </OptimizelyExperiment>
      <OptimizelyExperiment experiment={activeExperiment?.id}>
        <div>OptimizelyExperiment (render chidren)</div>
      </OptimizelyExperiment>
      {/* Loop through to show variations... */}
      {Object.entries(variations)?.map(([key, variation]) => (
        <OptimizelyVariation experiment={activeExperiment?.id} key={key} variation={variation?.id}>
          <div>OptimizelyVariation: {JSON.stringify(variation)}</div>
        </OptimizelyVariation>
      ))}
      {/* ...or wire up a singe variation */}
      <OptimizelyVariation experiment={activeExperiment?.id} variation={variation}>
        <div>OptimizelyVariation (not mapped): {JSON.stringify(activeExperiment?.variations[variation])}</div>
      </OptimizelyVariation>
      <OptimizelyTesterNested experiment={experiment} />
      <hr />
      <pre>
        <code>{JSON.stringify({ config, mocks }, null, 2)}</code>
      </pre>
      <>
        <hr />
        Note: Append query string to URL to override variation.
        <br />
        For example: ?optimizely_x=
        {Object.keys(variations)[0]}.
      </>
    </OptimizelyProvider>
  );
};

OptimizelyTester.propTypes = {
  config: PropTypes.shape({
    experiments: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        variations: PropTypes.objectOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
          })
        ),
      })
    ),
  }),
};

// Example config
// {
//   experiments: {
//     101: {
//       id: '101',
//       name: 'One zero one',
//       variations: {
//         201: {
//           id: '201',
//           name: 'Two zero one',
//         },
//         202: {
//           id: '202',
//           name: 'Two zero two',
//         },
//         203: {
//           id: '203',
//           name: 'Two zero three',
//         },
//       },
//     },
//   },
// }

export default OptimizelyTester;
