import { useContext ,useState} from "react";
import { DataContext } from "../../DataContext/DataContext";
import Table from "react-bootstrap/Table"
import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export const CartElements = () => {
	const { cart, setCart } = useContext(DataContext);


	const [formValues, setFormValues] = useState({
	  name: "",
	  email: "",
	  address: "",
	});

    const postUsuario = async () => {
        const order = {
          datos: formValues,
          items: cart,
          total: total(),
		}

    console.log(cart)

		const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-Orders`,
			order
		)

		const { status } = resp

		if (status === 201) {
			alert("Registrado Exitosamente!")
			// navigate("/menues")
		}
	}
    const total = () =>
    cart.reduce(
        (acumulador, valorActual) =>
        acumulador +  valorActual.cantidad * valorActual.precio,
        0,
    )

    const handleSubmit = () => {
      console.log(cart)
	  	postUsuario();
    
	  };
    
	const handleChange = (ev) => {
		setFormValues((prev) => ({
		  ...prev,
		  [ev.target.name]: ev.target.value,
		}));
	  };


	const removeItemFromCart = (id) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	}

    const clearCart = () => {
    setCart([]);
    };


	const updateQuantity = (id, newQuantity) => {
		setCart((prevCart) =>
		  prevCart.map((item) =>
			item.id === id ? { ...item, cantidad: newQuantity } : item
		  )
		);
	  };
	
        return ( 
            <>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>img</th>
                    <th>Precio</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
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
						<td>
						    <input
                                type="number"
                                value={producto.cantidad}
                                onChange={(e) => updateQuantity(producto.id, parseInt(e.target.value))}
                                min="1"
                            />
                        </td>
                        <td>
							<Button variant="danger" onClick={() => removeItemFromCart(producto.id)}>								
                                 Eliminar
                            </Button>
                        </td>
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
		<Button variant="danger" onClick={clearCart}>
            Limpiar Carrito
        </Button>
		<br />
		<Form style={{backgroundColor:"gray", color:"white", display:"flex", flexDirection:"column", padding:"20px", border:"1px solid #ccc"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formValues.name}
            type="text"
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formValues.email}
            type="email"
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formValues.address}
            type="address"
            name="address"
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleSubmit}>
          Comprar
        </Button>
        </Form>
        </>
    )
};