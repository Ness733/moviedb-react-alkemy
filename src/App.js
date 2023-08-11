import Login from "./components/Login";
import Listado from "./components/Listado";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";
import { useState, useEffect } from "react";

import "./css/bootstrap.min.css";
import "./css/app.css";

function App() {
  const [currentFavorites, setFavorites] = useState([]);

  useEffect(() => {
    const favMoviesLocal = localStorage.getItem("favs");
    if (favMoviesLocal !== null) {
      const favsArray = JSON.parse(favMoviesLocal);
      setFavorites(favsArray);
    }
  }, []);

  const favorites = (e) => {
    const favMovies = localStorage.getItem("favs");
    let tempMovies;
    if (!favMovies) {
      tempMovies = [];
    } else {
      tempMovies = JSON.parse(favMovies);
    }
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: Number(btn.dataset.id),
    };
    let movieExists = tempMovies.find(
      (movieTemp) => movieTemp.id === movieData.id
    );
    if (!movieExists) {
      tempMovies.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMovies));

      setFavorites(tempMovies);
    } else {
      let movieRemain = tempMovies.filter(
        (movieTemp) => movieTemp.id !== movieData.id
      );
      localStorage.setItem("favs", JSON.stringify(movieRemain));

      setFavorites(movieRemain);
    }
  };

  return (
    <>
      <Header favorites={currentFavorites} />
      <div className="d-flex w-auto my-5">
        <Routes>
          <Route path="/" Component={Login} />
          <Route
            path="/list"
            Component={() => (
              <Listado
                favorites={favorites}
                currentFavorites={currentFavorites}
              />
            )}
          />

          <Route path="/details" Component={Detalle} />
          <Route path="/results" Component={Resultados} />
          <Route
            path="/favorites"
            Component={() => (
              <Favoritos
                favorites={favorites}
                currentFavorites={currentFavorites}
              />
            )}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
