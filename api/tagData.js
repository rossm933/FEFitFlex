const endpoint = 'https://localhost:7185';

const getAllTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tag`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleTag = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tag/${id}`, {
    method: 'GET',
    headers: {
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tag`, {
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

const updateTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tag/${payload.id}`, {
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

const deleteTag = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tag/${id}`, {
    method: 'DELETE',
    headers: {
      'Conent-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllTags, getSingleTag, createTag, updateTag, deleteTag,
};
