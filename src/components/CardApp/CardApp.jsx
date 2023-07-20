import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export const CardApp = ({ menu }) => (
	<Card key={menu.id} className="col-md-4 float-start" style={{ width: "18rem" }}>
		<div className="img-wrapper">
			<Card.Img variant="top" src={menu.img} />
		</div> 
		<Card.Body>
			<Card.Title>{menu.title}</Card.Title>
			<hr />
			<Link to={`/menu/${menu.id}`}>
				<Button variant="primary">Más información</Button>
			</Link>
		</Card.Body>
	</Card>
)