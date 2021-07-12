import { OPTIMIZELY_EXPERIMENTS } from './CONSTANTS'

const getMocks = ({ experiment, variation }) => ({
  [experiment.toString()]: {
    variation: {
      id: variation,
      name: `Mock Variation: ${variation}`,
    },
    isActive: true,
    id: experiment.toString(),
    experimentName: `Mock Experiment: ${experiment}`,
  },
})

const getVariables = ({ isMock, experiment, variation }) => {
  const mocks = getMocks({ experiment, variation })
  const activeExperiment = OPTIMIZELY_EXPERIMENTS?.[experiment]

  return {
    MOCKS: isMock ? mocks : undefined,
    EXPERIMENTS: isMock
      ? {
          [mocks?.[experiment]?.id]: {
            EXPERIMENT_ID: mocks?.[experiment]?.id,
            VARIATION1: 201,
            VARIATION2: 202,
            VARIATION3: 203,
          },
        }
      : {
          [activeExperiment?.id]: {
            EXPERIMENT_ID: activeExperiment?.id,
            VARIATION1:
              activeExperiment.variations[
                process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION1
              ].id,
            VARIATION2:
              activeExperiment.variations[
                process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION2
              ].id,
            VARIATION3:
              activeExperiment.variations[
                process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION3
              ].id,
          },
        },
  }
}

export { getVariables }
