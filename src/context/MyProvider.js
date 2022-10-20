import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import getPlanets from '../services/PlanetAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState(['']);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const planetsResult = async () => {
    const { results } = await getPlanets();
    setPlanets(results);
  };

  useEffect(() => {
    planetsResult();
  }, []);

  const contextValue = useMemo(() => ({
    planets,
    name,
    handleName,
  }), [name, planets]);

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
