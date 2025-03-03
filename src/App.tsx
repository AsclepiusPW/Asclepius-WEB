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

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <VaccineProvider>
            <Outlet/>
            <ToastContainer theme="dark"/>
          </VaccineProvider>
          </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App;