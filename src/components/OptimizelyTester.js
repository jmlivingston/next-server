import Head from 'next/head'
import React from 'react'
import { getVariables } from '../utility/optimizelyUtility'
import {
  OptimizelyExperiment,
  OptimizelyProvider,
  OptimizelyVariation,
} from './optimizely'
import OptimizelyTesterNested from './OptimizelyTesterNested'

const Optimizely = () => {
  const isMock = true

  const { EXPERIMENT_ID, MOCKS, VARIATION1, VARIATION2, VARIATION3 } =
    getVariables({
      isMock,
      // variable: 123,
    })

  return (
    <>
      <Head>
        <title>Optimizely</title>
        <script
          src={`https://cdn.optimizely.com/js/${process.env.NEXT_PUBLIC_OPTIMIZELY_SNIPPET_ID}.js`}></script>
      </Head>
      <OptimizelyProvider overrideExperiments={isMock ? MOCKS : undefined}>
        <OptimizelyExperiment experiment={EXPERIMENT_ID}>
          {(variation) => <>OptimizelyExperiment: {variation}</>}
        </OptimizelyExperiment>
        <br />
        <OptimizelyVariation experiment={EXPERIMENT_ID} variation={VARIATION1}>
          OptimizelyVariation: Variation 0
        </OptimizelyVariation>
        <OptimizelyVariation experiment={EXPERIMENT_ID} variation={VARIATION2}>
          OptimizelyVariation: Variation 1
        </OptimizelyVariation>
        <OptimizelyVariation experiment={EXPERIMENT_ID} variation={VARIATION3}>
          OptimizelyVariation: Variation 2
        </OptimizelyVariation>
        <OptimizelyTesterNested />
      </OptimizelyProvider>
    </>
  )
}

export default Optimizely
