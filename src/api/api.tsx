import axios from 'axios'
import { urls } from './urls'

export const createProduct = (body: any) => {
  return axios.post(urls.CREATE_PRODUCT, body)
}

export const getCategories = () => {
  return axios.get(urls.GET_CATEGORIES)
}

export const getTags = () => {
  return axios.get(urls.GET_TAGS)
}
