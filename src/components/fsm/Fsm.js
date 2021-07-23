import { useMachine } from '@xstate/react';
import React from 'react';
import { fsmMachine } from './fsmMachine';

const Fsm = () => {
  const [state, send] = useMachine(fsmMachine, { devTools: true });

  return (
    <>
      {/* <pre>
        <code> {JSON.stringify(state.context, null, 2)}</code>
      </pre> */}
      <div className="btn btn-primary mb-3" onClick={() => send('FETCH')}>
        Start
      </div>
    </>
  );
};

export default Fsm;
