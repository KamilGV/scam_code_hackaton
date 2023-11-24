import { Box, Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
import { useSignup } from '../api/signup'

export type SignupForm = {
  email: string
  password: string
  login: string
  confirmPassword: string
}

const SignupPage = () => {
  const { mutate } = useSignup()
  const form = useForm<SignupForm>({
    initialValues: {
      email: '',
      login: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      confirmPassword: (value, values) => (value === values.password ? null : 'Пароли не совпадают'),
    },
  })

  const handleSubmit = (values: SignupForm) => {
    mutate({ email: values.email, password: values.password })
  }

  return (
    <Stack align='center' justify='center' w='100%' h='100%'>
      <Stack
        component='form'
        w='100%'
        maw='400px'
        h='100%'
        align='center'
        justify='center'
        style={{ alignItems: 'center', justifyContent: 'center', flex: '1' }}
        onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder='Введите email...' w='100%' {...form.getInputProps('email')} />
        <TextInput placeholder='Введите логин...' w='100%' {...form.getInputProps('login')} />
        <PasswordInput placeholder='Введите пароль...' w='100%' {...form.getInputProps('password')} />
        <PasswordInput placeholder='Повторите пароль...' w='100%' {...form.getInputProps('confifmPassword')} />
        <Button type='submit'>Регистрация</Button>
      </Stack>
      <Box>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </Box>
    </Stack>
  )
}

export default SignupPage
