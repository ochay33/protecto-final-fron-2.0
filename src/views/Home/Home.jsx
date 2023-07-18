import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"

import home2 from "../../images/home2.png"
import "../../css/home.css"

export const Home = () => (
	<Container className="mt-4">
		<div className="home-container">
			<div className="row">
				<div className="col-6">
					<h1 className="font-weight-bold">
					</h1>
					<Link to="/registro" className="btn btn-outline-info mt-3">
						Crea tu cuenta
					</Link>
				</div>
				<div className="col-6">
					<img src={home2} alt="portada1" />
				</div>
			</div>
			<div className="row">
				<div className="col-8 offset-2 parrafito text-grey">
				</div>
			</div>
		</div>
	</Container>
)
