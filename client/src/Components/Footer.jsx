import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p> Made with ❤️ by &copy; 1010varun</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'rgb(30 58 138)',
  color:'white',
  padding: '1rem',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

export default Footer;
