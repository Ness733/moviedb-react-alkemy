import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Buscador() {
  const navigation = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value.trim();
    console.log(keyword);

    if (keyword.length < 4) {
      Swal({
        title: "Error!",
        text: "Search field is empty!",
        icon: "error",
        button: "Okay!",
      });
    } else {
      e.target.keyword.value = "";
      navigation(`/results?search=${keyword}`);
    }
  };

  return (
    <form className="d-flex align-items-center" onSubmit={submitHandler}>
      <div className="w-100">
        <label className="form-label mb-0 mx-5 w-75">
          <input
            className="form-control w-100"
            type="text"
            name="keyword"
            placeholder="Search something..."
          />
        </label>
      </div>
      <button className="btn btn-success" type="submit">
        Search
      </button>
    </form>
  );
}
