// ***Importações
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { register } from "swiper/element/bundle";

// ***Contextos
import { AuthProvider } from "./Contexts/AuthContext";
import { UserProvider } from "./Contexts/UserContext";

register();
import 'swiper/swiper-bundle.css';

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Outlet/>
          <ToastContainer theme="dark"/>
        </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App;