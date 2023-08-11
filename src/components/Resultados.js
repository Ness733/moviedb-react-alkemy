import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { Link } from "react-router-dom";

export default function Resultados() {
  const query = new URLSearchParams(window.location.hash.slice(10));
  console.log(query);
  const searchResult = query.get("search");
  const [moviesResult, setMoviesResults] = useState([]);
  const imgPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const SEARCH_ENDPOINT = "https://api.themoviedb.org/3/search/movie?";
  const API_KEY = "api_key=37676cbbe16adc2c98d10e0710834b85&";
  const SEARCH_QUERY = `&query=${searchResult}`;
  console.log(SEARCH_QUERY);

  useEffect(() => {
    const endPoint = SEARCH_ENDPOINT + API_KEY + SEARCH_QUERY;
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data.results;
        if (apiData.length === 0) {
          Swal({
            title: `Error`,
            text: "No Results",
            icon: "error",
            button: "Okay!",
          });
        }
        setMoviesResults(apiData);
      })
      .catch((error) => {
        Swal({
          title: `${error}`,
          text: "Something went wrong, try again later!",
          icon: "error",
          button: "Okay!",
        });
      });
  }, [SEARCH_QUERY]);

  return (
    <>
      <>
        <div className="row mx-0 pb-5 justify-content-center">
          <div className="text-center">
            <h4>Mostrando resultados para: {searchResult}</h4>
            {moviesResult.length === 0 && (
              <h3>No se encontraron resultados.</h3>
            )}
          </div>
          {moviesResult.map((movie, index) => {
            return (
              <div
                key={index}
                className="card p-1 m-3 shadow"
                style={{ width: "18rem" }}
              >
                {movie.poster_path === null ? (
                  <div className="col-4 bg-body-secondary w-auto text-center">
                    <div
                      className="d-flex flex-column w-100 align-items-center justify-content-center"
                      style={{ width: "250px", height: "420px" }}
                    >
                      <i
                        className="bi-eye-slash"
                        style={{ fontSize: "10rem" }}
                      />
                      <small className="text-muted">Not Available</small>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      src={`${imgPath + movie.poster_path}`}
                      className="img-fluid"
                      alt="imagen pelicula"
                    />
                  </div>
                )}
                <button className="favourite-btn">
                  <i className="bi-balloon-heart" />
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
    </>
  );
}
