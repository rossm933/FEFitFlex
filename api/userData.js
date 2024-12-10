const endpoint = 'https://localhost:7185';

const getUserDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${id}`, {
    method: 'GET',
    headers: {
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export { getUserDetails, deleteUser };
