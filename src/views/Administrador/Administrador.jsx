import { useState, useEffect } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"

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
	}

	const handleDelete = (id, title) => {
		let validator = window.confirm(
			`Está seguro que quiere eliminar el curso ${title}?`
		)
		if (validator) deleteCurso(id)
	}

	const handleEdit = curso => {
		setShowForm(true)
		setCursoEditable(curso)
	}

	return (
		<Container className="mt-4" id="admin">
			<h1>Admin</h1>
			<button>Agregar</button>
			{!showForm && (
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Título</th>
							<th scope="col">Detalle</th>
							<th scope="col">Mentor</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{cursos.map(curso => (
							<tr key={curso.id}>
								<th>{curso.title}</th>
								<td>{curso.detalle}</td>
								<td>{curso.mentor}</td>
								<td>
									<button
										className="btn btn-danger mr-2 mb-2"
										onClick={() =>
											handleDelete(curso.id, curso.title)
										}
									>
										Eliminar
									</button>
									<button
										className="btn btn-warning mr-2 mb-2 "
										onClick={() => handleEdit(curso)}
									>
										Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{showForm && (
				<form>
					<div>
						<label>Título</label>
						<input
							type="text"
							value={cursoEditable.title}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, title: event.target.value }
								})
							}
						/>
					</div>
					<div>
						<label>Desc</label>
						<textarea
							value={cursoEditable.detalle}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, detalle: event.target.value }
								})
							}
						></textarea>
					</div>
					<div>
						<label>Imagen</label>
						<input
							type="text"
							value={cursoEditable.imagen}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, imagen: event.target.value }
								})
							}
						/>
					</div>
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
				</form>
			)}
		</Container>
	)
}
