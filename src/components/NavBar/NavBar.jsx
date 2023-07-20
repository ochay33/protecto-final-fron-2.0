import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import logo2 from "../../img/logo2.png"

const getMenues = async () => {
	const resp = await axios(
		`${import.meta.env.VITE_SERVER_URI}/api/read-menues`
	)
	const { data } = resp
	// console.log(data)
	return data
}

export const NavBar = () => {
	const [menues, setMenues] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("user")) {
			getCursos().then(menues => setMenues(menues))
		}
	}, [])

	const handleClick = () => {
		localStorage.clear()
		navigate("/login")
	}

	return (
		<Navbar >
			<Container>
				<Navbar.Brand href="#home"><img src={ logo2 } width={100} /></Navbar.Brand>
				<Nav className="me-auto">
					<NavLink to="/">Home</NavLink>
					{!localStorage.getItem("user") && (
						<>
							<NavLink to="/login">Loguearse</NavLink>
							<NavLink to="/registro">Registrarse</NavLink>
						</>
					)}
					<NavLink to="/menues">Menues</NavLink>
					{localStorage.getItem("user") && (
						<NavDropdown title="Menues" id="basic-nav-dropdown">
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
								<NavLink to="/administrator">Administrador</NavLink>
							</Nav>
						)}
						<Button onClick={handleClick} variant="light">
							Cerrar Sesion
						</Button>
					</>
				)}
			</Container>
		</Navbar>
	)
}
