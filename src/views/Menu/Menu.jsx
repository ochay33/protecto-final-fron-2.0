import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

<<<<<<< HEAD
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
=======
import { ButtonApp } from "../../components/Button/Button"

export const Curso = () => {
	const [curso, setCurso] = useState([])

	const { cursoId } = useParams()

	useEffect(() => {
		fetch("http://localhost:3005/cursos")
			.then(response => response.json())
			.then(loquerecibo => {
				const getCursoFromCursos = loquerecibo.find(
					curso => curso.id === Number(cursoId)
				)
				setCurso(getCursoFromCursos)
			})
	}, [cursoId])

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col">
					<div className="my-4">
						<h3>{curso.title}</h3>
					</div>
					<div className="mb-2">
						<img
							className="avatar"
							src={curso.img_mentor}
							alt={curso.mentor}
						/>
						<span>{curso.mentor}</span>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
					</div>
				</div>
			</div>
			<div className="row">
<<<<<<< HEAD
				<div className="col-6">
					<img src={menu.img}  width="100%" />
					<p>{menu.detail}</p>
=======
				{/* <ButtonApp text="hola" click={() => alert(1)} /> */}
				<div className="col-6">
					<iframe
						width="560"
						height="315"
						src={curso.video}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
					<p>{curso.detalle}</p>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
				</div>
				<div className="col-6">
					<div className="card ml-3 w-100">
						<div className="card-header">
							<h3>
<<<<<<< HEAD
								$885
							</h3>
						</div>
						<div className="card-body">
							<h4 className="card-title">Sanguche Premium</h4>
							<hr />
							<ul>
								<li>mila de nalga</li>
								<li>jqyh</li>

								<li>pedila ya</li>
							</ul>

							<Link to="/comprar" className="btn btn-info btn-block">
								Comprar Menu
=======
								$885 <span>Arg/mes</span>{" "}
							</h3>
						</div>
						<div className="card-body">
							<h4 className="card-title">Membresía Premium</h4>
							<hr />
							<ul>
								<li>Acceso a +150 cursos</li>
								<li>Cancela en cualquier momento</li>

								<li>Clases en vivo semanales</li>
							</ul>

							<Link to="/comprar" className="btn btn-info btn-block">
								Comprar Membresía
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
<<<<<<< HEAD
}
=======
}
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
