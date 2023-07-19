import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"

export const getUsuario = async (mail, password) => {
	// console.log(mail)
	const resp = await axios(`http://localhost:3005/usuarios?usuario=${mail}`)

	const { data } = resp
	// console.log(data)

	if (data.length > 0) {
		let validar = data.find(user => {
			return user.password === password
		})

		if (validar) {
			return data
		} else {
			return []
		}
	}
}

export const Login = () => {
	const [userEmail, setUserEmail] = useState("")
	const [userPassword, setUserPassword] = useState("")

	const navigate = useNavigate()

	const handleClick = () =>
		getUsuario(userEmail, userPassword).then(datos => {
			const { password, rol, ...rest } = datos[0]
			localStorage.setItem("usuario", JSON.stringify(rest))
			localStorage.setItem("rol", JSON.stringify(rol))
			navigate("/")
		})

	return (
		<Container className="mt-4">
			<Form style={{ width: 500, margin: "auto" }}>
				<h1>Iniciar sesión</h1>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={userEmail}
						onChange={event => setUserEmail(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={userPassword}
						onChange={event => setUserPassword(event.target.value)}
					/>
				</Form.Group>
				<Button onClick={handleClick} variant="primary" type="button">
					Submit
				</Button>
			</Form>
		</Container>
	)
}
