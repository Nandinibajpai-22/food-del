import React, { useContext, useState } from 'react'
import  './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const {getTotalCartAmount, searchFoods} = useContext(StoreContext);

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
                <div key={item.food_id} className="suggestion-item">
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
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar
