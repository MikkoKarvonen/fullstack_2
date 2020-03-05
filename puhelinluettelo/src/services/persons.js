import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = newObject => {
  return axios.post(baseUrl, newObject);
};

const del = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => {
      return true;
    })
    .catch(error => {
      return false;
    });
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  del: del
};
