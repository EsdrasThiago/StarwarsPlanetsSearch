import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const contexto = useContext(MyContext);
  const { name,
    value,
    handleName,
    handleColumn,
    handleComparison,
    handleValue,
    columnOptions,
    delets,
    clearCallback,
    columnCallback,
    filterCallback,
  } = contexto;
  // const column = ['population',
  //   'orbital_period',
  //   'diameter',
  //   'rotation_period',
  //   'surface_water'];
  return (
    <section>
      <form>
        <input
          type="text"
          value={ name }
          onChange={ handleName }
          data-testid="name-filter"
        />
        <select
          data-testid="column-filter"
          onClick={ handleColumn }
        >
          {columnOptions.map((e) => (
            <option value={ e } key={ e }>{ e }</option>
          ))}
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
      {delets.map((e, i) => (
        <div key={ i } data-testid="filter">
          <p>{[`${e.column} ${e.comparison} ${e.value}`]}</p>
          <button
            type="button"
            onClick={ columnCallback }
            name={ e.column }
            value={ e.comparison }
            id={ e.value }
          >
            Limpar
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ clearCallback }
      >
        Remover todas as filtragens
      </button>
    </section>
  );
}

export default Filters;
