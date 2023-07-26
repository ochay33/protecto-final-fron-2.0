import { useState, useEffect, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import logo2 from "../../img/logo2.png"
import CartIcon from '../Carrito/CarritoIcon/CartIcon'
import { DataContext } from "../DataContext/DataContext"

const getMenues = async () => {
	const resp = await axios(
		`${import.meta.env.VITE_SERVER_URI}/api/read-foods`
	)
	const { data } = resp
	return data
}

export const NavBar = () => {
	const [setMenues] = useState()
	const navigate = useNavigate()
	const [cartItems] = useState([]);
	const {cart} = useContext(DataContext) 
	useEffect(() => {
	 	if (localStorage.getItem("user")) {
	 		getMenues().then(menues => setMenues(menues))
	 	}
	 }, [])

	const handleClick = () => {
		localStorage.clear()
		navigate("/login")
	}
	
	
	const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<Navbar >
			<Container style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
				<Navbar.Brand><img src={ logo2 } width={100} /></Navbar.Brand>
				<Nav className="me-auto">		
					{localStorage.getItem("role") === "client"  && (
						<NavLink to="/" style={{display: "none"}}>Inicio</NavLink>
					)}
					{localStorage.getItem("role") === "admin"  && (
						<NavLink to="/" style={{display: "none"}}>Inicio</NavLink>
					)}
					{localStorage.getItem("role") === "client"  && (
						<NavLink to="/menues"><h2>Menús</h2></NavLink>
					)}	
					{localStorage.getItem("role") === "admin"  && (
						<NavLink to="/menues" ><h2>Menús</h2></NavLink>
					)}
					{!localStorage.getItem("user") && (
						<>
						    <NavLink to="/"><h2>Inicio</h2></NavLink> 
							<NavLink to="/login"><h2>Loguearse</h2></NavLink>
							<NavLink to="/registro"><h2>Registrarse</h2></NavLink>
						</>
					)}
					<NavLink to="/Contacto"><h2>Contactanos</h2></NavLink>
					<NavLink to="/Nosotros"><h2>Nosotros</h2></NavLink>
				</Nav>
				{localStorage.getItem("user") && (
					<>
						{localStorage.getItem("role") === "admin" && (
							<Nav>
								<NavLink to="/administrador"><h4>Administrador</h4></NavLink>
							</Nav>
						)}
						{localStorage.getItem("role") === "admin" && (
							<Nav>
								<NavLink to="/Pedidos"><h4>Pedidos</h4></NavLink>
							</Nav>
						)}
						{localStorage.getItem("role") === "client" && (<Nav>
								<NavLink to="/carrito"><CartIcon itemCount={cartItemCount}/>{cart.length}</NavLink>
							</Nav>)}	
						<Button onClick={handleClick} variant="light">
							Cerrar Sesion
						</Button>
					</>
				)}
			</Container>
		</Navbar>
	)
}
