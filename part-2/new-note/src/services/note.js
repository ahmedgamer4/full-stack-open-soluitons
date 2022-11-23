import axios from "axios";

const baseUrl = 'http://localhost:3003/api/notes'

export const getAll = () => {
  const request = axios.get(baseUrl)
                       .catch(error => console.log('fail')) 
  return request.then(response => response.data)
}

export const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
                       .catch(error => console.log('fail')) 
  return request.then(response => response.date)
}

export const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
                       .catch(error => console.log('fail')) 
  return request.then(response => response.data) 
}

