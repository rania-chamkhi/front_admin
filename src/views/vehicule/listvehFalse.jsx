import { useState, useEffect } from "react";
import vehiculeService from "../../Service/vehiculeService";
import Swal from "sweetalert2";
import "./style1.css";

const ListeFalse = () => {
  const [vehicule, setVehicule] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 2;

  const getVehNonDispo = () => {
    vehiculeService
      .getVehNonDispo()
      .then((res) => {
        console.log(res);
        setVehicule(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateState = (id) => {
    Swal.fire({
      title: "Are you sure to change state?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        vehiculeService.updateDisponibVeh(id).then((res) => {
          getVehNonDispo();
          Swal.fire("this car is disponible!", "", "success");
        });
      }
    });
  };

  useEffect(() => {
    getVehNonDispo();
  }, []);

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = vehicule?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.marque.toLowerCase().includes(inputText);
    }
  });

  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = filteredData?.slice(startIndex, endIndex);

  return (
    <div>
      <div
        style={{ width: "80% ", margin: "auto", marginTop: "45px" }}
        className="card"
      >
        <div className="card-header">
          <h2
            className="text-center"
            style={{
              fontSize: "25px",
              color: "#6e001d",
              textShadow: "1px 1px #ccc",
             
            }}
          >
            Listes de véhicules à réserver
          </h2>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="list-title">Liste des véhicules réservés</h5>
            </div>
            <div className="col-md-6">
              <form className="form-inline float-md-right">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="seach"
                    placeholder="Rechercher..."
                    onChange={inputHandler}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="text-center">id</th>
                  <th className="text-center">Marque</th>
                  <th className="text-center">Image</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td className="text-center">{startIndex + index + 1}</td>
                      <td class="marque">{item.marque}</td>
                      <td>
                        <img
                          style={{ height: "200px" }}
                          className="img-fluid"
                          src={`http://localhost:3000/file/UploadVehicule/${item.file}`}
                          alt={item.marque}
                        />
                      </td>
                      
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={(e) => updateState(item?._id)}
                        >
                          Modifier
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row justify-content-center pagination-container">
          <div className="col-md-8">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={handleClickPrev}>
                    Prev
                  </button>
                </li>
                {totalPages > 0 &&
                  Array.from(Array(totalPages).keys()).map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" onClick={handleClickNext}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListeFalse;
