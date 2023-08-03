import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"


export const Orders = () => {
	const [orders, setOrders] = useState([])
	
	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-Orders`)
			.then(response => response.json())
			.then(loquerecibo => setOrders(loquerecibo))
	}, [])	

	// const items = (orders) => {
	// 	{orders.map(item =><div>${item}</div>)}
	// 	return items_recorridos;
	// }
	
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
							<tr key={orders._id}>
								<th className="letra_tabla">{orders.datos.name}</th>
								{/* <td className="letra_tabla">{orders.items[0].detail}</td> */}
								{/* <td className="letra_tabla">{items(orders)}</td> */}
								{/* {console.log(orders)} */}
								<td className="letra_tabla">{orders.items.map(item =>(
									<div key={item.id}><ul><li>{item.title}</li></ul></div>
								))}</td>
								<td className="letra_tabla">{orders.total}</td>	
							</tr>
						))}
					</tbody>
				</table>
		</Container>
	)
}
