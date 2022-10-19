import { createContext } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/PlanetAPI';

export const MyContext = createContext({});

const planetsResult = async () => {
  const { results } = await getPlanets();
  return results;
};

// const [name, setName] = useState('');

const handleChange = (event) => {
  const { target } = event;
  event.preventDefault();
  setName(target.value);
};

const contextValue = {
  planetsResult,
  // name,
  handleChange,
};

function Provider({ children }) {
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
