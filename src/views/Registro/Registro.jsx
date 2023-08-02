import { useNavigate } from "react-router-dom"
import axios from "axios"
import Form from "react-bootstrap/Form"
import * as Yup from "yup"
import Button from "react-bootstrap/Button"
import { useFormik } from "formik"
import Container from "react-bootstrap/Container"

const validationSchema = () =>
	Yup.object().shape({
		email: Yup.string()
		.email("Debe ser un email válido")
		.required("* Campo obligatorio")
		.min(6, "El Mail debe tener al menos 6 caracteres"),
		password: Yup.string()
        .required("* Campo obligatorio")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
		username: Yup.string()
		.required("* Campo obligatorio")
		.min(3, "El usuario debe tener al menos 3 caracteres"),
        address: Yup.string()
		.required("* Campo obligatorio")
		.min(6, "La direccion debe tener al menos 6 caracteres"),
	})
const initialValues = {
	email: "",
	password: "",
	username: "",
	address: "",
}

export const Registro = () => {

	const navigate = useNavigate()
	
	const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
		onSubmit: () => {
            postUsuario()
            formik.resetForm()
        },
    })

	const postUsuario = async () => {
        try {
            const resp = await axios.post(
                `${import.meta.env.VITE_SERVER_URI}/api/create-user`,
                formik.values
            )
            const { status } = resp

            if (status === 201) {
                alert("Registrado Exitosamente!")
                navigate("/login")
            }
        } catch (error) {
            alert("Ocurrió un error al intentar registrarse.")
        }
    
	}
	const handleSubmit = () => {
	 	postUsuario()
	 	formik.resetForm()
	}
 return (
	 	<Container className="mt-4">
	 		<Form
	 			style={{ width: 500, margin: "auto", color: "white" }}
				 onSubmit={formik.handleSubmit}
	 		>
	 			<h1 style={{textAlign: "center"}}>Registro</h1>
	 			<Form.Group className="mb-3" controlId="formBasicEmail">
	 				<Form.Label>Mail</Form.Label>
	 				<Form.Control
	 					type="email"
	 					className={
	 						formik.errors.email && formik.touched.email && "error"
	 					}
						maxLength={30}
						minLength={6}
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
						 maxLength={20}
						 minLength={6}
	 					type="password"
	 					value={formik.values.password}
	 					onChange={formik.handleChange}
	 					onBlur={formik.handleBlur}
	 				/>
	 				{formik.errors.password && (
	 					<div className="errorMessage">{formik.errors.password}</div>
	 				)}
	 			</Form.Group>
	 			<Form.Group className="mb-3" controlId="formBasicPassword">
	 				<Form.Label >Usiario</Form.Label>
	 				<Form.Control
	 					name="username"
	 					className={
                            formik.errors.username &&
                            formik.touched.username &&
                            "error"
                        }
	 					type="text"
	 				    maxLength={20}
						minLength={3}
	 					value={formik.values.username}
	 					onChange={formik.handleChange}
	 					onBlur={formik.handleBlur}
	 				/>
	 				{formik.touched.username && formik.errors.username && (
                        <div className="errorMessage">{formik.errors.username}</div>
                    )}
	 			</Form.Group>		
	 			<Form.Group className="mb-3" controlId="formBasicPassword">
	 				<Form.Label >Direccion</Form.Label>
	 				<Form.Control
	 					name="address"
	 					className={
                            formik.errors.address &&
                            formik.touched.address &&
                            "error"
                        }
						maxLength={30}
						minLength={6}
	 					type="address"
	 					value={formik.values.address}
	 					onChange={formik.handleChange}
	 					onBlur={formik.handleBlur}
	 				/>
	 				{formik.touched.address && formik.errors.address && (
                        <div className="errorMessage">{formik.errors.address}</div>
                    )}
	 			</Form.Group>				
	 			<Button
                    type="submit"
					onClick={handleSubmit}
                    className="btn btn-info btn-block mt-4"	
					disabled={!formik.isValid}	
                >
                    Registrarse
                </Button>
	 		</Form>
	 	</Container>
	 )
}