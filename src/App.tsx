// ***Importações
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { register } from "swiper/element/bundle";

// ***Contextos
import { AuthProvider } from "./Contexts/AuthContext";
import { UserProvider } from "./Contexts/UserContext";

register();
import 'swiper/swiper-bundle.css';
import { VaccineProvider } from "./Contexts/VaccineContext";
import { EventProvider } from "./Contexts/EventContext";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <VaccineProvider>
            <EventProvider>
              <Outlet />
              <ToastContainer theme="dark" />
            </EventProvider>
          </VaccineProvider>
        </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App;