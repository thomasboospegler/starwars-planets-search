import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Title from './components/Title';
import Table from './components/Table';
import './App.css';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsProvider>
      <Title />
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
