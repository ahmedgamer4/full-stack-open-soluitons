import axios from "axios";

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const obj = { content, important: false}
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const update = async (note, id) => {
  const res = await axios.put(`${baseUrl}/${id}`, note)
  return res.data
}

const noteService = { getAll, createNew, update }
export default noteService