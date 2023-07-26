import { createContext,useState,useEffect } from "react";
// import axios from "axios";

export const DataContext = createContext([]);

export const DataProvider =({children}) => {
    
    const [cart,setCart] = useState([]);

    const addCart = (producto) => {
		const alreadyExists = cart.some(
			item => item.id === producto.id
		)
		if (!alreadyExists)
			setCart(prev => [
				...prev,
                producto
			])
	}
    return <DataContext.Provider value={{cart,setCart,addCart}}>{children}</DataContext.Provider>
}