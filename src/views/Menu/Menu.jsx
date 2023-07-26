import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from "react-bootstrap/Button"

import "../../css/menu.css"

export const Menu = () => {
	const [menu, setMenu] = useState([])
	
	const { menuId } = useParams()

	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menu/${menuId}`)
			.then(response => response.json())
			.then(loquerecibo => setMenu(loquerecibo))
			
	}, [menuId])

	return (
		<div className="container mt-5 curso">
			<div className="row">
				<div className="col">
					<div className="my-4">
						<h3>{menu.title}</h3>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<img src={menu.img}  width="100%" />
				</div>
				<div className="col-6">
					<div className="card ml-3 w-100">
						<div className="card-header">
							<h3 className="titulo">
							{menu.title}
							</h3>
						</div>
						<div className="card-body">
							<h4 className="card-title">Detalle del menu</h4>
							<hr />
							<ul>
								<p>{menu.detail}</p>
							</ul>

							<Button>
							Agregar al Carrito
						    </Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}