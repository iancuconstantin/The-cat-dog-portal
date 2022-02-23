import React from "react";
import { Link } from "react-router-dom";
import '../style/navbar.css'


const Navbar = () => {
  return (
    <div className="navbar">
      <Link to='/my-images'>My images</Link>
      <Link to='/upload'>Upload images</Link>
      <Link to='/public-images'>Public images</Link>
      <Link to='/favorites'>Favorites images</Link>
    </div>
  );
};

export default Navbar;
