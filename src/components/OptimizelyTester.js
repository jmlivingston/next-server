import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { OPTIMIZELY_CONFIG } from '../utility/CONSTANTS'
import { getMocks } from '../utility/optimizelyUtility'
import {
  OptimizelyExperiment,
  OptimizelyProvider,
  OptimizelyVariation,
} from './optimizely'
import OptimizelyTesterNested from './OptimizelyTesterNested'

const OptimizelyTester = () => {
  const [isMock, setIsMock] = useState(false)
  const [mocks, setMocks] = useState()
  // Get first experiment in config or hard code to use another
  const experiment = Object.keys(OPTIMIZELY_CONFIG.experiments)[0]
  const activeExperiment = OPTIMIZELY_CONFIG.experiments[experiment]

  useEffect(() => {
    const queryString = window.location.search
      .substring(1)
      .split('&')
      .reduce((acc, value) => {
        const values = value.split('=')
        return { ...acc, [values[0]]: values[1] }
      }, {})
    const variation =
      queryString.optimizely_x || Object.keys(activeExperiment.variations)[0]
    const mocks = getMocks({
      experiment,
      isMock,
      variation,
    })
    setMocks(mocks)
  }, [isMock])

  return (
    <>
      <Head>
        <title>Optimizely</title>
        <script
          src={`https://cdn.optimizely.com/js/${OPTIMIZELY_CONFIG.snippetId}.js`}></script>
      </Head>
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
          {(variation) => <div>OptimizelyExperiment: {variation}</div>}
        </OptimizelyExperiment>
        {Object.entries(activeExperiment?.variations)?.map(
          ([key, variation]) => (
            <OptimizelyVariation
              experiment={activeExperiment?.id}
              key={key}
              variation={variation?.id}>
              <div>OptimizelyVariation: {JSON.stringify(variation)}</div>
            </OptimizelyVariation>
          )
        )}
        <OptimizelyTesterNested experiment={experiment} />
        <hr />
        <pre>
          <code>
            {JSON.stringify({ config: OPTIMIZELY_CONFIG, mocks }, null, 2)}
          </code>
        </pre>
        {!isMock && (
          <>
            <hr />
            Note: Append query string to URL to override variation.
            <br />
            For example: ?optimizely_x=
            {
              activeExperiment?.variations?.[
                Object.keys(activeExperiment?.variations)[0]
              ]?.id
            }
            .
          </>
        )}
      </OptimizelyProvider>
    </>
  )
}

export default OptimizelyTester
