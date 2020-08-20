import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })  
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://programacaocriativa.com.br',
      techs: [
        "vue",
        "angular",
        "node"
      ],
      likes: 0
    };

    const response = await api.post('repositories', data);
    const repository = response.data;
    
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const find = repositories.findIndex(repository => repository.id === id);

    await api.delete(`repositories/${id}`);

    repositories.splice(find, 1);
    
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
