import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const contexto = useContext(MyContext);
  function deletColumn() {
    // target.value.remove();
  }
  const { name,
    value,
    handleName,
    handleColumn,
    handleComparison,
    handleValue,
    filterCallback,
  } = contexto;
  return (
    <form>
      <input
        type="text"
        value={ name }
        onChange={ handleName }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        onChange={ handleColumn }
        onClick={ deletColumn }
      >
        <option value="population" id="oi">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleComparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleValue }
        value={ value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterCallback }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
