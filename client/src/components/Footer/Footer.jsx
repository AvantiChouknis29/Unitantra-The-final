import "./Footer.css"

export const Footer=()=>{
       return(  
       <footer>
        <p className="footer-p">© {new Date().getFullYear()} Unitantra. All rights reserved.
        </p>
    </footer>
);
}