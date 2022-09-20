import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { nameFilter, setNameFilter } = useContext(PlanetsContext);

  return (
    <section>
      <input
        data-testid="name-filter"
        onChange={ (event) => setNameFilter(event.target.value) }
        value={ nameFilter }
      />
    </section>
  );
}
