import React, { useState } from 'react';

// TODO
// Edit types and add generic type
export default (initialState: any) => {
  const [state, setState] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return [state, onChange, setState];
};
