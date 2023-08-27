import backgroundImage from '../../img/logo2.png';
import "../../css/contacto.css";

export const Contacto = () => {
    return (
        <>
        <div className="col-sm-12 col-md-6 col-lg-6" id="fondo">
            <h2>CONTACTO</h2>
            <br />
            <br />
        </div>
        <div className="container alturaParaFooter my-4 carritoAlturaFooter">
            <div id="todo" className="row">
              
              <div id="contenido" className="col-sm-12 col-md-6 col-lg-6">
                <h2>INFORMACIÓN</h2>
                <hr />
                <ul>
                  <li>
                    <i className="fa fa-map-marker"></i>Tucumán - Argentina
                  </li>
                  <li>
                    <i className="fa fa-phone"></i> (666) 666 666 666
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i> Sanguchería Nadir
                  </li>
                </ul>
                <hr />
                <p>Si quieres hacer un pedido, comunícate con el número de arriba. Atendemos de jueves a domingos.</p>
                <p>sangucherianadir@gmail.com</p>
                <hr />
              </div>
            </div>
        </div>
        <div id="divimagen">
        <img id="imagen" src={backgroundImage} alt="Fondo" />
        </div>
        </>
      );
    };