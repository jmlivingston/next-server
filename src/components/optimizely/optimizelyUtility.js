// OptimizelyProvider ancestor is required (see OptimizelyContext.js)
const getMocks = ({ experiment, isMock, variation }) => {
  const mocks = isMock
    ? {
        [experiment.toString()]: {
          variation: {
            id: variation,
            name: `Mock Variation: ${variation}`,
          },
          id: experiment.toString(),
          experimentName: `Mock Experiment: ${variation}`,
        },
      }
    : undefined
  return mocks
}

// eslint-disable-next-line import/prefer-default-export
export { getMocks }
