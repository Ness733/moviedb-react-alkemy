import Login from "./components/Login";
import Listado from "./components/Listado";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

import "./css/bootstrap.min.css";
import "./css/app.css";

function App() {
  return (
    <>
      <Header />
      <div className="d-flex w-auto my-5">
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/list" Component={() => <Listado />} />
          <Route path="/details" Component={Detalle} />
          <Route path="/results" Component={Resultados} />
          <Route path="/favorites" Component={() => <Favoritos />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
