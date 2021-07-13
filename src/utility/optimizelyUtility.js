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

const getVariables = ({ config, experiment, isMock }) => {
  const mocks = isMock
    ? getMocks({
        experiment,
        variation: Object.keys(
          config.experiments?.[experiment]?.variations
        )?.[0],
      })
    : undefined

  return { mocks, ...config }
}

export { getVariables }
