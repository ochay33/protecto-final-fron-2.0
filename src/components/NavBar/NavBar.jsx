import { useState, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import logo2 from "../../img/logo2.png"
import CartIcon from '../Carrito/CarritoIcon/CartIcon'
import { DataContext } from "../DataContext/DataContext"
import "../../css/navbar.css"


export const NavBar = () => {
	const navigate = useNavigate()
	const [cartItems] = useState([]);
	const {cart} = useContext(DataContext)

	const handleClick = () => {
		let validator = window.confirm(
			`Esta seguro que desea cerrar sesion?`
		)
		if (validator){
		localStorage.clear()
		navigate("/login")
	    }
	}
	const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<Navbar id="navtotal">
			<Container id="Container1">
				<Navbar.Brand><NavLink to="/"><img src={ logo2 } width={100} /></NavLink></Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Nav id="menunav" className="me-auto">
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
								<NavLink to="/orders"><h4>Pedidos</h4></NavLink>
							</Nav>
						)}
						{localStorage.getItem("role") === "admin" && (
							<Nav>
								<NavLink to="/users"><h4>Usuarios</h4></NavLink>
							</Nav>
						)}
						{localStorage.getItem("role") === "client" && (<Nav style={{display:"inline-flex"}}>
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
