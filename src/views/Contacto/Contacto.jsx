import backgroundImage from '../../img/logo2.png';

export const Contacto = () => {
    return (
        <>
        <div className="col-sm-12 col-md-6 col-lg-6" id="fondo" style={{display:"flex", justifyContent:"center", color:"white"}}>
            <h2>CONTACTO</h2>
            <br />
            <br />
        </div>
        <div className="container alturaParaFooter my-4 carritoAlturaFooter">
            <div className="row" style={{display:"flex", justifyContent:"center", border: "1px solid #ccc", width:"100%"}}>
              
              <div className="col-sm-12 col-md-6 col-lg-6" style={{display:"flex-inline", justifyContent:"center", color:"white"}}>
                <h2 style={{textAlign:"center"}}>INFORMACIÓN</h2>
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
        <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
        <img style={{height:"10rem"}} src={backgroundImage} alt="Fondo" />
        </div>
        </>
      );
    };