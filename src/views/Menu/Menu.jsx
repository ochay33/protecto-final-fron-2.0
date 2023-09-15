import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { DataContext } from "../../components/DataContext/DataContext";
import { useNavigate } from "react-router-dom"
import { useData } from "../../components/DataContext/DataContext";

import "../../css/menu.css";


export const Menu = () => {
	const [menu, setMenu] = useState([]);
	const { menuId } = useParams();
	const { addCart } = useContext(DataContext);
  const { inputValue1, setInputValue1, inputValue2, setInputValue2 } = useData();


	useEffect(() => {
	  fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menu/${menuId}`)
		.then((response) => response.json())
		.then((loquerecibo) => setMenu(loquerecibo));
	}, [menuId]);
  const navigate = useNavigate()
  
  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  }
  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  }
  
	const handleAddToCart = () => {
    const itemToAdd = { ...menu, detalles: inputValue1, cantidad: inputValue2 };
    addCart(itemToAdd);
    alert("Producto agregado al carrito con éxito!");
    navigate("/menues");
  };
  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>{menu.title}</h1>
      </div>
      <div className="menu-content">
        <div className="menu-image">
        <img src={menu.img} alt={menu.title} style={{ maxWidth: "600px" }} />
        </div>
        <div className="menu-details">
          <div className="menu-title">
            <h2>{menu.title}</h2>
          </div>
          <div className="menu-description">
            <p>{menu.detail}</p>
            <p>Precio: ${menu.precio}</p>
          </div>
          <div className="menu-inputs">
            <div className="menu-input">
              <h5>Detalles del pedido</h5>
              <input
                placeholder="Describe tu menú aquí"
                type="text"
                value={inputValue1}
                onChange={handleInputChange1}
              />
            </div>
            <div className="menu-input">
              <h5>Elegir Cantidad</h5>
              <input
                placeholder="¿Cuántos menús deseas?"
                type="number"
                value={inputValue2}
                min={1}
                onChange={handleInputChange2}
              />
            </div>
          </div>
          <Button onClick={handleAddToCart}>Agregar al Carrito</Button>
        </div>
      </div>
    </div>
  );
};