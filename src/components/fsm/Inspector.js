import { inspect } from '@xstate/inspect';
import React from 'react';

const Inspector = ({ newWindow }) => {
  if (typeof window !== 'undefined') {
    inspect({ iframe: newWindow ? false : () => document.getElementById('fsm-iframe') });
  }

  return newWindow ? null : (
    <iframe
      id="fsm-iframe"
      src="https://statecharts.io/inspect"
      width="100%"
      height="100vh"
      style={{ height: '100vh' }}
    ></iframe>
  );
};

export default Inspector;
