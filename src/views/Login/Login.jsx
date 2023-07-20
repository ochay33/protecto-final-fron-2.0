<<<<<<< HEAD
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
=======
import { useState } from "react"
import { useNavigate } from "react-router-dom"
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"

<<<<<<< HEAD
const validationSchema = () =>
	Yup.object().shape({
		email: Yup.string()
			.email("Debe ser un email válido")
			.required("* Campo obligatorio"),
		password: Yup.string().required("* Campo obligatorio"),
	})

const initialValues = {
	email: "",
	password: "",
}

export const getUsuario = async (email, password) => {
	const response = await axios.post(
		`${import.meta.env.VITE_SERVER_URI}/api/login`,
		{
			email,
			password,
		}
	)

	return response.data
}

export const Login = () => {
	const navigate = useNavigate()

	const onSubmit = () => {
		getUsuario(formik.values.email, formik.values.password)
			.then(data => {
				localStorage.setItem("user", JSON.stringify(data.user))
				localStorage.setItem("role", data.user.role)
				localStorage.setItem("token", data.token)
				navigate("/")
			})
			.catch(err => {
				if (err.response.status === 401) alert("credenciales inválidas")
			})
	}

	const formik = useFormik({
		initialValues,
		enableReinitialize: true,
		validationSchema,
		onSubmit,
	})

	return (
		<Container className="mt-4">
			<Form
				style={{ width: 500, margin: "auto" }}
				onSubmit={formik.handleSubmit}
			>
=======
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
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
				<h1>Iniciar sesión</h1>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
<<<<<<< HEAD
						className={
							formik.errors.email && formik.touched.email && "error"
						}
						placeholder="Enter email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name="email"
						value={formik.values.email}
					/>
					{formik.errors.email && (
						<div className="errorMessage">{formik.errors.email}</div>
					)}
=======
						placeholder="Enter email"
						value={userEmail}
						onChange={event => setUserEmail(event.target.value)}
					/>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
<<<<<<< HEAD
						name="password"
						className={
							formik.errors.password &&
							formik.touched.password &&
							"error"
						}
						type="password"
						placeholder="Password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.errors.password && (
						<div className="errorMessage">{formik.errors.password}</div>
					)}
				</Form.Group>
				<Button variant="primary" type="submit">
=======
						type="password"
						placeholder="Password"
						value={userPassword}
						onChange={event => setUserPassword(event.target.value)}
					/>
				</Form.Group>
				<Button onClick={handleClick} variant="primary" type="button">
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
					Submit
				</Button>
			</Form>
		</Container>
	)
<<<<<<< HEAD
}
=======
}
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
