import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import getPlanets from '../services/PlanetAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [columnIndex, setColumnIndex] = useState(0);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState(planets);
  const [filtered, setFiltered] = useState(false);

  const handleColumn = ({ target }) => {
    setColumn(target.value);
    setColumnIndex(target.selectedIndex);
  };

  const handleComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleValue = ({ target }) => {
    setValue(target.value);
  };

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const planetsResult = async () => {
    const { results } = await getPlanets();
    setPlanets(results);
  };

  const handleButton = (event) => {
    const filtrado = planets.filter((e) => {
      switch (comparison) {
      case 'maior que': return Number(e[column]) > Number(value);
      case 'menor que': return Number(e[column]) < Number(value);
      default: return Number(e[column]) === Number(value);
      }
    });
    setFilter(filtrado);
    setPlanets(filtrado);
    setFiltered(true);
    console.log(event.nativeEvent.path[1][1]);
    console.log(column);
    return event.nativeEvent.path[1][1][columnIndex].remove();
  };

  const filterCallback = useCallback(handleButton, [planets,
    comparison,
    value,
    column,
    columnIndex,
  ]);

  useEffect(() => {
    planetsResult();
  }, []);

  const contextValue = useMemo(() => ({
    handleName,
    handleColumn,
    handleComparison,
    handleValue,
    filterCallback,
    filtered,
    filter,
    planets,
    name,
    column,
    comparison,
    value,
  }), [name, planets, column, comparison, value, filter, filtered, filterCallback]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
