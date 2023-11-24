import { AUTH_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { setToken } from '@/lib/token'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const login = async ({ email, password }: { email: string; password: string }) => {
  const res = await $fetch.post(AUTH_API_URL + '/login', { email, password })
  return res.data
}

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation(['login'], login, {
    onSuccess: (res) => {
      setToken(res.token)
      navigate('/courses', { replace: true })
    },
    onError: (error: any) => {
      console.log(error)
    },
  })
}
