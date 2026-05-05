import { createContext, useEffect, useState } from "react";
import { food_list,menu_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [ordersData,setOrdersData] = useState({});
    
    const addToCart = (itemId) =>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product.food_id === Number(item));
            totalAmount += itemInfo.food_price * cartItems[item];
          }
        }
        return totalAmount;
      }

    // AI-powered search with personalized recommendations
    const searchFoods = (query) => {
        if (!query.trim()) return [];
        
        const queryLower = query.toLowerCase();
        const words = queryLower.split(/\s+/);
        
        // Score calculation function
        const calculateScore = (food) => {
            let score = 0;
            const nameLower = food.food_name.toLowerCase();
            const descLower = food.food_desc.toLowerCase();
            const categoryLower = food.food_category.toLowerCase();
            
            // Exact match in name
            if (nameLower === queryLower) score += 100;
            
            // Prefix match in name
            if (nameLower.startsWith(queryLower)) score += 50;
            
            // Contains match in name
            if (nameLower.includes(queryLower)) score += 30;
            
            // Word matching in name
            words.forEach(word => {
                if (word.length > 2) {
                    if (nameLower.includes(word)) score += 20;
                    if (categoryLower.includes(word)) score += 15;
                    if (descLower.includes(word)) score += 10;
                }
            });
            
            // Category matching
            if (categoryLower.includes(queryLower)) score += 25;
            
            // Description matching
            if (descLower.includes(queryLower)) score += 5;
            
            // Personalization: boost items in cart (user preferences)
            if (cartItems[food.food_id]) {
                score += 15; // Boost similar items if user already ordered this category
            }
            
            return score;
        };
        
        const results = food_list
            .map(food => ({
                ...food,
                relevanceScore: calculateScore(food)
            }))
            .filter(food => food.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore);
        
        return results;
    }

    // Get personalized recommendations based on cart history
    const getRecommendations = () => {
        if (Object.keys(cartItems).length === 0) return [];
        
        const cartItemIds = Object.keys(cartItems).map(Number);
        const cartFoods = food_list.filter(f => cartItemIds.includes(f.food_id));
        const userCategories = new Set(cartFoods.map(f => f.food_category));
        
        // Find similar foods not in cart
        const recommendations = food_list
            .filter(f => !cartItemIds.includes(f.food_id))
            .map(food => {
                let score = 0;
                
                // Boost if same category as items in cart
                if (userCategories.has(food.food_category)) {
                    score += 50;
                }
                
                // Boost popular items (simple heuristic: lower price range might be more popular)
                if (food.food_price < 18) {
                    score += 10;
                }
                
                return { ...food, personalizationScore: score };
            })
            .filter(f => f.personalizationScore > 0)
            .sort((a, b) => b.personalizationScore - a.personalizationScore)
            .slice(0, 5);
        
        return recommendations;
    }

    const placeOrder = (deliveryData) =>{
        console.log(deliveryData);
    }

    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        searchFoods,
        getRecommendations
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        )

}

export default StoreContextProvider;