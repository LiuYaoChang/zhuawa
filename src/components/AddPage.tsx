import React, { useState } from 'react';

import store from '../store/index';

export default function AddPage() {
  const nextState = store.getState();
  const [count, setCount] = useState<number>(nextState.count);
  store.subscribe(() => {
    const nextState = store.getState();
    setCount(nextState.count);
  })
  function add() {
    store.dispatch({ type: 'increament' })
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => add()}>ADD</button>
      </div>
  )
}