const baseUrl = 'https://pimnovapardaz.darkube.app/api/product/'

export const urls = {
  CREATE_PRODUCT: baseUrl + 'create_product',
  GET_CATEGORIES: baseUrl + 'retrieve_all_categories',
  GET_TAGS: baseUrl + 'retrieve_tags',
  GET_ALL_PRODUCT: baseUrl + 'retrieve_all_products',
  DELETE_PRODUCT: baseUrl + 'delete_product_by_id?product_id=:product_id'
}
