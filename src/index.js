import { useState } from 'react';
/* eslint no-underscore-dangle */
const useStateWithVersion = (initialState, initialVersion) => {
  initialState.__INTERNAL__VERSION = initialVersion || 0;
  const [state, setState] = useState(initialState);

  const setVersionedState = _state => {

    if (state.__INTERNAL__VERSION > _state.__INTERNAL__VERSION) {
      throw new Error(`OptimisticLock: existing version is more recent than old one: ${JSON.stringify(state)} \n new one: ${JSON.stringify(_state)}`);
    }
    _state.__INTERNAL__VERSION = _state.__INTERNAL__VERSION + 1;
    setState(_state);
  };

  return [state, setVersionedState];
};

export default useStateWithVersion;
