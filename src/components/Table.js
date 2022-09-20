import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function List() {
  const { planetsList, nameFilter, filterByNumValue } = useContext(PlanetsContext);

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
          .map((planet, index) => (
            <tr key={ `${planet.name}-${index}` }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) }
      </tbody>
    </table>
  );
}
