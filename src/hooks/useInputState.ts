import React, { useState } from 'react';

// TODO
// Add support an other inputs types ("checkbox")
export default (initialState: any) => {
  const [state, setState] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return [state, onChange, setState];
};
