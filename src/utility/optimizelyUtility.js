import { OPTIMIZELY_EXPERIMENTS } from './CONSTANTS'
const getMocks = ({ experiment, variation }) => ({
  [experiment]: {
    variation: {
      id: variation,
      name: 'Bar',
    },
    isActive: true,
    id: experiment.toString(),
    experimentName: 'Foo',
  },
})

const getVariables = ({ isMock, experiment = 123, variation = 456 }) => {
  const mocks = getMocks({ experiment, variation })
  return {
    MOCKS: isMock ? mocks : undefined,
    EXPERIMENT_ID: isMock
      ? mocks?.[123]?.id
      : OPTIMIZELY_EXPERIMENTS[process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT]
          .id,
    VARIATION1: isMock
      ? mocks?.[456]?.variation?.id
      : OPTIMIZELY_EXPERIMENTS[process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT]
          .variations[process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION1].id,
    VARIATION2: isMock
      ? mocks?.[789]?.variation?.id
      : OPTIMIZELY_EXPERIMENTS[process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT]
          .variations[process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION2].id,
    VARIATION3: isMock
      ? mocks?.[101]?.variation?.id
      : OPTIMIZELY_EXPERIMENTS[process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT]
          .variations[process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION3].id,
  }
}

export { getVariables }
