import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import getPlanets from '../services/PlanetAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState(planets);
  const [filtered, setFiltered] = useState(false);

  const handleColumn = ({ target }) => {
    setColumn(target.value);
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

  const handleButton = () => {
    const filtrado = planets.filter((e) => {
      switch (comparison) {
      case 'maior que': return Number(e[column]) > Number(value);
      case 'menor que': return Number(e[column]) < Number(value);
      default: return Number(e[column]) === Number(value);
      }
    });
    setFilter(filtrado);
    setFiltered(true);
  };

  const filterCallback = useCallback(handleButton, [planets, comparison, value, column]);

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
  children: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Provider;
