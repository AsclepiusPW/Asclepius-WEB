// ***Importações
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ***Importando páginas do sistema
import { LeadingPage } from './pages/LeadingPage-Page/index.tsx'
import { UserProfilePage } from './pages/UserProfile-Page/index.tsx'
import { HomePage } from './pages/HomePage-Page/index.tsx'

// ***Criando rotas
const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <LeadingPage/>
      },
      {
        path: "/home",
        element: <HomePage/>
      },
      {
        path: "/user",
        element: <UserProfilePage/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
