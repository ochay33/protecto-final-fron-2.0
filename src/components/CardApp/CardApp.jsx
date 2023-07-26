import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export const CardApp = ({ menu }) => (
	<Card key={menu.id} className="col-md-4 float-start" style={{ width: "18rem" }}>
		<div>
			<Card.Img variant="top" style={{height:150}} src={menu.img} />
		</div> 
		<Card.Body>
			<Card.Title>{menu.title}</Card.Title>
			<hr />
			<Card.Title>{menu.precio}</Card.Title>
			<hr />
			<Link to={`/menu/${menu.id}`}>
				<Button variant="primary">Más información</Button>
			</Link>
		</Card.Body>
	</Card>
)