import { useState, useEffect,createContext,useContext} from "react"
import { useParams } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { DataContext } from "../../components/DataContext/DataContext"

import "../../css/menu.css"

// export const dataContext = createContext();

export const Menu = () => {
	const [menu, setMenu] = useState([]);
	const { menuId } = useParams();
	// const [cart,setCart] = useState([]);
	const {cart,setCart,addCart} = useContext(DataContext)
	// const [carrito,setCarrito] = useState([])
	console.log(2,cart)
	
	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menu/${menuId}`)
			.then(response => response.json())
			.then(loquerecibo => setMenu(loquerecibo))

	}, [menuId])


	const ComprarProductos = (data) =>{
		// console.log(cart)
		// console.log(data)
		// console.log(carrito)
		console.log(cart)
		console.log(data)
		setCart([...cart,menu])
	}

	

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
					<img src={menu.img}  width="100%" />
				</div>
				<div className="col-6">
					<div className="card ml-3 w-100">
						<div className="card-header">
							<h3 className="titulo">
							{menu.title}
							</h3>
						</div>
						<div className="card-body">
							<h4 className="card-title">Detalle del menu</h4>
							<hr />
							<ul>
								<p>{menu.detail}</p>
							</ul>							
							<Button onClick={() => addCart(menu)}>
							Agregar al Carrito
						    </Button>
							{/* <dataContext.Provider value={{menu,cart,setCart}}>{children}</dataContext.Provider> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}