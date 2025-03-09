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
import { UserEditPage } from './pages/UserEdit-Page/index.tsx'
import { UpdatePasswordPage } from './pages/UpdatePassword-Page/index.tsx'
import { RequestVaccinationPage } from './pages/RequestVaccination-Page/index.tsx'
import { VaccinesPage } from './pages/Vaccines-Page/index.tsx'
import { EventsPages } from './pages/Events-Page/index.tsx'
import { RegisterVaccinationPage } from './pages/RegisterVaccination-Page/index.tsx'
import { VaccineDetailsPage } from './pages/VaccineDetails-Page/index.tsx'
import { ErrorPage } from './pages/Error-Page/index.tsx'
import { EventDetailsPage } from './pages/EventDetails-Page/index.tsx'

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
        path: "/password",
        element: <UpdatePasswordPage/>
      },
      {
        path: "/home",
        element: <HomePage/>
      },
      {
        path: "/user",
        element: <UserProfilePage/>
      },
      {
        path: "/edit",
        element: <UserEditPage/>
      },
      {
        path: "/requestVaccination",
        element: <RequestVaccinationPage/>
      },
      {
        path: "/registerVaccination",
        element: <RegisterVaccinationPage/>
      },
      {
        path: "/vaccine",
        element: <VaccinesPage/>
      },
      {
        path: "/vaccine/:id",
        element: <VaccineDetailsPage/>
      },
      {
        path: "/event",
        element: <EventsPages/>
      },
      {
        path: "/event/:id",
        element: <EventDetailsPage/> 
      },
      {
        path: "*",
        element: <ErrorPage/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
