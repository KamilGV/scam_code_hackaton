import LoginPage from '@/features/auth/routes/LoginPage'
import SignupPage from '@/features/auth/routes/SignupPage'
import CatalogPage from '@/features/courses/routes/CatalogPage'
import { getToken } from '@/lib/token'
import { Navigate, Route, Routes } from 'react-router-dom'

// Public Route Guard
// used to redirect from login and register page if
// user is authorized
const PublicRoute = (props: any) => {
  const token = getToken()

  return token ? <Navigate to='/' replace /> : props.children
}

// Private Route Guard
// used to redirect to login page if
// user is NOT authorized
const PrivateRoute = (props: any) => {
  const token = getToken()

  return !token ? <Navigate to='/login' replace /> : props.children
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<div>Not found</div>} />
      <Route path='/' element={<Navigate replace to='/courses' />} />

      <Route
        path='/login'
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path='/signup'
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route
        path='/courses'
        element={
          <PrivateRoute>
            <CatalogPage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
