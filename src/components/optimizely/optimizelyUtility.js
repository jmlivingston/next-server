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

const isVariationActive = ({
  config,
  experiment,
  sourceVariation,
  targetVariation,
}) => {
  const isActive =
    sourceVariation ===
    config.experiments[experiment].variations[targetVariation].name
  return isActive
}

export { getMocks, isVariationActive }
