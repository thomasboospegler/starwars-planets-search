import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import result from './mocks/fetchResponse';
import App from '../App';

describe('test the component <App.js />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(result),
    });
  });
  afterEach(() => jest.clearAllMocks());

  it('should have a title', () => {
    render(<App />);
    const title = screen.getByText(/Star Wars/i);
    expect(title).toBeInTheDocument();
  });

  it('should have a table with the StarWars planets', () => {
    render(<App />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    waitFor(() => {
      const planet = screen.getByText(/Tatooine/i);
      const secondPlanet = screen.getByText(/Alderaan/i);
      const thirdPlanet = screen.getByText(/Yavin IV/i);

      expect(planet).toBeInTheDocument();
      expect(secondPlanet).toBeInTheDocument();
      expect(thirdPlanet).toBeInTheDocument();
    });
  });

  it('test the filters', async () => {
    render(<App />);
    await waitFor(() => {
      const planet = screen.getByText(/Tatooine/i);
      expect(planet).toBeInTheDocument();
    });
    const filterByNameElement = screen.getByTestId('name-filter');
    const filterByColumnElement = screen.getByTestId('column-filter');
    const filterByComparisonElement = screen.getByTestId('comparison-filter');
    const filterByValueElement = screen.getByTestId('value-filter');
    const filterButtonElement = screen.getByTestId('button-filter');
    const removeAllFilterButtonElement = screen.getByTestId('button-filter');

    expect(filterByNameElement).toBeInTheDocument();
    expect(filterByColumnElement).toBeInTheDocument();
    expect(filterByComparisonElement).toBeInTheDocument();
    expect(filterByValueElement).toBeInTheDocument();
    expect(filterButtonElement).toBeInTheDocument();
    expect(removeAllFilterButtonElement).toBeInTheDocument();

    userEvent.selectOptions(filterByColumnElement, 'population');
    userEvent.selectOptions(filterByComparisonElement, 'maior que');
    userEvent.type(filterByValueElement, '100000');
    userEvent.click(filterButtonElement);

    const removeFilterButton = screen.getByTestId('button-remove-filter');
    expect(removeFilterButton).toBeInTheDocument();
    userEvent.click(removeFilterButton);

    userEvent.selectOptions(filterByColumnElement, 'population');
    userEvent.selectOptions(filterByComparisonElement, 'menor que');
    userEvent.type(filterByValueElement, '1000000');
    userEvent.click(filterButtonElement);

    userEvent.selectOptions(filterByColumnElement, 'rotation_period');
    userEvent.selectOptions(filterByComparisonElement, 'igual a');
    userEvent.type(filterByValueElement, '24');
    userEvent.click(filterButtonElement);

    const planets = screen.getAllByRole('row');
    expect(planets).toHaveLength(2);

    const planet = screen.queryByText(/Tatooine/i);
    const secondPlanet = screen.getByText(/Yavin/i);

    expect(planet).not.toBeInTheDocument();
    expect(secondPlanet).toBeInTheDocument();

    userEvent.click(removeAllFilterButtonElement);
  });

  it('test the sort', async () => {
    render(<App />);

    await waitFor(() => {
      const secondPlanet = screen.getByText(/Yavin/i);
      expect(secondPlanet).toBeInTheDocument();
    });

    const sortByColumnElement = screen.getByTestId('column-sort');
    const sortByASCElement = screen.getByTestId('column-sort-input-asc');
    const sortByDESCElement = screen.getByTestId('column-sort-input-desc');
    const sortButtonElement = screen.getByTestId('column-sort-button');

    expect(sortByColumnElement).toBeInTheDocument();
    expect(sortByASCElement).toBeInTheDocument();
    expect(sortByDESCElement).toBeInTheDocument();
    expect(sortButtonElement).toBeInTheDocument();

    userEvent.selectOptions(sortByColumnElement, 'population');
    userEvent.click(sortByDESCElement);
    userEvent.click(sortButtonElement);

    userEvent.click(sortByASCElement);
    userEvent.click(sortButtonElement);
  });
});
