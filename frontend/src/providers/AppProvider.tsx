import AppLayout from '@/components/AppLayout'
import { queryClient } from '@/lib/query-client'
import { MantineProvider } from '@mantine/core'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider >
        <BrowserRouter>
          <AppLayout>{children}</AppLayout>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
