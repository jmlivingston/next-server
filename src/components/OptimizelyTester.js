import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { OPTIMIZELY_CONFIG } from '../utility/CONSTANTS'
import { getVariables } from '../utility/optimizelyUtility'
import {
  OptimizelyExperiment,
  OptimizelyProvider,
  OptimizelyVariation,
  useExperiment,
} from './optimizely'

const Optimizely = () => {
  const [isMock, setIsMock] = useState(false)
  const [experiment, setExperiment] = useState()
  const [variables, setVariables] = useState()

  useEffect(() => {
    const experiment = Object.keys(OPTIMIZELY_CONFIG.experiments)[0]
    setExperiment(experiment)
    const variables = getVariables({
      config: OPTIMIZELY_CONFIG,
      experiment,
      isMock,
    })

    setVariables(variables)
  }, [isMock])

  const Nested = () => {
    const [variation] = useExperiment(variables?.experiments?.[experiment].id)
    return <div>useExperiment: {variation}</div>
  }

  const currentExperiment = variables?.experiments?.[experiment]

  return (
    <>
      <Head>
        <title>Optimizely</title>
        <script
          src={`https://cdn.optimizely.com/js/${OPTIMIZELY_CONFIG.snippetId}.js`}></script>
      </Head>
      {variables && (
        <OptimizelyProvider
          overrideExperiments={isMock ? variables?.mocks : undefined}>
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
          <OptimizelyExperiment experiment={currentExperiment?.id}>
            {(variation) => <div>OptimizelyExperiment: {variation}</div>}
          </OptimizelyExperiment>
          {Object.entries(currentExperiment?.variations)?.map(
            ([key, variation]) => (
              <OptimizelyVariation
                experiment={currentExperiment?.id}
                key={key}
                variation={variation?.id}>
                <div>OptimizelyVariation: {JSON.stringify(variation)}</div>
              </OptimizelyVariation>
            )
          )}
          <Nested />
          <hr />
          <pre>
            <code>{JSON.stringify(variables, null, 2)}</code>
          </pre>
          {!isMock && (
            <>
              <hr />
              Note: Append query string to URL to override variation.
              <br />
              For example: ?optimizely_x=
              {
                currentExperiment?.variations?.[
                  Object.keys(currentExperiment?.variations)[0]
                ]?.id
              }
              .
            </>
          )}
        </OptimizelyProvider>
      )}
    </>
  )
}

export default Optimizely
