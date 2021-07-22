import { useMachine } from '@xstate/react';
import React from 'react';
import { fetchMachine } from './fsmMachine';

const Fsm = () => {
  const [state, send] = useMachine(fetchMachine, { devTools: true });

  return (
    <>
      <pre>
        <code> {JSON.stringify(state.context, null, 2)}</code>
      </pre>
      <div className="btn btn-primary" onClick={() => send('FETCH')}>
        Start
      </div>
    </>
  );
};

export default Fsm;
