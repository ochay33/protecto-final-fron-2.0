import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { ButtonApp } from "../../../../components/Button/Button"

export const CardApp = ({ curso }) => (
	<Card key={curso.id} className="col-md-4 float-start">
		<div className="img-wrapper">
			<Card.Img variant="top" src={curso.imagen} />
		</div>
		<Card.Body>
			<Card.Title>{curso.title}</Card.Title>
			<Card.Text id="descriptione">{curso.detalle}</Card.Text>
			<hr />
			<Card.Text>
				<mark>Mentor: {curso.mentor}</mark>
			</Card.Text>
			<Link to={`/course/${curso.id}`}>
				<Button variant="primary">Kupita ku maphunziro</Button>
			</Link>
		</Card.Body>
	</Card>
)
