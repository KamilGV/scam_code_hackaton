import { Button, Flex, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLogin } from '../api/login'

export type LoginForm = {
  email: string
  password: string
}

const LoginPage = () => {
  const { mutate } = useLogin()
  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleSubmit = (values: LoginForm) => {
    mutate({ password: values.password, email: values.email })
  }

  return (
    <Flex align='center' justify='center' w='100%' h='100%'>
      <Stack
        component='form'
        w='100%'
        maw='400px'
        h='100%'
        align='center'
        justify='center'
        style={{ flex: '1' }}
        onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder='Введите email...' w='100%' {...form.getInputProps('email')} />
        <PasswordInput placeholder='Введите пароль...' w='100%' {...form.getInputProps('password')} />
        <Button type='submit'>Логин</Button>
      </Stack>
    </Flex>
  )
}

export default LoginPage
