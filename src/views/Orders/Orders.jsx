import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import axios from "axios"
import { useNavigate } from "react-router-dom"


import "../../css/orders.css"


export const Orders = () => {
	const [orders, setOrders] = useState([])
	const [showTable, setShowTable] = useState(false)
	const [showButtons, setShowButtons] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate()


	
	
	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-Orders`)
			.then(response => response.json())
			.then(loquerecibo => setOrders(loquerecibo))
	}, [])	

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user && user.role === "admin") {
		  setIsAdmin(true);
		} else {
		  navigate("/");
		}
	}, [navigate]);   

	const handleAcceptOrder = async (orderId) => {
		try {
			const resp = await axios.put(
				`${import.meta.env.VITE_SERVER_URI}/api/update-order-status/${orderId}/accept`,
				{
					headers,
				}
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
				`${import.meta.env.VITE_SERVER_URI}/api/update-order-status/${orderId}/finish`,
				{
					headers,
				}
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
				`${import.meta.env.VITE_SERVER_URI}/api/update-order-status/${orderId}/Send`,
				{
					headers,
				}
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
				<table id="responsive-table" className="table">	    
					<thead  className="thead-dark">
					    <tr>
						    <td colSpan="5">Pedidos en espera</td>
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
                            <td className="letra_tabla" data-label="Datos del Cliente:"> 
                                <ul>
                                    <li>Nombre: {order.datos.name}</li>
                                    <li>Telefono: {order.datos.phone}</li>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </td>
                            <td className="letra_tabla" data-label="Menus:">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes" data-label="Detalles del pedido:">{order.detalles}</td>
                            <td  className="letra_tabla" data-label="Total:">{order.total}
                            </td>
                            <td >
                                <button onClick={() => handleAcceptOrder(order._id)}>
									Aceptar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<table id="responsive-table" className="table">
					<thead className="thead-dark">
					    <tr>
                            <td colSpan="5">Pedidos en proceso</td>
                        </tr>
						<tr className="tr">
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
                            <td className="letra_tabla" data-label="Datos del Cliente:"> 
                                <ul>
                                    <li>Nombre: {order.datos.name}</li>
                                    <li>Telefono: {order.datos.phone}</li>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </td>
                            <td className="letra_tabla" data-label="Menus:">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes" data-label="Detalles del pedido:">{order.detalles}</td>
                            <td  className="letra_tabla" data-label="Total:">{order.total}
                            </td>
                            <td >
                                <button onClick={() => handleFinishOrder(order._id)}>
									Finalizar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<table id="responsive-table" className="table" >
					<thead className="thead-dark">
					    <tr>
                            <td colSpan="5">Pedidos terminados</td>
                        </tr>
						<tr className="tr">
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
                            <td className="letra_tabla" data-label="Datos del Cliente:"> 
                                <ul>
                                    <li>Nombre: {order.datos.name}</li>
                                    <li>Telefono: {order.datos.phone}</li>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </td>
                            <td className="letra_tabla" data-label="Menus:">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes" data-label="Detalles del pedido:">{order.detalles}</td>
                            <td  className="letra_tabla" data-label="Total:">{order.total}
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
				<table id="responsive-table" className="table" style={{marginBottom:"0"}}>
					<thead className="thead-dark">
					    <tr>
                            <td colSpan="5">Pedidos Enviados</td>
                        </tr>
						<tr className="tr">
							<th className="th" scope="col">Datos del Cliente</th>
							<th className="th" scope="col">Menus</th>
							<th className="th" scope="col">Detalles del pedido</th>
							<th className="th" scope="col">Total</th>
						</tr>
					</thead>
					<tbody className="tbody">{orders.filter((order) => order.estado === "Enviado")
                    .map((order) => (
                        <tr key={order._id}>
                            <td className="letra_tabla" data-label="Datos del Cliente:"> 
                                <ul>
                                    <li>Direccion: {order.datos.address}</li>
                                 </ul>
                            </td>
                            <td className="letra_tabla" data-label="Menus:">
                                {order.items.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li> {item.title} - Cantidad: {order.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
							<td className="detallesOrdenes" data-label="Detalles del pedido:">{order.detalles}</td>
                            <td  className="letra_tabla" data-label="Total:">{order.total}
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
