import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import useMovies from "../hooks/useMovies";

function Listado() {
  // const token = sessionStorage.getItem("token");
  const { favorites, currentFavorites } = useMovies();
  const imgPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const [moviesList, setMoviesList] = useState([]);
  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=37676cbbe16adc2c98d10e0710834b85&page=1";
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data.results;
        setMoviesList(apiData);
      })
      .catch((error) => {
        Swal({
          title: `Something went wrong, try again later!`,
          text: `${error}`,
          icon: "error",
          button: "Okay!",
        });
      });
  }, []);
  return (
    <>
      <div className="row pb-5 w-100 mx-3 justify-content-center">
        <h2 className="text-center">Featured</h2>
        {moviesList.map((movie, index) => {
          return (
            <div
              key={index}
              className="card p-1 m-3 shadow"
              style={{ width: "18rem" }}
            >
              <img
                src={`${imgPath + movie.poster_path}`}
                className="card-img-top"
                alt="imagen pelicula"
              />
              <button
                className="favourite-btn"
                data-id={movie.id}
                onClick={favorites}
              >
                {currentFavorites.find((mov) => mov.id === movie.id) ? (
                  <i className="bi-balloon-heart-fill" />
                ) : (
                  <i className="bi-balloon-heart" />
                )}
              </button>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{`${movie.overview
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}...`}</p>
                <Link
                  to={`/details?movieID=${movie.id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Listado;
