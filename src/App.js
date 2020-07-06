import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then( response => {
        console.log(response.data);
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Repositório ${Date.now()}`,
        owner: 'Wesley Maicon'
    });

    const repositorie = response.data;

    setRepositories([ ...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    const repositorieIndex = repositories.findIndex( repositorie => repositorie.id === id);

    if (repositorieIndex >= 0){
      repositories.splice(repositorieIndex, 1);
      setRepositories([ ...repositories]);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>

          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
