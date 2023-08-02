import { createContext, useState } from "react";

export const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCart = (producto, quantity) => {
    const existingItem = cart.find((item) => item.id === producto.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      const updatedCart = cart.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + quantity } : item
      );
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, agrega el nuevo producto con la cantidad especificada
      setCart((prev) => [...prev, { ...producto, cantidad: quantity }]);
    }
  };

  return (
    <DataContext.Provider value={{ cart, setCart, addCart }}>
      {children}
    </DataContext.Provider>
  );
};