import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function TableContent() {
  const contexto = useContext(MyContext);
  const { planets, name, filter, filtered } = contexto;

  // useEffect(() => {

  // }, [name]);

  return (
    <tbody>
      {filtered ? filter.filter((el) => el.name.includes(name))
        .map((planet) => (
          <tr key={ planet.created }>
            <td value={ planet.name }>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))
        : planets?.filter((el) => el.name.includes(name))
          .map((planet) => (
            <tr key={ planet.created }>
              <td value={ planet.name }>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
    </tbody>
  );
}

export default TableContent;
