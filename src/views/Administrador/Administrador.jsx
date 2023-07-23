import { useState, useEffect } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"


export const Administrador = () => {
	const [menues, setMenues] = useState([])
	const [menuEditable, setMenuEditable] = useState({})
	const [showForm, setShowForm] = useState(false)
	const [createOrEdit, setCreateOrEdit] = useState("")

	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menues`)
			.then(response => response.json())
			.then(loquerecibo => setMenues(loquerecibo))
	}, [])
	const headers = {
		Authorization: "Bearer " + localStorage.getItem("token"),
	  };

	const deleteMenu = async id => {
		const resp = await axios.delete(
			`${import.meta.env.VITE_SERVER_URI}/api/delete-menu/${id}`,
			{
				headers,
			}
		)
		const { status } = resp

		if (status === 200) {
			const deleteMenuOnRender = menues.filter(menu => menu.id !== id)
			setMenues(deleteMenuOnRender)
		}
	}

	const updateMenu = async menu => {
		const { title, detail, id, precio, categoria, img } = menu

		const resp = await axios.put(
			`${import.meta.env.VITE_SERVER_URI}/api/update-menu`,
			{
				id_menu: id,
				modify: {
					title,
					detail,
					img,
					precio,
					categoria,
				},
			},
			{
				headers,
			}
		)
		const { status } = resp

		if (status === 200) {
			const othersMenues = menues.filter(prev => prev.id !== menu.id)
			setMenues([...othersMenues, menu])
		}
		setShowForm(false)
	}

	const createMenu = async menu => {
		const { title, detail, img, precio, categoria } = menu

		const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-menu`,
			{
				title,
                img,
                detail,
                precio,
                categoria,
			},
			{
				headers: { ...headers, accept: "application/json"},
			}
		)
		const { status } = resp

		if (status === 201) {
			const othersMenues = menues.filter(prev => prev.id !== menu.id)
			setMenues([...othersMenues, menu])
		}
		setShowForm(false)
	}

	const handleDelete = (id, title) => {
		let validator = window.confirm(
			`Está seguro que quiere eliminar el menu ${title}?`
		)
		if (validator) deleteMenu(id)
	}

	const handleEdit = menu => {
		setShowForm(true)
		setMenuEditable(menu)
		setCreateOrEdit("edit")
	}

	const handleCreate = () => {
		setShowForm(true)
		setMenuEditable({})
		setCreateOrEdit("create")
	}

	return (
		<Container className="mt-4" id="admin">
			<h1 style={{ color: "white"}}>Admin</h1>
			{!showForm && (
				<table className="table">
					<thead className="thead-dark">
						<tr style={{ color: "white"}}>
							<th scope="col">Titulo</th>
							<th scope="col">Detalle</th>
							<th scope="col">Categoria</th>
							<th scope="col">Precio</th>
						</tr>
					</thead>
					<tbody>
						{menues.map(menu => (
							<tr key={menu.id}>
								<th className="letra_tabla">{menu.title}</th>
								<td className="letra_tabla">{menu.detail}</td>
								<td className="letra_tabla">{menu.categoria}</td>
								<td className="letra_tabla">{menu.precio}</td>
								<td>
									<button
										className="btn btn-danger mr-2 mb-2"
										onClick={() =>
											handleDelete(menu.id, menu.title)
										}
									>
										Eliminar
									</button>
									<button
										className="btn btn-warning mr-2 mb-2 "
										onClick={() => handleEdit(menu)}
									>
										Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<button onClick={handleCreate}>Crear nuevo</button>
			{showForm && (
				<form>
					<div style={{ color: "white"}}>
						<label>Título</label>
						<input
							type="text"
							value={menuEditable.title}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, title: event.target.value }
								})
							}
						/>
					</div>
					<div style={{ color: "white"}}>
						<label>Descipcion</label>
						<textarea
							value={menuEditable.detail}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, detail: event.target.value }
								})
							}
						></textarea>
					</div>
					<div style={{ color: "white"}}>
						<label>categoria</label>
						<textarea
							value={menuEditable.categoria}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, categoria: event.target.value }
								})
							}
						></textarea>
					</div>
					<div style={{ color: "white"}}>
						<label>precio</label>
						<textarea
							value={menuEditable.precio}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, precio: event.target.value }
								})
							}
						></textarea>
					</div>
					<div style={{ color: "white"}}>
						<label>Imagen</label>
						<input
							type="text"
							value={menuEditable.img}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, img: event.target.value }
								})
							}
						/>
					</div>
					{createOrEdit === "edit" && (
						<button
							type="button"
							onClick={() => updateMenu(menuEditable)}
						>
							Editar
						</button>
					)}
					{createOrEdit === "create" && (
						<button
							type="button"
							onClick={() => createMenu(menuEditable)}
						>
							Crear
						</button>
					)}
				</form>
			)}
		</Container>
	)
}