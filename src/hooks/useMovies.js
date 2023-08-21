import { useState, useEffect } from "react";

export default function useMovies() {
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

  return { currentFavorites, setFavorites, favorites };
}
