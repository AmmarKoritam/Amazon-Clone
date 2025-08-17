import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/GlobleState";
import { auth } from "../firebase";

import search from "../image/icon/searchIcon.png";
import shopping from "../image/icon/shopping-cart.png";
import logo from "../image/header-logo.png";

import "./Header.css";

function Header() {
  const { user, basket } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header-logo" src={logo} alt="website logo" />
      </Link>

      <div className="header-search">
        <input type="text" className="header-searchInput" />
        <img className="header-searchIcon" src={search} alt="search-icon" />
      </div>

      <div className="header-nav">
        {user ? (
          <div className="header-option" onClick={handleLogout}>
            <div className="header-optionLineOne">Hello {user?.email}</div>
            <div className="header-optionLineTwo">Sign Out</div>
          </div>
        ) : (
          <Link to="/login">
            <div className="header-option">
              <div className="header-optionLineOne">Hello Guest</div>
              <div className="header-optionLineTwo">Sign In</div>
            </div>
          </Link>
        )}

        <Link to="/orders">
          <div className="header-option">
            <div className="header-optiopnLineOne">Returns</div>
            <div className="header-optionLineTwo">& Order</div>
          </div>
        </Link>

        <div className="header-option">
          <div className="header-optiopnLineOne">Your</div>
          <div className="header-optionLineTwo">Prime</div>
        </div>

        <Link to="/checkout">
          <div className="header-optionBasket">
            <img src={shopping} alt="shopping-icon" />
            <span className="header-optionLineTwo header-basketCount">
              {basket.length ?? 0}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
