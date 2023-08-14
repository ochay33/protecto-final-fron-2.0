import { createContext, useState } from "react";

export const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCart = (producto, quantity) => {
    const existingItem = cart.find((item) => item.id === producto.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      const updatedCart = cart.map((item) =>
        item.id === producto.id ? { ...item } : item
      );
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { ...producto, cantidad: quantity }]);
    }
  };

  return (
    <DataContext.Provider value={{ cart, setCart, addCart }}>
      {children}
    </DataContext.Provider>
  );
};