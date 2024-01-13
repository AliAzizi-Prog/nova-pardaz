import axios from "axios"
import { urls } from "./urls"

export const createProduct = ({body}:any) =>{
  return axios.post(urls.CREATE_PRODUCT, body)
}
