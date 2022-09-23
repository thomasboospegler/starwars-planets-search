import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Title from './components/Title';
import Table from './components/Table';
import './styles/App.css';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsProvider>
      <Title />
      <main>
        <Filters />
        <Table />
      </main>
    </PlanetsProvider>
  );
}

export default App;
