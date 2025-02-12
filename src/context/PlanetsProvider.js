import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetsList from '../services/planetsAPI';
import PlanetContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [nameFilter, setNameFilter] = useState({ filterByName: { name: '' } });
  const [filterByNumValue, setfilterByNumValue] = useState({ filterByNumericValues: [] });
  const [sortOptions, setSortOptions] = useState({ order: {} });

  const fetchPlanetsList = async () => {
    setIsFetching(true);
    try {
      const response = await getPlanetsList();
      delete response.results.residents;
      setPlanetsList(response.results);
      setIsFetching(false);
    } catch (errorMsg) {
      setError(errorMsg);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPlanetsList();
  }, []);

  const contextType = {
    planetsList,
    isFetching,
    error,
    nameFilter,
    filterByNumValue,
    sortOptions,
    fetchPlanetsList,
    setNameFilter,
    setfilterByNumValue,
    setSortOptions,
  };

  return (
    <PlanetContext.Provider value={ contextType }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
