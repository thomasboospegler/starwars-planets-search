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
      <div>
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
            setfilterByNumValue({
              filterByNumericValues: [
                ...filterByNumValue.filterByNumericValues,
                {
                  column: columnValue,
                  comparison: operatorValue,
                  value: filterValue,
                },
              ],
            });
            setColumnValue(columnFilterOptions[0]);
            setOperatorValue(operatorFilterOprions[0]);
            setFilterValue('0');
          } }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setfilterByNumValue({ filterByNumericValues: [] });
            setColumnFilterOptions(options);
          } }
        >
          Remover Filtros
        </button>
      </div>
      <div>
        {filterByNumValue.filterByNumericValues
          .map(({ column, comparison, value }, index) => (
            <div key={ index } data-testid="filter">
              <span>{`${column} ${comparison} ${value}`}</span>
              <button
                type="button"
                onClick={ () => {
                  const filters = filterByNumValue.filterByNumericValues
                    .filter((filter) => filter.column !== column);
                  console.log(filters);
                  setfilterByNumValue({ filterByNumericValues: filters });
                  setColumnFilterOptions([...columnFilterOptions, column]);
                } }
              >
                🗑
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
