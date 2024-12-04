const endpoint = 'https://localhost:7185';

const getAllUserWorkouts = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/workout/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleWorkout = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/workout/${id}`, {
    method: 'GET',
    headers: {},
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createWorkout = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/workout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateWorkout = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/workout/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteWorkout = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/workout/${id}`, {
    method: 'DELETE',
    headers: {
      'Conent-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllUserWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout,
};
