import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import getPlanets from '../services/PlanetAPI';

function Provider({ children }) {
  const [originalPlanets, setOriginalPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [columnOptions, setColumnOptions] = useState([]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState(planets);
  const [delets, setDelets] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleFilters = (event) => {
    const { target } = event;
    const { name: columnFilter } = target;
    const deletedColumn = delets.filter((e) => (e.column === columnFilter ? null : e));
    const finalArray = [];
    setDelets(deletedColumn);
    if (deletedColumn.length > 0) {
      deletedColumn.filter((el) => {
        const filtredDelets = originalPlanets.filter((e) => {
          switch (el.comparison) {
          case 'maior que': return Number(e[el.column]) > Number(el.value) && e;
          case 'menor que': return Number(e[el.column]) < Number(el.value) && e;
          default: return Number(e[el.column]) === Number(el.value) && e;
          }
        });
        return finalArray.push(filtredDelets);
      });
      setPlanets(finalArray[0]);
      setFilter(finalArray[0]);
    } else {
      setFilter(originalPlanets);
      setPlanets(originalPlanets);
    }
    setColumnOptions([...columnOptions, target.name]);
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
    setOriginalPlanets(results);
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
    const filtredArray = { column, comparison, value };
    const columnDeleted = columnOptions.filter((e) => e !== column);
    setColumnOptions(columnDeleted);
    setDelets([...delets, filtredArray]);
    setColumn(columnOptions[0]);
    setFilter(filtrado);
    setPlanets(filtrado);
    setFiltered(true);
  };

  const columArraySave = () => {
    const columnArray = ['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];
    setColumnOptions(columnArray);
  };

  const clearAll = async () => {
    setDelets([]);
    setFiltered(false);
    setPlanets(originalPlanets);
    const columnArray = ['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];
    setColumnOptions(columnArray);
  };

  const clearCallback = useCallback(clearAll, [originalPlanets]);

  const columnCallback = useCallback(handleFilters, [originalPlanets,
    delets,
    columnOptions]);

  const filterCallback = useCallback(handleButton, [planets,
    comparison,
    value,
    column,
    columnOptions,
    delets,
  ]);

  useEffect(() => {
    planetsResult();
    columArraySave();
  }, []);

  const contextValue = useMemo(() => ({
    handleName,
    handleColumn,
    handleComparison,
    handleValue,
    clearCallback,
    columnCallback,
    filterCallback,
    filtered,
    filter,
    delets,
    planets,
    name,
    column,
    columnOptions,
    comparison,
    value,
  }), [name,
    planets,
    column,
    columnOptions,
    comparison,
    value,
    filter,
    filtered,
    delets,
    clearCallback,
    columnCallback,
    filterCallback]);

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
