import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Title from './components/Title';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <Title />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
