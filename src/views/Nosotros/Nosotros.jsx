import Card from 'react-bootstrap/Card';
import '../../css/nosotros.css';
import yo from '../../img/gere.jpeg';
import nadir from '../../img/nadir.png';
import colo from '../../img/pablo.jpg';
import lucas from '../../img/lucas.png';
import backgroundImage  from '../../img/logo2.png';

export const Nosotros = () => {
  return (
    <>
      <div style={{display:"flex", justifyContent:"center"}}>
        <h1 style={{color:"white"}}>Dueños y creadores del bar</h1>
      </div>    
      <div className='container-nosotros' style={{color:"#333"}}>
        <div className='row'>
          <div className='col-md-6 col-lg-3 mb-4'>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={yo} />
              <Card.Body>
                <Card.Title>Geremias</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-md-6 col-lg-3 mb-4'>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={nadir} />
              <Card.Body>
                <Card.Title>Nadir</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-md-6 col-lg-3 mb-4'>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={colo} />
              <Card.Body>
                <Card.Title>Pablo</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-md-6 col-lg-3 mb-4'>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={lucas} />
              <Card.Body>
                <Card.Title>Lucas</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center my-4">
        <div className="col-lg-6">
          <div>
            <img src={backgroundImage} alt="Fondo" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
}