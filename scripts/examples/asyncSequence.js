import { createMachine } from 'xstate'

function getUserInfo(context) {
  return fetch(`/api/users/${context.userId}`).then((response) =>
    response.json()
  )
}

// Returns a Promise
function getUserFriends(context) {
  const { friends } = context.user

  return Promise.all(
    friends.map((friendId) =>
      fetch(`/api/users/${friendId}/`).then((response) => response.json())
    )
  )
}

const friendsMachine = createMachine({
  id: 'friends',
  context: { userId: 42, user: undefined, friends: undefined },
  initial: 'gettingUser',
  states: {
    gettingUser: {
      invoke: {
        src: getUserInfo,
        onDone: {
          target: 'gettingFriends',
          actions: assign({
            user: (context, event) => event.data,
          }),
        },
      },
    },
    gettingFriends: {
      invoke: {
        src: getUserFriends,
        onDone: {
          target: 'success',
          actions: assign({
            friends: (context, event) => event.data,
          }),
        },
      },
    },
    success: {
      type: 'final',
    },
  },
})

export default friendsMachine
