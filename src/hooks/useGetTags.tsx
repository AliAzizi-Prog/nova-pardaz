import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { getTags } from 'src/api/api'

const useGetTags = () => {
  const [tags, setTags] = useState([])
  const { runAsync: fetchTags, loading: fetchTagsLoading } = useRequest(getTags, {
    manual: true,
    onSuccess(data: any) {
      setTags(data.data)
    },
    onError(error: any) {}
  })

  useEffect(() => {
    fetchTags()
  }, [])

  return {
    tags,
    fetchTags,
    fetchTagsLoading
  }
}
export default useGetTags
