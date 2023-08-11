import axios from "axios";
import Swal from "sweetalert";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      Swal({
        title: "Error!",
        text: "Fields can't be empty",
        icon: "error",
        button: "Okay!",
      });
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      Swal({
        title: "Error!",
        text: "You must write a valid email",
        icon: "error",
        button: "Okay!",
      });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      Swal({
        title: "Error!",
        text: "Invalid Credentials",
        icon: "error",
        button: "Okay!",
      });
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        navigation("/list");
        Swal({
          title: "Success!",
          text: "Successful login!",
          icon: "success",
          button: "Okay!",
        });
      });
  };

  const token = sessionStorage.getItem("token");

  return token ? (
    <Navigate replace to="/list" />
  ) : (
    <>
      <div
        className="d-flex flex-column align-items-center mt-5 w-100"
        style={{ height: "78vh" }}
      >
        <h2 className="w-50">Formulario de login</h2>
        <form className="w-50" onSubmit={() => submitHandler}>
          <div className="mb-3">
            <label className="form-label">
              <span>Correo Electrónico:</span>
              <input
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                type="text"
                name="email"
                style={{ width: 500 }}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <span>Contraseña:</span>
              <input
                className="form-control"
                id="exampleInputPassword1"
                type="password"
                name="password"
                style={{ width: 500 }}
              />
            </label>
          </div>
          <button className="btn btn-primary" type="submit">
            Ingresar
          </button>
          <p>
            user: challenge@alkemy.org <br /> password: react
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
