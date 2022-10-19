import { createContext } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/PlanetAPI';

export const MyContext = createContext({});

const planetsResult = async () => {
  const { results } = await getPlanets();
  return results;
};

const contextValue = {
  planetsResult,
};

function Provider({ children }) {
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};

export default Provider;
