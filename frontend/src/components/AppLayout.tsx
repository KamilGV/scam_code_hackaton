import { Box, Container } from '@mantine/core'
import React from 'react'
import Header from './Header'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container mih='100vh' miw='100vw' p='0' m='0' style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box miw='100%' mih='100%' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1' }}>
        {children}
      </Box>
    </Container>
  )
}

export default AppLayout
