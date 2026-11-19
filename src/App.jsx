import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/useAuth.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import MainLayout from './layout/MainLayout.jsx'
import AuthPage from './pages/AuthPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { PathsPage, ResourcesPage } from './pages/Pages.jsx'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="signup" />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/paths" element={<PathsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App
