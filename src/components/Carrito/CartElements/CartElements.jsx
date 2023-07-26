import { useContext } from "react";
import { DataContext } from "../../DataContext/DataContext";

import React from "react";

export const CartElements = () => {
    const {cart} = useContext(DataContext);
        return cart.map((products) => 
            <div key={products.id}>
                <h3>{products.title}</h3>
                <img src={products.img} alt="" />
                
            </div>
        )
};