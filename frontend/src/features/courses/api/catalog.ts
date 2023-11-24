import { AUTH_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { useMutation } from 'react-query'

const getCatalog = async () => {
  const res = await $fetch.get(AUTH_API_URL + '/catalog')
  return res.data
}

export const useCatalog = () => {
  return useMutation(['catalog'], getCatalog, {
    onSuccess: (res) => {},
    onError: (error: any) => {
      console.log(error)
    },
  })
}
