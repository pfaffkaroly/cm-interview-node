const PORT = 8080;
const API_URL = `http://localhost:${PORT}/api/v1`;

const ApiClient = {
  getPokemonsRandom: () => {
    return fetch(`${API_URL}/pokemon/random`, { method: 'get' })
      .then(response => response.clone().json());
  },

  upvotePokemon: (id) => {
    return fetch(`${API_URL}/pokemon/${id}/upvote`, { method: 'post' })
      .then(response => response.clone().json());
  },

  getPokemonToplist: (count = 10) => {
    return fetch(`${API_URL}/pokemon/top?count=${count}`, { method: 'get' })
      .then(response => response.clone().json());
  },

  resetPokemonToplist: () => {
    return fetch(`${API_URL}/pokemon/reset-votes`, { method: 'post' })
      .then(response => response.clone().json());
  },
}

export default ApiClient
