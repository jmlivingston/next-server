import lightMachine from './lightMachine'

const testLightMachine = lightMachine.withContext({
  elapsed: 1000,
  direction: 'north',
})

export default testLightMachine
