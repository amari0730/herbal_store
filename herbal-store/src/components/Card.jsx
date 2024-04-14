import React from "react";
import '../assets/my-styles.css';



export default function Card({title, image, ingredients, price, addToCart}) {
    return (
        <div className="card-div">
            <h2>{title}</h2>
            <img src={image} alt="herbal pic"/>
            <p>Ingredients: {ingredients}</p>
            <h3>${price}</h3>
            <button onClick={addToCart}>buy</button>
        </div>
    )
} 