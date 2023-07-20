import { useState, useEffect } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"

<<<<<<< HEAD
const headers = {
	Authorization: "Bearer " + localStorage.getItem("token"),
}

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
		const { title, detail, id } = menu

		const resp = await axios.put(
			`${import.meta.env.VITE_SERVER_URI}/api/update-menu`,
			{
				id_menu: id,
				modify: {
					title,
					detail,
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
		const { title, detail, img, } = menu

		const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-menu`,
			{
				title,
				img,
				detail,
			},
			{
				headers: { ...headers, accept: "application/json" },
			}
		)
		const { status } = resp

		if (status === 201) {
			const othersMenues = menues.filter(prev => prev.id !== menu.id)
			setMenues([...othersMenues, menu])
		}
		setShowForm(false)
=======
export const Administrator = () => {
	const [cursos, setCursos] = useState([])
	const [cursoEditable, setCursoEditable] = useState({})
	const [showForm, setShowForm] = useState(false)

	useEffect(() => {
		fetch("http://localhost:3005/cursos")
			.then(response => response.json())
			.then(loquerecibo => setCursos(loquerecibo))
	}, [])

	const deleteCurso = async id => {
		const resp = await axios.delete(`http://localhost:3005/cursos/${id}`)
		const { status } = resp

		if (status === 200) {
			const deleteCourseOnRender = cursos.filter(curso => curso.id !== id)
			setCursos(deleteCourseOnRender)
		}
	}

	const updateCurso = async curso => {
		if (!curso.mentor) {
			alert("eh loco!")
			return
		} else {
			const resp = await axios.put(
				`http://localhost:3005/cursos/${curso.id}`,
				curso
			)
			const { status } = resp

			if (status === 200) {
				const othersCourses = cursos.filter(prev => prev.id !== curso.id)
				setCursos([...othersCourses, curso])
			}
			setShowForm(false)
		}
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
	}

	const handleDelete = (id, title) => {
		let validator = window.confirm(
<<<<<<< HEAD
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
=======
			`Está seguro que quiere eliminar el curso ${title}?`
		)
		if (validator) deleteCurso(id)
	}

	const handleEdit = curso => {
		setShowForm(true)
		setCursoEditable(curso)
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
	}

	return (
		<Container className="mt-4" id="admin">
			<h1>Admin</h1>
<<<<<<< HEAD
=======
			<button>Agregar</button>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
			{!showForm && (
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Título</th>
							<th scope="col">Detalle</th>
<<<<<<< HEAD
=======
							<th scope="col">Mentor</th>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
<<<<<<< HEAD
						{menues.map(menu => (
							<tr key={menu.id}>
								<th>{menu.title}</th>
								<td>{menu.detail}</td>
=======
						{cursos.map(curso => (
							<tr key={curso.id}>
								<th>{curso.title}</th>
								<td>{curso.detalle}</td>
								<td>{curso.mentor}</td>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
								<td>
									<button
										className="btn btn-danger mr-2 mb-2"
										onClick={() =>
<<<<<<< HEAD
											handleDelete(menu.id, menu.title)
=======
											handleDelete(curso.id, curso.title)
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
										}
									>
										Eliminar
									</button>
									<button
										className="btn btn-warning mr-2 mb-2 "
<<<<<<< HEAD
										onClick={() => handleEdit(menu)}
=======
										onClick={() => handleEdit(curso)}
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
									>
										Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
<<<<<<< HEAD
			<button onClick={handleCreate}>Crear nuevo</button>
=======
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
			{showForm && (
				<form>
					<div>
						<label>Título</label>
						<input
							type="text"
<<<<<<< HEAD
							value={menuEditable.title}
							onChange={event =>
								setmenuEditable(prev => {
=======
							value={cursoEditable.title}
							onChange={event =>
								setCursoEditable(prev => {
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
									return { ...prev, title: event.target.value }
								})
							}
						/>
					</div>
					<div>
						<label>Desc</label>
						<textarea
<<<<<<< HEAD
							value={menuEditable.detail}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, detail: event.target.value }
=======
							value={cursoEditable.detalle}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, detalle: event.target.value }
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
								})
							}
						></textarea>
					</div>
					<div>
						<label>Imagen</label>
						<input
							type="text"
<<<<<<< HEAD
							value={menuEditable.img}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, img: event.target.value }
=======
							value={cursoEditable.imagen}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, imagen: event.target.value }
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
								})
							}
						/>
					</div>
<<<<<<< HEAD
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
=======
					<div>
						<label>Mentor</label>
						<input
							type="text"
							value={cursoEditable.mentor}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, mentor: event.target.value }
								})
							}
						/>
					</div>
					<button type="button" onClick={() => updateCurso(cursoEditable)}>
						Editar
					</button>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
				</form>
			)}
		</Container>
	)
}
