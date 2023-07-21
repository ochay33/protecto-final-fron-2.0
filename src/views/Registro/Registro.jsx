import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import Container from "react-bootstrap/Container"

const initialValues = {
	email: "",
	password: "",
	username: "",
}

export const Registro = () => {
	const [formValues, setFormValues] = useState(initialValues)

	const navigate = useNavigate()

	const postUsuario = async () => {
		const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-user`,
			formValues
		)

		const { status } = resp

		if (status === 201) {
			alert("Registrado Exitosamente!")
			navigate("/login")
		}
	}

	const handleChange = e => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = () => {
		postUsuario()
		setFormValues(initialValues)
	}

	return (
		<Container className="mt-4" style={{ width: 500, margin: "auto", color: "white" }}>
			<h1 className="mt-4 mb-4" style={{textAlign: "center"}}>Registro</h1>
			<form>
				{[
					{
						label: "Email",
						name: "email",
						value: formValues.email,
						type: "email",
					},
					{
						label: "Contraseña",
						name: "password",
						value: formValues.password,
						type: "password",
					},
					{
						label: "Usuario",
						name: "username",
						value: formValues.username,
						type: "text",
					},
				].map(input => (
					<div className="form-group" key={input.label}>
						<label style={{ color: "white"}}>{input.label}</label>
						<input
							type={input.type}
							className="form-control"
							name={input.name}
							value={input.value}
							onChange={handleChange}
						/>
					</div>
				))}
				<button
					type="button"
					onClick={handleSubmit}
					className="btn btn-info btn-block mt-4"
				>
					Registrarse
				</button>
			</form>
		</Container>
	)
}