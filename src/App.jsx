import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer/footer";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Router } from "./router";
import { DataProvider } from "./components/DataContext/DataContext";

export default function App() {
  return (
      <DataProvider>
      <BrowserRouter>
        <NavBar />
        <Router />
        <Footer />
      </BrowserRouter>
      </DataProvider>
  );
}
