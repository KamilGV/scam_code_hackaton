import { AUTH_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { useMutation } from 'react-query'

const signup = async ({ email, password }: { email: string; password: string }) => {
  const res = await $fetch.post(AUTH_API_URL + '/signup', { email, password })
  return res.data
}

export const useSignup = () => {
  return useMutation(['signup'], signup, {
    onSuccess: (res) => {
     console.log("Ok")
    },
    onError: (error: any) => {
      console.log(error)
    },
  })
}