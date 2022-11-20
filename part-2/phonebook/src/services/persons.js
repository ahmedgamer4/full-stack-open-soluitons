import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
                       .catch(err => console.log('error'))
  return request.then(response => response.data)
}

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj)
                       .catch(console.log('post error'))

  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
                       .catch('cannot remove this element')
  return request.then(response => response.data)
}

const libBackend = {getAll, create, remove}
export default libBackend