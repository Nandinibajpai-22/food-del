import React, { useContext, useState } from 'react'
import  './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({onLogout}) => {

  const [menu,setMenu] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const {getTotalCartAmount, searchFoods, addToCart} = useContext(StoreContext);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchSuggestions(query.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSearchSuggestions(true);
    }
  };

  const suggestions = searchQuery.length > 0 ? searchFoods(searchQuery) : [];

  const handleSuggestionClick = (item) => {
    addToCart(item.food_id);
    setSearchQuery("");
    setShowSearchSuggestions(false);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mob-app")} className={`${menu==="mob-app"?"active":""}`}>mobile app</a>
        <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu==="contact"?"active":""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-container">
          <input 
            type="text" 
            className="navbar-search-input"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
          />
          <img src={assets.search_icon} alt="search" className="search-icon-input" />
          {showSearchSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.slice(0, 5).map((item) => (
                <div key={item.food_id} className="suggestion-item" onClick={() => handleSuggestionClick(item)}>
                  <img src={item.food_image} alt={item.food_name} />
                  <div className="suggestion-text">
                    <p className="suggestion-name">{item.food_name}</p>
                    <p className="suggestion-category">{item.food_category}</p>
                    <p className="suggestion-price">${item.food_price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount()>0?"dot":""}></div>
        </Link>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark mode">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <div className="profile-menu-container">
          <button className="profile-button" onClick={() => setShowProfileMenu(!showProfileMenu)} title="Profile menu">
            👤
          </button>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <Link to="/myorder" className="profile-option">My Orders</Link>
              <hr />
              <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
