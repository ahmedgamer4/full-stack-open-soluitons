import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const obj = { content, votes: 0 }
  const res = await axios.post(baseUrl, obj)
  console.log(res.data)
  return res.data
}

const update = async (anec) => {
  const res = await axios.put(`${baseUrl}/${anec.id}`, anec)
  return res.data
}

const anecService = { getAll, createNew, update }
export default anecService