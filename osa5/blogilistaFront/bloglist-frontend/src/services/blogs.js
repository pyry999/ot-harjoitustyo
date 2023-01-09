import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  console.log('WW')
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  console.log('QQ')
  console.log(request)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request
}

export default { getAll, create, update, setToken, remove }