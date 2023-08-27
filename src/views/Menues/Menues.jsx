import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import cerrar from "../../img/cerrar2.png";
import Button from "react-bootstrap/Button";
import { CardApp } from "../../components/CardApp";

import "../../css/menues.css";

export const Menues = () => {
  const [menues, setMenues] = useState([]);
  const [menuesRender, setMenuesRender] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menues`)
      .then((response) => response.json())
      .then((loquerecibo) => {
        setMenues(loquerecibo);
        setMenuesRender(loquerecibo);
      });
  }, []);

  const handleSearch = () => {
    const menuesFiltrados = menues.filter((menu) =>
      menu.title.startsWith(term)
    );
    setMenuesRender(menuesFiltrados);
  };

  const handleReset = () => {
    setMenuesRender(menues);
    setTerm("");
  };

  return (
    <Container id="container">
       <Nav id="nav">
        <input
          value={term}
          type="text"
          onChange={(e) => setTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        {term && (
          <span
            onClick={handleReset}
            style={{ color: "red", paddingLeft: 20, fontSize: 30 }}
          >
            <Button><img src={cerrar} width={30} /></Button>
          </span>
        )}
      </Nav>
      <br />
      <Container id="cards">
        {menuesRender.map((menu) => (
          <CardApp key={menu.id} menu={menu} />
        ))}
      </Container>
    </Container>
  );
};
