import { createContext, useState, useContext, useEffect } from "react";

export const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [inputValue1, setInputValue1] = useState(localStorage.getItem('inputValue1') || '');
  const [inputValue2, setInputValue2] = useState(localStorage.getItem('inputValue2') || '');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);


  const addCart = (producto) => {
    
    setCart((prev) => [...prev, { ...producto }]);
    localStorage.setItem('cart', JSON.stringify([...cart, { ...producto }]));
    localStorage.setItem('inputValue1', inputValue1);
    localStorage.setItem('inputValue2', inputValue2);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('inputValue1', inputValue1);
    localStorage.removeItem('inputValue2', inputValue2);
  };
  

  return (
    <DataContext.Provider value={{ cart, setCart, addCart, inputValue1, setInputValue1, inputValue2, setInputValue2, clearCart }}>
      {children}
    </DataContext.Provider>
  );
};
export function useData() {
  return useContext(DataContext);
}