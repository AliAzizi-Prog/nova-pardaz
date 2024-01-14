import { useRequest } from 'ahooks'
import { useState } from 'react'
import { createProduct } from 'src/api/api'

const useCreateProduct = () => {
  const [product, setProduct] = useState()
  const { runAsync: postProductData, loading: postProductDataLoading } = useRequest(createProduct, {
    manual: true,
    onSuccess(data: any) {
      setProduct(data)
    },
    onError(error: any) {}
  })

  return {
    product,
    postProductDataLoading,
    postProductData
  }
}
export default useCreateProduct
