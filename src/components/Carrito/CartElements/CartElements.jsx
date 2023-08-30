import { useContext } from "react";
import { useState, useEffect } from "react";
import { DataContext } from "../../DataContext/DataContext";
import Table from "react-bootstrap/Table"
import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useData } from "../../DataContext/DataContext";
import Modal from "react-bootstrap/Modal";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

import "../../../css/carrito.css"


export const CartElements = () => {
	const { cart, setCart } = useContext(DataContext);
  const { inputValue1, inputValue2, setInputValue1, setInputValue2 } = useData();
  const [showModal, setShowModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    orderId: "",
    orderStatus: ""
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      formik.setValues(JSON.parse(savedFormData));
    }
    const savedInputValue1 = localStorage.getItem('inputValue1') || '';
    setInputValue1(savedInputValue1);
    const savedInputValue2 = localStorage.getItem('inputValue2') || '';
    setInputValue2(savedInputValue2);
  }, []);

  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago('TEST-cbb3ea8b-f9de-48bb-8527-f9010b3b5736');

  const CreatePreference = async ( title, price ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/create_preference`,{
          titulo: title,
          price: price,
          quantity: inputValue2,
          currency_id: 'ARS',
        });
        const { id } = response.data;
        return id;
    } catch (error) {
      console.log(error);
    }
  }
  const handleMercPago = async () => {
    const preferencePromises = cart.map(async (producto) => {
      return await CreatePreference(producto.title, producto.precio);
    });
 
    const preferenceIds = await Promise.all(preferencePromises);
    if (preferenceIds.length > 0) {
      setPreferenceId(preferenceIds[0]);
    }
  };
  
  const validationSchema = () =>
	    Yup.object().shape({
		    name: Yup.string()
			    .required("* Campo obligatorio")
			    .min(3, "El Nombre debe tener al menos 3 caracteres")
          .max(30, "El Nombre debe tener un maximo de  30 caracteres"),
		    phone: Yup.string()
		      .required("* Campo obligatorio")
		      .min(7, "El Telefono debe tener al menos 7 caracteres")
          .max(25, "El Telefono debe tener un maximo de 25 caracteres"),
        address: Yup.string()
          .required("* Campo obligatorio")
          .min(6, "La Direccion debe tener al menos 6 caracteres")
          .max(40, "La Direccion debe tener un maximo de 40 caracteres"),
        checkbox: Yup.string()
          .required("* Campo obligatorio")
             
    })

  const postUsuario = async () => {
        const order = {
          datos: formik.values,
          items: cart,
          detalles: inputValue1,
          cantidad: inputValue2,
          total: total(),
	}

	try {
    const resp = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/api/create-Orders`,
      order
    );

    const { status, data } = resp;

    if (status === 201) {
      setOrderInfo({
        orderId: data.id,
        orderStatus: data.estado,
      });
      setShowModal(true);
      clearCart();
      formik.resetForm();
    }
  } catch (error) {
    console.error("Error:", error);
  }
	};
    const total = () =>
    cart.reduce(
        (acumulador, valorActual) =>
        acumulador +  parseFloat(inputValue2) * valorActual.precio,
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
          const numericInputValue2 = parseFloat(inputValue2);

          if (isNaN(numericInputValue2)) {
            alert("El valor ingresado no es válido. Ingresa un número.");
            return;
          }
          cart.forEach((producto) => {
            addCart(producto, numericInputValue2);
          });
          postUsuario();
          clearCart();
        }
      }
    };
    const formik = useFormik({
      initialValues: {
        name: "",   
        phone: "",  
        address: "",
        checkbox: false,
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit,
    })

    const handleSubmit = () => {
      if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
      } else {
        if (Object.keys(formik.values).length === 0) {
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
    formik.resetForm();
    localStorage.removeItem('cart');
    localStorage.removeItem('inputValue1', inputValue1);
    localStorage.removeItem('inputValue2', inputValue2);
    localStorage.removeItem('formData', JSON.stringify(formik.values));
    };
        return ( 
            <>
            <Table id="responsive-table1" striped bordered hover variant="dark">
            <thead >
                <tr id="tr">
                    <th>Nombre</th>
                    <th id="img">img</th>
                    <th>Precio</th>
                    <th>Detalles del pedido</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(producto => (
                    <tr key={producto.id}>
                        <td id="td" data-label="Titulo:">{producto.title}</td>
                        <td id="img">
                            <img
                                height={60}
                                src={producto.img}
                                alt={producto.title}
                            />
                        </td>
                        <td id="td" data-label="Precio:">{producto.precio}</td>
                        <td id="td" data-label="Detalles:">{inputValue1}</td>
						            <td id="td" data-label="Cantidad:">{inputValue2}</td>
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
		<Form onSubmit={formik.handleSubmit} className="responsive-form1"  style={{backgroundColor:"gray", color:"white", display:"flex", flexDirection:"column", padding:"20px", border:"1px solid #ccc"}}>
        <Form.Group  className="form-group1" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={(e) => {
              formik.handleChange(e);
              localStorage.setItem('formData', JSON.stringify(formik.values));
            }}
            type="text"
            name="name"
            className={
              formik.errors.name &&
              formik.touched.name &&
              "error"
          }
            maxLength={30}
						minLength={3}
	 					value={formik.values.name}
	 					onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="errorMessage">{formik.errors.name}</div>
          )}
        </Form.Group>
        <Form.Group  className="form-group1" controlId="formBasicPhone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            onChange={(e) => {
              formik.handleChange(e);
              localStorage.setItem('formData', JSON.stringify(formik.values));
            }}
            type="number"
            name="phone"
            className={
              formik.errors.phone &&
              formik.touched.phone &&
              "error"
          }
            maxLength={25}
						minLength={7}
	 					value={formik.values.phone}
	 					onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="errorMessage">{formik.errors.phone}</div>
          )}  
        </Form.Group>
        <Form.Group  className="form-group1" controlId="formBasicAddress">
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            onChange={(e) => {
              formik.handleChange(e);
              localStorage.setItem('formData', JSON.stringify(formik.values));
            }}
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
        <Form.Group  className="form-group1" controlId="formBasicCheckbox">
          <div className="checkbox-label">
            <Form.Check 
              onChange={formik.handleChange}
              value={formik.values.checkbox}
              name="checkbox"
              type="checkbox" 
              label="Pago en efectivo"
              onBlur={formik.handleBlur}
              className={
                formik.errors.checkbox &&
                formik.touched.checkbox &&
                "error"} />
            {formik.touched.checkbox && formik.errors.checkbox && (
              <div className="errorMessage">{formik.errors.checkbox}</div>)} 
          </div>
        </Form.Group>
        <Button 
          variant="primary" 
          className="btn btn-info btn-block mt-4"
          type="submit" 
          onClick={handleSubmit}
          disabled={!formik.isValid || cart.length === 0 || !formik.values.checkbox}>
          Comprar
        </Button>
        <Button
        variant="primary"
        className="btn btn-info btn-block mt-4"
        type="button"
        onClick={handleMercPago}
        disabled={!formik.isValid || cart.length === 0}
        >
        Pago Online
        </Button>
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
        <br />
        <br />
        <div className="enviar_pedido">
        <h6>Si tu pago online fue aprobado hacer click aqui</h6>
        <Button
        variant="primary"
        className="btn btn-info btn-block mt-4"
        type="button"
        onClick={postUsuario}
        disabled={!formik.isValid || cart.length === 0}
        >
        Enviar Pedido 
        </Button>
        </div>
    </Form>
        <Modal show={showModal} onHide={() =>setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Detalles de la Orden</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>¡Pedido Realizado Exitosamente!</p>
              <p>Demora aproximada 35 minutos</p>
              <p>ID de la Orden: {orderInfo.orderId}</p>
              <p>Estado de la Orden: {orderInfo.orderStatus}</p>
            </Modal.Body>
        </Modal>
        </>
    )
};