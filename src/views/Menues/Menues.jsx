import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"

import Nav from "react-bootstrap/Nav"

<<<<<<< HEAD
import { CardApp } from "../../components/CardApp"

export const Menues = () => {
	const [menues, setMenues] = useState([])
	const [menuesRender, setMenuesRender] = useState([])
	const [term, setTerm] = useState("")
	  
	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-courses`)
			.then(response => response.json())
			.then(loquerecibo => {
				setMenues(loquerecibo)
				setMenuesRender(loquerecibo)
				console.log(loquerecibo)
=======
import { CardApp } from "./components/CardApp"

export const Courses = () => {
	const [cursos, setCursos] = useState([]) // 2
	const [cursosRender, setCursosRender] = useState([])
	const [term, setTerm] = useState("")

	useEffect(() => {
		fetch(`http://localhost:${import.meta.env.VITE_PORT}/cursos`)
			.then(response => response.json())
			.then(loquerecibo => {
				setCursos(loquerecibo)
				setCursosRender(loquerecibo)
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
			})
	}, [])

	const handleSearch = () => {
<<<<<<< HEAD
		const menuesFiltrados = menues.filter(menu =>
			menu.title.startsWith(term)
		)
		setMenuesRender(menuesFiltrados)
	}

	const handleReset = () => {
		setMenuesRender(menues)
=======
		const curssosFiltrados = cursos.filter(curso =>
			curso.title.startsWith(term)
		)
		setCursosRender(curssosFiltrados)
	}

	const handleReset = () => {
		setCursosRender(cursos)
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
		setTerm("")
	}

	return (
		<Container className="mt-4">
<<<<<<< HEAD
=======
			<h1>Courses 🦆 🦆</h1>
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
			<Nav>
				<input
					value={term}
					type="text"
					onChange={e => setTerm(e.target.value)}
				/>
				<button onClick={handleSearch}>Search</button>
				{term && (
					<span
						onClick={handleReset}
						style={{ color: "red", paddingLeft: 20, fontSize: 30 }}
					>
						X
					</span>
				)}
			</Nav>
			<Container id="cards" className="p-2 mt-4 float-start">
<<<<<<< HEAD
				{menuesRender.map(menu => (
					<CardApp key={menu.id} menu={menu} />
=======
				{cursosRender.map(curso => (
					<CardApp curso={curso} />
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
				))}
			</Container>
		</Container>
	)
<<<<<<< HEAD
}
=======
}
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
