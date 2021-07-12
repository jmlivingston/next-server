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

const getVariables = ({ experiment, isMock }) => {
  const variation = Object.values(
    OPTIMIZELY_EXPERIMENTS?.[experiment]?.variations
  )?.[0]?.id
  const mocks = getMocks({ experiment, variation })
  const activeExperiment = OPTIMIZELY_EXPERIMENTS?.[experiment]

  const variations = Object.entries(activeExperiment.variations).reduce(
    (acc, [key, variation]) => ({ ...acc, [key]: variation.id }),
    {}
  )

  return {
    MOCKS: isMock ? mocks : undefined,
    EXPERIMENTS: isMock
      ? {
          [mocks?.[experiment]?.id]: {
            EXPERIMENT_ID: mocks?.[experiment]?.id,
            VARIATIONS: variations,
          },
        }
      : {
          [activeExperiment?.id]: {
            EXPERIMENT_ID: activeExperiment?.id,
            VARIATIONS: variations,
          },
        },
  }
}

export { getVariables }
