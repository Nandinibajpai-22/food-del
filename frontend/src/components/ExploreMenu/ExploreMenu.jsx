import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {menu_list, food_list} = useContext(StoreContext);
  
  // Get food items for the selected category
  const getCategoryFoods = () => {
    if (category === "All") {
      return food_list.slice(0, 4);
    }
    return food_list.filter(item => item.food_category === category).slice(0, 4);
  }

  const categoryFoods = getCategoryFoods();
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img src={item.menu_image} className={category===item.menu_name?"active":""} alt={item.menu_name} />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
      
      {/* Featured Dishes Section */}
      <div className="featured-dishes">
        <h2>Featured Dishes</h2>
        <div className="featured-dishes-grid">
          {categoryFoods.map((food, index) => (
            <div key={index} className="featured-dish-card">
              <div className="featured-dish-img-container">
                <img src={food.food_image} alt={food.food_name} className="featured-dish-img" />
                <div className="featured-dish-overlay">
                  <p className="dish-category">{food.food_category}</p>
                </div>
              </div>
              <div className="featured-dish-info">
                <h3>{food.food_name}</h3>
                <p className="dish-desc">{food.food_desc}</p>
                <div className="dish-footer">
                  <span className="dish-price">${food.food_price}</span>
                  <span className="dish-rating">⭐ {food.food_rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExploreMenu
