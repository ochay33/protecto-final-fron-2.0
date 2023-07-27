import { useContext ,useState} from "react";
import { DataContext } from "../../DataContext/DataContext";
import Table from "react-bootstrap/Table"
import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

// let user;
export const CartElements = () => {
    const {cart} = useContext(DataContext);

    const [formValues, setFormValues] = useState({
		name: "",
		email: "",
        address:"",
	})

    const postUsuario = async () => {
        const order = {
			buyer: formValues,
			items: cart,
			total: total(),
		}
		const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-Orders`,
			order
		)

		const { status } = resp

		if (status === 201) {
			alert("Registrado Exitosamente!")
			navigate("/menues")
		}
	}
    const total = () =>
    cart.reduce(
        (acumulador, valorActual) =>
        acumulador +  valorActual.precio,
        0,
    )

    const handleSubmit = () => {
		console.log(formValues)
		postUsuario()
	}
    
    const handleChange = ev => {
		setFormValues(prev => ({
			...prev,
			[ev.target.name]: ev.target.value,
		}))
	}

	
        return ( 
            <>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th></th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart.map(producto => (
                    <tr key={producto.id}>
                        <td>{producto.title}</td>
                        <td>
                            <img
                                height={60}
                                src={producto.img}
                                alt={producto.title}
                            />
                        </td>
                        <td>{producto.precio}</td>
                        <td>{producto.detail}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td>{total()}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>

        </Table>
        <Form>
						<Form.Group
							className="mb-3"
							controlId="formBasicEmail"
						>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								onChange={handleChange}
								value={formValues.name}
								type="text"
								name="name"
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="formBasicEmail"
						>
							<Form.Label>Email</Form.Label>
							<Form.Control
								onChange={handleChange}
								value={formValues.email}
								type="email"
								name="email"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Tel</Form.Label>
							<Form.Control
								onChange={handleChange}
								value={formValues.address}
								type="text"
								name="phone"
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="button"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Form>
        </>
    )
};