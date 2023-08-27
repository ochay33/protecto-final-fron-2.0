import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import "../../css/login.css"

const validationSchema = () =>
	Yup.object().shape({
		email: Yup.string()
			.email("Debe ser un email válido")
			.required("* Campo obligatorio")
			.min(6, "El Mail debe tener al menos 6 caracteres"),
		password: Yup.string()
		.required("* Campo obligatorio")
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
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
        if (!formik.isValid) {
            alert("Por favor, completa todos los campos obligatorios de manera correcta.")
            return;
        }

        getUsuario(formik.values.email, formik.values.password)
            .then(data => {
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("role", data.user.role)
                localStorage.setItem("token", data.token)
                navigate("/menues")
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    alert("Por favor, verifique su email y contraseña.")
                } else {
                    alert("Ocurrió un error al intentar iniciar sesión.")
                }
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
			<Form onSubmit={formik.handleSubmit}>
				<h1>Iniciar sesión</h1>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Mail</Form.Label>
					<Form.Control
						type="email"
						className={
							formik.errors.email && formik.touched.email && "error"
						}
						maxLength={40}
						minLength={6}
						placeholder="Escriba su mail"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name="email"
						value={formik.values.email}
					/>
					{formik.errors.email && (
						<div className="errorMessage">{formik.errors.email}</div>
					)}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label >Contraseña</Form.Label>
					<Form.Control
						name="password"
						className={
							formik.errors.password &&
							formik.touched.password &&
							"error"
						}
						maxLength={40}
						minLength={6}
						type="password"
						placeholder="Contraseña"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.errors.password && (
						<div className="errorMessage">{formik.errors.password}</div>
					)}
				</Form.Group>
				<Button id="logueo" variant="primary" type="submit" onClick={onSubmit}>
					Loguearse
				</Button>
			</Form>
		</Container>
	)
}