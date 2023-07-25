import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer/footer";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Router } from "./router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Router />
      </BrowserRouter>
      <Footer />
    </>
  );
}
