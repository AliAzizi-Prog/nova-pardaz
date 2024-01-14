import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { getCategories } from 'src/api/api'

const useGetCategories = () => {
  const [categories, setCategories] = useState([])
  const { runAsync: fetchCategories, loading: fetchCategoriesLoading } = useRequest(getCategories, {
    manual: true,
    onSuccess(data: any) {
      setCategories(data.data)
    },
    onError(error: any) {}
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    fetchCategories,
    fetchCategoriesLoading
  }
}
export default useGetCategories
