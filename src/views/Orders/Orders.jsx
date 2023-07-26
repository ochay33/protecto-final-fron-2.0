import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"


export const Orders = () => {
	const [orders, setOrders] = useState([])
	
	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-Orders`)
			.then(response => response.json())
			.then(loquerecibo => setOrders(loquerecibo))
	}, [])	
	return (
		<Container className="mt-4" id="admin">
			<h1 style={{ color: "white"}}>Pedidos</h1>
				<table className="table">
					<thead className="thead-dark">
						<tr style={{ color: "white"}}>
							<th scope="col">Datos</th>
							<th scope="col">Items</th>
							<th scope="col">Total</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(orders => (
							<tr key={orders.id}>
								<th className="letra_tabla">{orders.datos}</th>
								<td className="letra_tabla">{orders.items}</td>
								<td className="letra_tabla">{orders.total}</td>	
							</tr>
						))}
					</tbody>
				</table>
		</Container>
	)
}
