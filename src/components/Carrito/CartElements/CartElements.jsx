import { useContext } from "react";
import { DataContext } from "../../DataContext/DataContext";
import Table from "react-bootstrap/Table"
import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useFormik } from "formik"
import * as Yup from "yup"

export const CartElements = () => {
	const { cart, setCart } = useContext(DataContext);

  const validationSchema = () =>
	    Yup.object().shape({
		    name: Yup.string()
			    .required("* Campo obligatorio")
			    .min(3, "El Nombre debe tener al menos 3 caracteres"),
		    phone: Yup.string()
		      .required("* Campo obligatorio")
		      .min(7, "El Telefono debe tener al menos 7 caracteres"),
        address: Yup.string()
          .required("* Campo obligatorio")
          .min(6, "La Direccion debe tener al menos 6 caracteres"),
    })      


	const initialValues = {
	  name: "",
	  phone: "",
	  address: "",
	};

  const postUsuario = async () => {
        const order = {
          datos: formik.values,
          items: cart,
          total: total(),
	}

	const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-Orders`,
			order,
	)

	const { status } = resp

	if (status === 201) {
			alert("Pedido Realizado Exitosamente!")
	  }
	}
    const total = () =>
    cart.reduce(
        (acumulador, valorActual) =>
        acumulador +  valorActual.cantidad * valorActual.precio,
        0,
    )

    const onSubmit = () => {
      if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
      } else {
        if (!formik.isValid) {
          alert(
            "Por favor, completa todos los campos obligatorios de manera correcta."
          );
        } else {
          postUsuario();
          clearCart();
          formik.resetForm();
        }
      }
    };
    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema,
      onSubmit,
    })

    const handleSubmit = () => {
      if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
      } else {
        if (formik.values === Empty) {
          alert(
            "Por favor, completa todos los campos obligatorios de manera correcta."
          );
        } else {
          postUsuario();
          clearCart();
          formik.resetForm();
        }
      }
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
            <Table style={{backgroundColor:"gray", color:"white"}} striped bordered hover variant="dark">
            <thead >
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
    <br />
		<Form onSubmit={formik.handleSubmit} style={{backgroundColor:"gray", color:"white", display:"flex", flexDirection:"column", padding:"20px", border:"1px solid #ccc"}}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            type="text"
            name="name"
            className={
              formik.errors.name &&
              formik.touched.name &&
              "error"
          }
            maxLength={20}
						minLength={3}
	 					value={formik.values.name}
	 					onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="errorMessage">{formik.errors.name}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            type="number"
            name="phone"
            className={
              formik.errors.phone &&
              formik.touched.phone &&
              "error"
          }
            maxLength={40}
						minLength={7}
	 					value={formik.values.phone}
	 					onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="errorMessage">{formik.errors.phone}</div>
          )}  
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            type="address"
            name="address"
            className={
              formik.errors.address &&
              formik.touched.address &&
              "error"
          }
            maxLength={40}
						minLength={7}
	 					value={formik.values.address}
	 					onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="errorMessage">{formik.errors.address}</div>
          )}  
        </Form.Group>
        <Button 
          variant="primary" 
          className="btn btn-info btn-block mt-4"
          type="submit" 
          onClick={handleSubmit}
          disabled={!formik.isValid || cart.length === 0}>
          Comprar
        </Button>
        </Form>
        </>
    )
};