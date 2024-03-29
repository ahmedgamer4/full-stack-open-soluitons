import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const res = await axios.post(baseUrl, newObject, config)
	return res.data
}

const update = async (id, updatedObject) => {
	const res = await axios.put(`${baseUrl}/${id}`, updatedObject)
	return res.data
}

const deleteOne = async (id) => {
	const config = {
		headers: { Authorization: token },
	}

	const res = await axios.delete(`${baseUrl}/${id}`, config)
	return res.data
}

const blogService = { getAll, create, update, setToken, deleteOne }

export default blogService
