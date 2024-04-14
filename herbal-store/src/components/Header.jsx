import React from 'react'
import '../assets/my-styles.css'
import img from '../components/herbal.jpg'
import { useState } from 'react'
import Card from '../components/Card'

const items = [{
    id: 0,
    name: 'Mood Stabilizer',
    image: img,
    usage: 'mood',
    price: '20',
    ingredients:'ashwagandha, garlic'
},
{
    id: 1,
    name: 'Heart Healthy',
    image: img,
    usage: 'heart',
    price: '15',
    ingredients: 'garlic'
},
{
    id: 2,
    name: 'Tummy',
    image: img,
    usage: 'stomach',
    price: '30',
    ingredients: 'ginger'
},
{
    id: 3,
    name: 'Blood pressure',
    image: img,
    usage: 'heart',
    price: '20',
    ingredients: 'turmeric'
},
{
    id: 4,
    name: 'Sleepy time',
    image: img,
    usage: 'sleep',
    price: '14',
    ingredients: 'lavender'
},
{
    id: 5,
    name: 'Sleepy Time Boost',
    image: img,
    usage: 'sleep',
    price: '17',
    ingredients: 'chamomile, lavender'
},
{
    id: 6,
    name: 'Mood Stabilizer Boost',
    image: img,
    usage: 'mood',
    price: '49',
    ingredients: 'ashwagandha, garlic, st.johns wort'
},
{
    id: 7,
    name: 'Tummy flatten',
    image: img,
    usage: 'stomach',
    price: '20',
    ingredients: 'ginseng'
},
{
    id: 8,
    name: 'Cold Relief',
    image: img,
    usage: 'cold/flu',
    price: '10',
    ingredients: 'echinacea'
},
{
    id: 9,
    name: 'Heart Healthy Boost',
    image: img,
    usage: 'heart',
    price: '20',
    ingredients: 'ginkgo'
},
{
    id: 10,
    name: 'Moody Relief',
    image: img,
    usage: 'mood',
    price: '20',
    ingredients: 'ashwagandha, garlic'
},
{
    id: 11,
    name: 'Flu Relief',
    image: img,
    usage: 'cold/flu',
    price: '17',
    ingredients: 'echinacea, elderberry'
}
]

export default function Main() {
    const [selectedUsageValue, setUsageSelectedValue] = useState('');
    const [selectedIngredientValue, setIngredientSelectedValue] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [cartItems, setCartItems] = useState([]);

    const handleUsageSelectionChange = (event) => {
        setUsageSelectedValue(event.target.value);
      };
    const handleIngredientSelectionChange = (event) => {
        setIngredientSelectedValue(event.target.value);
      };
    
    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
      };

    const addToCart = (item) => {
        const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
      
        if (existingCartItem) {
          const updatedCartItems = cartItems.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
          setCartItems(updatedCartItems);
        } else {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };
    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
      };
    
    const updateCartItemQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
      };
    
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      };

    let filteredItems;

    if (selectedUsageValue === "none" && selectedIngredientValue === "none") {
        // If "none" is selected for both usage and ingredient, display all items
        filteredItems = items;
    } else {
        // Apply filters based on selected values
        filteredItems = items.filter(item =>
          (selectedUsageValue === "none" || item.usage.includes(selectedUsageValue)) &&
          (selectedIngredientValue === "none" || item.ingredients.includes(selectedIngredientValue))
        );
    }

    if (sortOrder === 'low-to-high') {
        filteredItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'high-to-low') {
        filteredItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
      
    return (
        <div className='header-div'>
            <div className='title'>
                <h2>Welcome To The Herbal Shop</h2>
            </div>
            <div classname='picture'>
                <img src={img}/>
            </div>
            <div className='shop-div'>
                <div className='shop-div-header'>
                    <div className='shop-div-header-filter'>
                        <h5>Usages:</h5>
                            <select name='filter-items' id='usages' onChange={handleUsageSelectionChange}>
                                <option value='none'>None</option>
                                <option value='mood'>Mood</option>
                                <option value='stomach'>Stomach</option>
                                <option value='heart'>Heart</option>
                                <option value='sleep'>Sleep</option>
                                <option value='cold/flu'>Cold/Flu</option>
                            </select>
                            <h5>Ingredients:</h5>
                            <select name='filter-items' id='ingredients' onChange={handleIngredientSelectionChange}>
                                <option value='none'>None</option>
                                <option value='ashwagandha'>Ashwagandha</option>
                                <option value='garlic'>Garlic</option>
                                <option value='ginger'>Ginger</option>
                                <option value='turmeric'>Turmeric</option>
                                <option value='lavender'>Lavender</option>
                                <option value='chamomile'>Chamomile</option>
                                <option value='st.johns wort'>St.John's Wort</option>
                                <option value='ginseng'>Ginseng</option>
                                <option value='echinacea'>Echinacea</option>
                                <option value='ginkgo'>Ginkgo</option>
                                <option value='elderberry'>Elderberry</option>
                            </select>
                            <h5>Price Sorting:</h5>
                            <select name='filter-items' onChange={handleSortOrderChange}>
                                <option >none</option>
                                <option value='low-to-high'>low to high</option>
                                <option value='high-to-low'>high to low</option>
                            </select>
                    </div>
                </div>
                <h2>Items</h2>
                <div className='items'>
                    {filteredItems.map(item => (
                        <Card title={item.name} image={img} price={item.price} ingredients={item.ingredients} addToCart={() => addToCart(item)}/>
                    ))}
                </div>
                <div className='shopping-cart'>
                    <h2>Shopping Cart</h2>
                    <ul>
                        {cartItems.map(cartItem => (
                            <li key={cartItem.id}>
                                {cartItem.name} - Quantity:
                                <input type='number' value={cartItem.quantity} placeholder='amount' onChange={(e) => updateCartItemQuantity(cartItem.id, parseInt(e.target.value))}/>
                                <button onClick={() => removeFromCart(cartItem.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${calculateTotalPrice()}</p>
                </div>
            </div>
        </div>
    )
}