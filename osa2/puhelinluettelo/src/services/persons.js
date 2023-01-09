import axios from 'axios'
const baseURL = '/api/persons'

const create = newObject => {
    return axios.post(baseURL, newObject)
}

const getAll = () => {
    return axios.get(baseURL)
}

const rem = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

export default {
    create: create,
    getAll: getAll,
    rem: rem,
    update: update
}