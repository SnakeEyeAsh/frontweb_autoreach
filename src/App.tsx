import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Gestiones from './pages/Gestiones'
import NuevaCita from './pages/NuevaCita'
import Docs from './pages/Docs'

function AppShell() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestiones" element={<Gestiones />} />
          <Route path="/nueva-cita" element={<NuevaCita />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
