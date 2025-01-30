// ***Importações
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// ***Contextos

function App() {
  return (
    <>
      <Outlet/>
      <ToastContainer theme="dark"/>
    </>
  )
}

export default App;