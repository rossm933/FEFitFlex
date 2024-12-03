const endpoint = 'https://localhost:7185';

const getAllExercises = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/exercise`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleExercise = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/exercise/${id}`, {
    method: 'GET',
    headers: {
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createExercise = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/exercise`, {
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

const updateExercise = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/exercise/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteExercise = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/exercise/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getAllExercises, getSingleExercise, createExercise, updateExercise, deleteExercise,
};
