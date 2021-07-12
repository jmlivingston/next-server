import Head from 'next/head'
import React, { useEffect, useState } from 'react'
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
    const experiment = isMock
      ? '101'
      : process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT_ID
    setExperiment(experiment)
    const variation = isMock ? 201 : undefined

    const variables = getVariables({
      experiment,
      isMock,
      variation,
    })

    setVariables(variables)
  }, [isMock])

  const Nested = () => {
    const [variation] = useExperiment(
      variables?.EXPERIMENTS?.[experiment].EXPERIMENT_ID
    )
    return <div>useExperiment: {variation}</div>
  }

  const currentExperiment = variables?.EXPERIMENTS?.[experiment]

  return (
    <>
      <Head>
        <title>Optimizely</title>
        <script
          src={`https://cdn.optimizely.com/js/${process.env.NEXT_PUBLIC_OPTIMIZELY_SNIPPET_ID}.js`}></script>
      </Head>
      {variables && (
        <OptimizelyProvider
          overrideExperiments={isMock ? variables?.MOCKS : undefined}>
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
          <OptimizelyExperiment experiment={currentExperiment?.EXPERIMENT_ID}>
            {(variation) => <div>OptimizelyExperiment: {variation}</div>}
          </OptimizelyExperiment>
          <OptimizelyVariation
            experiment={currentExperiment?.EXPERIMENT_ID}
            variation={currentExperiment?.VARIATION1}>
            <div>OptimizelyVariation: {currentExperiment?.VARIATION1}</div>
          </OptimizelyVariation>
          <OptimizelyVariation
            experiment={currentExperiment?.EXPERIMENT_ID}
            variation={currentExperiment?.VARIATION2}>
            <div>OptimizelyVariation: {currentExperiment?.VARIATION2}</div>
          </OptimizelyVariation>
          <OptimizelyVariation
            experiment={currentExperiment?.EXPERIMENT_ID}
            variation={currentExperiment?.VARIATION3}>
            <div>OptimizelyVariation: {currentExperiment?.VARIATION3}</div>
          </OptimizelyVariation>
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
              For example: ?optimizely_x={variables?.VARIATION1}.
            </>
          )}
        </OptimizelyProvider>
      )}
    </>
  )
}

export default Optimizely
