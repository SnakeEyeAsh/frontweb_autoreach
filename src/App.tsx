import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Gestiones from './pages/Gestiones'
import NuevaCita from './pages/NuevaCita'
import Docs from './pages/Docs'

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
