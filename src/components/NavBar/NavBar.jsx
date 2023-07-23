import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import logo2 from "../../img/logo2.png"
import CartIcon from '../Carrito/CartIcon'

const getMenues = async () => {
	const resp = await axios(
		`${import.meta.env.VITE_SERVER_URI}/api/read-foods`
	)
	const { data } = resp
	// console.log(data)
	return data
}

export const NavBar = () => {
	const [menues, setMenues] = useState()
	const navigate = useNavigate()
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		if (localStorage.getItem("user")) {
			getMenues().then(menues => setMenues(menues))
		}
	}, [])

	const handleClick = () => {
		localStorage.clear()
		navigate("/login")
	}
	const addToCart = (product) => {
		setCartItems((prevItems) => [...prevItems, product]);
	};
	const removeFromCart = (productId) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
	};
	const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<Navbar >
			<Container>
				<Navbar.Brand><img src={ logo2 } width={100} /></Navbar.Brand>
				<Nav className="me-auto">
					<NavLink to="/">Inicio</NavLink>
					{!localStorage.getItem("user") && (
						<>
							<NavLink to="/login">Loguearse</NavLink>
							<NavLink to="/registro">Registrarse</NavLink>
						</>
					)}
					<NavLink to="/menues">Menús</NavLink>
					{localStorage.getItem("user") && (
						<NavDropdown title="" id="basic-nav-dropdown">
							{menues?.map(menu => (
								<NavLink key={menu.id} to={`/menu/${menu.id}`}>
									{menu.title}
								</NavLink>
							))}
						</NavDropdown>
					)}
				</Nav>
				{localStorage.getItem("user") && (
					<>
						{localStorage.getItem("role") === "admin" && (
							<Nav>
								<NavLink to="/administrador">Administrador</NavLink>
							</Nav>
						)}
						{localStorage.getItem("role") === "client" && (<Nav>
								<NavLink to="/Carrito"><CartIcon itemCount={cartItemCount}/></NavLink>
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
