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
    addCart({ ...menu })
    alert("Producto agregado al carrito con exito!");
    navigate("/menues")
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
            <div className="card-body">
            <h4 className="card-title">Detalles del pedido</h4>
               <hr />
               <ul>
                <p><input
              placeholder="decribe tu menu aqui"  
							type="text"
							value={inputValue1}
							onChange={handleInputChange1}
						/></p>
               </ul>
            </div>
            <hr />
            <div className="card-body">
                <ul><h2>Elegir Cantidad</h2>
                <br />
                  <p>
                    <input style={{textAlign: 'center'}}
                      placeholder="cuantos Menús deseas"  
							        type="number"
							        value={inputValue2}
                      min={1}
							        onChange={handleInputChange2}
						        />
                  </p>
                </ul>
            </div>
              
              <Button onClick={handleAddToCart}>Agregar al Carrito</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};