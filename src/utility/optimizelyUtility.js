import { OPTIMIZELY_EXPERIMENTS } from './CONSTANTS'

const getMocks = ({ experiment, variation }) => ({
  [experiment]: {
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
  return {
    MOCKS: isMock ? mocks : undefined,
    EXPERIMENT_ID: isMock
      ? mocks?.[experiment]?.id
      : OPTIMIZELY_EXPERIMENTS?.[experiment]?.id,
    VARIATION1: isMock
      ? 201
      : OPTIMIZELY_EXPERIMENTS?.[experiment]?.variations[
          process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION1
        ].id,
    VARIATION2: isMock
      ? 202
      : OPTIMIZELY_EXPERIMENTS?.[experiment]?.variations[
          process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION2
        ].id,
    VARIATION3: isMock
      ? 203
      : OPTIMIZELY_EXPERIMENTS?.[experiment]?.variations[
          process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION3
        ].id,
  }
}

export { getVariables }
