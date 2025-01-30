import axios from 'axios'

const url = '/api/phone'

const creation = (object) => {
    const req = axios.post(url,object)
    return req.then(response=>response.data)
}

const download = () => {
    const req = axios.get(url)
    return req.then(response=>response.data)
}

const deletion = (id) => {
    const req = axios.delete(`${url}/${id}`)
    return req.then(response=>response.data)
}

const updation = (object) => {
    const req = axios.put(`${url}/${object.id}`,object)
    return req.then(response=>{
        return response.data})
}

export default {creation, download, deletion, updation}