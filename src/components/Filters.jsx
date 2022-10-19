import React from 'react';

function Filters() {
  return (
    <form>
      <input
        type="text"
        // value={ name }
        onChange={ handleChange }
        name="name"
        data-testid="name-filter"
      />
    </form>
  );
}

export default Filters;
