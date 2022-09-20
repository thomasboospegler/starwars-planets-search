import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { nameFilter, setNameFilter } = useContext(PlanetsContext);

  return (
    <section>
      <input
        data-testid="name-filter"
        onChange={ (event) => setNameFilter({
          filterByName: {
            name: event.target.value,
          },
        }) }
        value={ nameFilter.filterByName.name }
      />
    </section>
  );
}
