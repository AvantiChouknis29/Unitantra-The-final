import { NavLink } from "react-router-dom";
import './Error.css'
export const Error = () => {
  return (
    <>
      <section id="error-page">
        <div className=" content">
          <h2 className="header">404</h2>
          <h4>Sorry! Page not found</h4>
          <p className="Error-page">
            Oops! It seems like the page you're trying to access doesn't exist.
            
          </p>
         
        </div>
      </section>
    </>
  );
};