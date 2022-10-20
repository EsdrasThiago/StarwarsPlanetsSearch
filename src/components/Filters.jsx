import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { name, handleName } = useContext(MyContext);
  return (
    <form>
      <input
        type="text"
        value={ name }
        onChange={ handleName }
        name="name"
        data-testid="name-filter"
      />
    </form>
  );
}

export default Filters;
