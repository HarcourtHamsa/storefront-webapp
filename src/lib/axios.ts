import axios from "axios"

const env = process.env.NODE_ENV

const baseURL = {
    development: 'http://localhost:8000/api',
    test: 'http://localhost:8000/api',
    production: 'http://localhost:8000/api',
}

const instance = axios.create({
    baseURL: baseURL[env],
})

export default instance