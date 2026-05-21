import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TryOnProvider } from './context/TryOnContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TryOnProvider>
      <App />
    </TryOnProvider>
  </StrictMode>,
)
