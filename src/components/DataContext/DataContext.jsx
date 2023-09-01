import { createContext, useState, useContext} from "react";

export const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const addCart = (producto) => {
    
    setCart((prev) => [...prev, { ...producto }]);
   
  };
  const clearCart = () => {
    setCart([]);
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