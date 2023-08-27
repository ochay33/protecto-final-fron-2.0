import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import axios from "axios"

import "../../css/orders.css"


export const Orders = () => {
	const [orders, setOrders] = useState([])
	const [showTable, setShowTable] = useState(false)
	const [showButtons, setShowButtons] = useState(false);


	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-Orders`)
			.then(response => response.json())
			.then(loquerecibo => setOrders(loquerecibo))
	}, [])	

	const handleAcceptOrder = async (orderId) => {
		try {
			const resp = await axios.put(
				`${import.meta.env.VITE_SERVER_URI}/api/update-order-status/${orderId}/accept`
			);
	
			if (resp.status === 200) {
				const updatedOrders = orders.map((order) =>
					order._id === orderId ? { ...order, estado: "En proceso" } : order
				);
				setOrders(updatedOrders);
			}
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	};
	
	const handleFinishOrder = async (orderId) => {
		try {
			const resp = await axios.put(
				`${import.meta.env.VITE_SERVER_URI}/api/update-order-status/${orderId}/finish`
			);
	
			if (resp.status === 200) {
				const updatedOrders = orders.map((order) =>
					order._id === orderId ? { ...order, estado: "Terminado" } : order
				);
				setOrders(updatedOrders);
			}
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	};
	
	const handleSendOrder = async (orderId) => {
		try {
			const resp = await axios.put(
				`${import.meta.env.VITE_SERVER_URI}/api/update-order-status/${orderId}/Send`
			);
	
			if (resp.status === 200) {
				const updatedOrders = orders.map((order) =>
					order._id === orderId ? { ...order, estado: "Enviado" } : order
				);
				setOrders(updatedOrders);
			}
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	};
	const handleShow = () => {
		setShowTable(true);
		setShowButtons(true);
	};
	const handleHide = () => {
		setShowTable(false);
		setShowButtons(false);
	};
	
	const handleDelete = async () => {
		let validator = window.confirm(
			`Esta seguro que desea eliminar las ordenes enviadas?`
		)
		if (validator){
			try {
			  await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/delete-all-orders`, {
				headers: {
				  Authorization: "Bearer " + localStorage.getItem("token"),
				},
			  });
			  const ordersToKeep = orders.filter((order) => order.estado !== "Enviado");
			  setOrders(ordersToKeep);  
			} catch (error) {
			  console.error("Error al eliminar órdenes: ", error);
			}}
	};
	
	
	return (
		<Container id="admin">
			<h1 className="h1">Pedidos</h1>
				<table className="table">
					<thead className="thead-dark">
					    <tr>
                            <th colSpan="4">Pedidos en espera</th>
                        </tr>
						<tr className="tr">
							<th className="th"  scope="col">Datos del Cliente</th>
							<th className="th"  scope="col">Menus</th>
							<th className="th"  scope="col">Detalles del pedido</th>
							<th className="th"  scope="col">Total</th>
							<th className="th"  scope="col">Aceptar pedido</th>
						</tr>
					</thead>
					<tbody className="tbody">{orders.filter((order) => order.estado === "En espera")
                    .map((order) => (
                        <tr key={order._id}>
                            <th className="letra_tabla"> 
                                <ul>
                                    <li>Nombre: {order.datos.name}</li>
                                    <li>Telefono: {order.datos.phone}</li>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </th>
                            <td className="letra_tabla">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes">{order.detalles}</td>
                            <td  className="letra_tabla">{order.total}
                            </td>
                            <td >
                                <button onClick={() => handleAcceptOrder(order._id)}>
									Aceptar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<table className="table">
					<thead className="thead-dark">
					<tr>
                            <th colSpan="4">Pedidos en proceso</th>
                        </tr>
						<tr style={{ color: "white"}}>
							<th className="th" scope="col">Datos del Cliente</th>
							<th className="th" scope="col">Menus</th>
							<th className="th"  scope="col">Detalles del pedido</th>
							<th className="th" scope="col">Total</th>
							<th className="th" scope="col">Finalizar Pedido</th>
						</tr>
					</thead>
					<tbody className="tbody">{orders.filter((order) => order.estado === "En proceso")
                    .map((order) => (
                        <tr key={order._id}>
                            <th className="letra_tabla"> 
                                <ul>
                                    <li>Nombre: {order.datos.name}</li>
                                    <li>Telefono: {order.datos.phone}</li>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </th>
                            <td className="letra_tabla">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes">{order.detalles}</td>
                            <td  className="letra_tabla">{order.total}
                            </td>
                            <td >
                                <button onClick={() => handleFinishOrder(order._id)}>
									Finalizar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<table className="table" >
					<thead className="thead-dark">
					<tr>
                            <th colSpan="4">Pedidos terminados</th>
                        </tr>
						<tr style={{ color: "white"}}>
							<th className="th" scope="col">Datos del Cliente</th>
							<th className="th" scope="col">Menus</th>
							<th className="th"  scope="col">Detalles del pedido</th>
							<th className="th" scope="col">Total</th>
							<th className="th" scope="col">Pedidos Terminados</th>
						</tr>
					</thead>
					<tbody className="tbody">{orders.filter((order) => order.estado === "Terminado")
                    .map((order) => (
                        <tr key={order._id}>
                            <th className="letra_tabla"> 
                                <ul>
                                    <li>Nombre: {order.datos.name}</li>
                                    <li>Telefono: {order.datos.phone}</li>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </th>
                            <td className="letra_tabla">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes">{order.detalles}</td>
                            <td  className="letra_tabla">{order.total}
                            </td>
                            <td >
                                <button onClick={() => handleSendOrder(order._id)}>
									Enviar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<button onClick={handleShow}>
					Mostrar Pedidos enviados
				</button>
				{showTable && (
					<table className="table" style={{marginBottom:"0"}}>
					<thead className="thead-dark">
					<tr>
                            <th colSpan="4">Pedidos Enviados</th>
                        </tr>
						<tr>
							<th className="th" scope="col">Datos del Cliente</th>
							<th className="th" scope="col">Menus</th>
							<th className="th" scope="col">Detalles del pedido</th>
							<th className="th" scope="col">Total</th>
						</tr>
					</thead>
					<tbody className="tbody">{orders.filter((order) => order.estado === "Enviado")
                    .map((order) => (
                        <tr key={order._id}>
                            <th className="letra_tabla"> 
                                <ul>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </th>
                            <td className="letra_tabla">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes">{order.detalles}</td>
                            <td  className="letra_tabla">{order.total}
                            </td>
                        </tr>))}
                    </tbody>
					<tfoot>
                        <tr>
                            <td className="td"></td>
							<td className="td"></td>
							<td className="td"></td>
							<td className="td">{orders .filter((order) => order.estado === "Enviado")
                                .reduce((total, order) => total + order.total, 0)}
							</td>
                        </tr>
                    </tfoot>
				</table>
				)} 
                {showButtons && (
				<div className="botones">
				    <button className="boton1" onClick={handleHide}>
				    Aceptar
				    </button>
				    <button className="boton2" onClick={handleDelete}>
		            Eliminar
				    </button>
				</div>
				)}
		</Container>
	)		
}
