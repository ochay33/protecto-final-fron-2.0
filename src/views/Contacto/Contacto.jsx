import React from 'react';
import { Form } from 'react-bootstrap';
import '../../css/contacto.css';

export const Contacto = () => {
  return (
    <div className="contact-form">
      <Form>
        <div className="form-group" style={{color:"white"}}>
          <label className="form-label" >Ingresa tu Nombre y Apellido</label>
          <input type="text" className="form-control" />
          <label className="form-label" >Ingresa tu Mail</label>
          <input type="email" className="form-control"/>
        </div>
        <div className="form-group"style={{color:"white"}}>
          <label className="form-label">Ingresa tu consulta</label>
          <textarea className="form-control" rows="2"></textarea>
          <button className="btn btn-success mt-3">Enviar</button>
        </div>
      </Form>
    </div>
  );
};
