import lightMachine from './lightMachine'

const noAlertLightMachine = lightMachine.withConfig({
  actions: {
    alertGreen: (context, event) => {
      console.log('green')
    },
  },
})

export default noAlertLightMachine
