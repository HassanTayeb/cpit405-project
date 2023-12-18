import React from "react";

const Footer = () =>{
    const footerStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      };
    
      return (
        <footer className="bg-body-tertiary text-center text-lg-start">
          <div className="text-center p-3" style={footerStyle}>
            © 2020 Copyright:
            <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
          </div>
        </footer>
      );
    };
export default Footer;