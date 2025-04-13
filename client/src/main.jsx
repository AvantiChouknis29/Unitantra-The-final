import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./store/auth.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "./store/cart.jsx";
import { AgencyAuthProvider } from "./store/agency_auth.jsx"; // Import the AgencyAuthProvider
import AgencyApplications from './pages/AgencyApplications.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
    <AgencyAuthProvider>
    <App />
   
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme="dark"
bodyClassName="toastBody"
/>
</AgencyAuthProvider>
</CartProvider>
  </AuthProvider>

);