import axios from 'axios'
import { urls } from './urls'

import replaceParameters from 'src/utils/replaceParameters'

export const createProduct = (body: any) => {
  return axios.post(urls.CREATE_PRODUCT, body)
}

export const getCategories = () => {
  return axios.get(urls.GET_CATEGORIES)
}

export const getTags = () => {
  return axios.get(urls.GET_TAGS)
}

//get all products
export const getAllProduct = () => {
  return axios.get(urls.GET_ALL_PRODUCT)
}

//delete products
export const deleteProducts = (id: number) => {
  return axios.delete(replaceParameters(urls.DELETE_PRODUCT, { product_id: id }))
}
