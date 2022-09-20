const PLANETS_LIST_URL = 'https://swapi.dev/api/planets';

const getPlanetsList = async () => {
  const response = await fetch(PLANETS_LIST_URL);
  const json = await response.json();
  console.log('chamou API');
  return json;
};

export default getPlanetsList;
