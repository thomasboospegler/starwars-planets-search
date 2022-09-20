import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { nameFilter, setNameFilter,
    filterByNumValue, setfilterByNumValue } = useContext(PlanetsContext);

  const options = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const operatorFilterOprions = ['maior que', 'menor que', 'igual a'];

  const [columnFilterOptions, setColumnFilterOptions] = useState(options);
  const [columnValue, setColumnValue] = useState(columnFilterOptions[0]);
  const [operatorValue, setOperatorValue] = useState(operatorFilterOprions[0]);
  const [filterValue, setFilterValue] = useState('0');

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
      <select
        data-testid="column-filter"
        onChange={ (({ target }) => setColumnValue(target.value)) }
      >
        { columnFilterOptions.map((option, index) => (
          <option key={ index } value={ option }>{option}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (({ target }) => setOperatorValue(target.value)) }
      >
        { operatorFilterOprions.map((option, index) => (
          <option key={ index } value={ option }>{option}</option>
        ))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => setFilterValue(target.value) }
        value={ filterValue }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          const optionIndex = columnFilterOptions.indexOf(columnValue);
          columnFilterOptions.splice(optionIndex, 1);
          setColumnFilterOptions(columnFilterOptions);
          return setfilterByNumValue({
            filterByNumericValues: [
              ...filterByNumValue.filterByNumericValues,
              {
                column: columnValue,
                comparison: operatorValue,
                value: filterValue,
              },
            ],
          });
        } }
      >
        Filtrar
      </button>
    </section>
  );
}
