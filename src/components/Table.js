import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Table.css';

export default function List() {
  const { planetsList, nameFilter,
    filterByNumValue, sortOptions } = useContext(PlanetsContext);
  const sortHelpNumber = -1;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { planetsList
          .filter((planet) => planet.name.includes(nameFilter.filterByName.name))
          .filter((planet) => filterByNumValue.filterByNumericValues.map((value) => {
            switch (value.comparison) {
            case 'maior que':
              return +planet[value.column] > +value.value;
            case 'menor que':
              return +planet[value.column] < +value.value;
            case 'igual a':
              return +planet[value.column] === +value.value;
            default:
              return false;
            }
          }).every((item) => item === true))
          .sort((a, b) => {
            switch (sortOptions.order.sort) {
            case 'ASC':
              if (a[sortOptions.order.column] === 'unknown') return 1;
              return +a[sortOptions.order.column] > +b[sortOptions.order.column]
                ? 1 : sortHelpNumber;
            case 'DESC':
              return +a[sortOptions.order.column] > +b[sortOptions.order.column]
                ? sortHelpNumber : 1;
            default:
              return false;
            }
          })
          .map((planet, index) => (
            <tr key={ `${planet.name}-${index}` }>
              { console.log(planet.films) }
              <td data-testid="planet-name">{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td className="films">
                { planet.films.map((film) => (
                  <p key={ film }>{ film }</p>
                )) }
              </td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) }
      </tbody>
    </table>
  );
}
