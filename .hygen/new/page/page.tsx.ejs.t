---
to: <%= path %>/<%= pageName %>.tsx
---
import React from 'react';
import cl from './<%= pageName %>.module.scss';

interface I<%= pageName %> {

}

const <%= pageName %>: React.FC<I<%= pageName %>> = () => {
  return (
    <>

    </>
  );
};

export default <%= pageName %>;