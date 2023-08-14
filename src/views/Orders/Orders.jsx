import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import axios from "axios"

export const Orders = () => {
	const [orders, setOrders] = useState([])
	const [showTable, setShowTable] = useState(false)

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
		setShowTable(true)
	};
	const handleHide = () => {
		setShowTable(false)
	};
	
	return (
		<Container className="mt-4" id="admin">
			<h1 style={{ color: "white"}}>Pedidos</h1>
				<table className="table">
					<thead className="thead-dark">
					    <tr style={{textAlign:"center",  display:"flex", justifyContent:"center", width:"246%", backgroundColor:"red"}}>
                            <th colSpan="4">Pedidos en espera</th>
                        </tr>
						<tr style={{ color: "white"}}>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Datos del Cliente</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Menus</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Total</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Aceptar pedido</th>
						</tr>
					</thead>
					<tbody style={{ backgroundColor: "gray" }}>{orders.filter((order) => order.estado === "En espera")
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
                                        <li> {item.title} - Cantidad: {item.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
                            <td style={{ textAlign: "center" }} className="letra_tabla">{order.total}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button onClick={() => handleAcceptOrder(order._id)}>
									Aceptar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<table className="table">
					<thead className="thead-dark">
					<tr style={{textAlign:"center",  display:"flex", justifyContent:"center", width:"246%", backgroundColor:"red"}}>
                            <th colSpan="4">Pedidos en proceso</th>
                        </tr>
						<tr style={{ color: "white"}}>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Datos del Cliente</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Menus</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Total</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Finalizar Pedido</th>
						</tr>
					</thead>
					<tbody style={{ backgroundColor: "gray" }}>{orders.filter((order) => order.estado === "En proceso")
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
                                        <li> {item.title} - Cantidad: {item.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
                            <td style={{ textAlign: "center" }} className="letra_tabla">{order.total}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button onClick={() => handleFinishOrder(order._id)}>
									Finalizar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<table className="table">
					<thead className="thead-dark">
					<tr style={{textAlign:"center",  display:"flex", justifyContent:"center", width:"246%", backgroundColor:"red"}}>
                            <th colSpan="4">Pedidos terminados</th>
                        </tr>
						<tr style={{ color: "white"}}>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Datos del Cliente</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Menus</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Total</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Pedidos Terminados</th>
						</tr>
					</thead>
					<tbody style={{ backgroundColor: "gray" }}>{orders.filter((order) => order.estado === "Terminado")
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
                                        <li> {item.title} - Cantidad: {item.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
                            <td style={{ textAlign: "center" }} className="letra_tabla">{order.total}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button onClick={() => handleSendOrder(order._id)}>
									Enviar
								</button>
                            </td>
                        </tr>))}
                    </tbody>
				</table>
				<button onClick={handleShow} style={{ textAlign: "center" }}>
					Mostrar Pedidos enviados
				</button>
				{showTable && (
					<table className="table">
					<thead className="thead-dark">
					<tr style={{textAlign:"center",  display:"flex", justifyContent:"center", width:"246%", backgroundColor:"red"}}>
                            <th colSpan="4">Pedidos Enviados</th>
                        </tr>
						<tr style={{ color: "white"}}>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Datos del Cliente</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Menus</th>
							<th style={{textAlign:"center", border: "1px solid #ccc"}} scope="col">Total</th>
						</tr>
					</thead>
					<tbody style={{ backgroundColor: "gray" }}>{orders.filter((order) => order.estado === "Enviado")
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
                                        <li> {item.title} - Cantidad: {item.cantidad}
                                        </li>
                                    </ul>
                                </div> ))}
                            </td>
                            <td style={{ textAlign: "center" }} className="letra_tabla">{order.total}
                            </td>
                        </tr>))}
                    </tbody>
					<button onClick={handleHide}>Aceptar</button>
				</table>
				
				)}
		</Container>
	)		
}
