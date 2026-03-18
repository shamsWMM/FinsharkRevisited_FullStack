import { Outlet } from "react-router-dom";
import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <Navbar />
    <Outlet />
    <ToastContainer />
    </>
  );
};

export default App;
