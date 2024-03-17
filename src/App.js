import DataMap from "./components/DataMap";
import Form from "./components/Form";
import Formik from "./components/Formik";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    {/* <DataMap/> */}
    {/* <Form/> */}
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    <Formik/>
    </>
  );
}

export default App;
