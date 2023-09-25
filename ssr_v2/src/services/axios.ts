import axios from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

export default $api
