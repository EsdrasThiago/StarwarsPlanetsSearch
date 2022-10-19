const getPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getPlanets;
