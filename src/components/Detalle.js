import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert";

export default function Detalle() {
  const API_DETAILS = "?api_key=37676cbbe16adc2c98d10e0710834b85";
  const API_BASE = "https://api.themoviedb.org/3/movie/";

  const [currentDetails, setCurrentDetails] = useState([]);
  const imgPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  useEffect(() => {
    const query = new URLSearchParams(window.location.hash.slice(10));

    const movieID = query.get("movieID");

    const endPoint = API_BASE + movieID + API_DETAILS;
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = [response.data];
        setCurrentDetails(apiData);
      })
      .catch((error) => {
        Swal({
          title: `Something went wrong, try again later!`,
          text: `${error}`,
          icon: "error",
          button: "Okay!",
        });
      });
  }, [setCurrentDetails]);

  return (
    <>
      {currentDetails.map((movie, index) => {
        return (
          <div
            key={movie.title}
            className="d-flex m-lg-auto justify-content-center row"
          >
            <h2 className="text-center">{movie.title}</h2>
            {movie.poster_path === null ? (
              <div className="col-4 bg-body-secondary w-auto text-center">
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ width: "250px", height: "420px" }}
                >
                  <i className="bi-eye-slash" style={{ fontSize: "10rem" }} />
                  <small className="text-muted">Not Available</small>
                </div>
              </div>
            ) : (
              <div key={movie.title} className="col-auto">
                <img
                  src={`${imgPath + movie.poster_path}`}
                  className="card-img-top"
                  alt="imagen pelicula"
                />
              </div>
            )}

            <div key={index} className="col-8">
              <h5>Release Date: {movie.release_date}</h5>
              <h5>Genres</h5>
              <ul>
                {movie.genres.map((genre, index) => {
                  return <li key={index}>{genre.name}</li>;
                })}
              </ul>
              <h5>Overview</h5>
              <p>{movie.overview}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
