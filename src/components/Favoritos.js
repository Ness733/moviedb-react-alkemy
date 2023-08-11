import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Favoritos(props) {
  const token = sessionStorage.getItem("token");
  return (
    <>
      <div>
        <div className="row pb-5 w-100 mx-3 justify-content-center">
          {!props.currentFavorites.length && (
            <div className="text-center">
              There are no favorite items yet...
            </div>
          )}
          {props.currentFavorites.map((movie, index) => {
            return (
              <div
                key={index}
                className="card p-1 m-3 shadow"
                style={{ width: "18rem" }}
              >
                <img
                  src={movie.imgURL}
                  className="card-img-top"
                  alt="imagen pelicula"
                />
                <button
                  className="favourite-btn"
                  data-id={movie.id}
                  onClick={props.favorites}
                >
                  {props.currentFavorites.find((mov) => mov.id === movie.id) ? (
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
      </div>
    </>
  );
}
