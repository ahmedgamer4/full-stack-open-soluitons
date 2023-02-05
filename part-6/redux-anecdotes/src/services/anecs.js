import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = axios.get(baseUrl)
  return res.data
}

const anecService = { getAll }
export default anecService