import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import "../../css/home.css"

export const Home = () => (
	<Container className="mt-4">
		<div>
			<div style={{display:"flex", textAlign:"center", justifyContent:"center"}}>
					<Link to="/registro" className="btn btn-outline-info mt-3">
						<h2>
						    Crea tu cuenta AQUI
						</h2>						      
					</Link>
			</div>
			<br />
			<div style={{display:"flex", textAlign:"center", justifyContent:"center"}}> 
				<img src="https://images.adsttc.com/media/images/552d/b63a/e58e/cebf/5400/0272/large_jpg/Bar_Raval_30.jpg?1429059123"  width="80%" height="80%" style={{textAlign:"center"}} />
			</div>
		</div>
	</Container>
)
