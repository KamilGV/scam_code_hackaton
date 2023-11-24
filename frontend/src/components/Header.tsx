import { Box, Button, Container, Flex } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <Container miw='100%' mah='100px' h='100%' p='sm' m='0' style={{ borderBottom: '1px solid black' }}>
      <Flex justify='space-between' align='center'>
        <Flex gap='10rem'>
          <Box>Лого</Box>
          <Box>Каталог</Box>
        </Flex>

        <Flex gap='sm'>
          <Button variant='subtle' onClick={() => navigate('/login')}>
            Логин
          </Button>
          <Button variant='filled' onClick={() => navigate('/signup')}>
            Регистрация
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Header
