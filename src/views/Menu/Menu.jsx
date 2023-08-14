import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { DataContext } from "../../components/DataContext/DataContext";

import "../../css/menu.css";

export const Menu = () => {
	const [menu, setMenu] = useState([]);
	const { menuId } = useParams();
	const { addCart } = useContext(DataContext);
  
	const [quantity, setQuantity] = useState(1); // Variable de estado para almacenar la cantidad seleccionada
  
	useEffect(() => {
	  fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menu/${menuId}`)
		.then((response) => response.json())
		.then((loquerecibo) => setMenu(loquerecibo));
	}, [menuId]);
  
	const handleAddToCart = () => {
	  
	  addCart({ ...menu });
	};
  return (
    <div className="container mt-5 curso">
      <div className="row">
        <div className="col">
          <div className="my-4">
            <h3>{menu.title}</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <img src={menu.img} width="100%" alt={menu.title} />
        </div>
        <div className="col-6">
          <div className="card ml-3 w-100">
            <div className="card-header">
              <h3 className="titulo">{menu.title}</h3>
            </div>
            <div className="card-body">
              <h4 className="card-title">Detalle del menú</h4>
              <hr />
              <ul>
                <p>{menu.detail}</p>
                <p>${menu.precio}</p>
              </ul>
              <Button onClick={handleAddToCart}>Agregar al Carrito</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};