import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import vehiculeService from "../../Service/vehiculeService";
import "./style1.css";
const ListeVeh = () => {
  const [vehicule, setVehicule] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const getAll = () => {
    vehiculeService
      .getAll()
      .then((res) => {
        console.log(res);
        setVehicule(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAll();
  }, []);

  const deleteVeh = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        vehiculeService.deleteVeh(id).then((res) => {
          getAll();
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

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
      {/* Contextual classes table starts */}

      <div
        style={{ width: "90%", margin: "auto", marginTop: "45px" }}
        className=" card-n"
      >
        <br></br>
        <div className="card-header-v ">
          <h1 className="text-center1 ">
            <i>Liste de véhicules</i>
          </h1>
        </div>
        <br></br>
        <div className="card-block table-border-style ">
          <h5 className="lignev">
            {" "}
            <i>
              La liste des véhicules disponibles dans notre site AlloLocation
              Car :
            </i>
          </h5>
          <br></br>

          <form className="seach" role="form">
            <input
              type="text"
              name="seach"
              placeholder="search..."
              onChange={inputHandler}
            />
          </form>
          <br></br>

          <div className="table-responsive-v">
            <table className="table-v table-striped-v table-bordered-v table-fixed-v">
              <thead>
                <tr class="table-danger-v">
                  <th style={{ width: "1% " }} className="text-center1">
                    identifiant
                  </th>
                  <th style={{ width: "10%" }} className="text-center1">
                    image
                  </th>
                  <th style={{ width: "10%" }} className="text-center1">
                    marque
                  </th>

                  <th style={{ width: "10%" }} className="text-center1">
                    kilometrage
                  </th>
                  <th style={{ width: "10%" }} className="text-center1">
                    {" "}
                    type de carburant
                  </th>

                  <th style={{ width: "10%" }} className="text-center1">
                    Portes
                  </th>
                  <th style={{ width: "10%" }} className="text-center1">
                    Boite Vitesse
                  </th>
                  <th style={{ width: "10%" }} className="text-center1">
                    climatiseur
                  </th>
                  <th style={{ width: "10%" }} className="text-center1">
                    prix
                  </th>

                  <th style={{ width: "10%" }} className="text-center1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td className="text-center">{startIndex + index + 1}</td>
                      <td>
                        <strong>
                          <img
                            style={{ width: "100%" }}
                            src={
                              "http://localhost:3000/file/UploadVehicule/" +
                              item.file
                            }
                          />
                        </strong>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <strong>{item.marque}</strong>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <strong>{item.kilometrage}</strong>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <strong>{item.typeCarburant}</strong>
                      </td>

                      <td style={{ whiteSpace: "pre-wrap" }}>
                        <strong>{item.ports}</strong>
                      </td>
                      <td style={{ whiteSpace: "pre-wrap" }}>
                        <strong>{item.boiteVit}</strong>
                      </td>
                      <td style={{ whiteSpace: "pre-wrap" }}>
                        <strong>{(item.clima) ? "Oui" : "Non"}</strong>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <strong>{item.prix}</strong>
                      </td>

                      {/* <td style={{verticalAlign: "middle"}}><strong>{item.reservationId?._id }
                              
                            </strong></td> */}
                      <td>
                        <Link to={`/DetailVehicule/${item._id}`}>
                          <button className="btn btn-default-v btn-rounded-v btn-sm-v">
                            <span className="fa fa-info"></span>
                          </button>
                        </Link>
                        <Link to={`/Updatevehicule/${item._id}/update`}>
                          {" "}
                          <button className="btn btn-default-v btn-rounded-v btn-sm-v">
                            <span className="fa fa-pencil" />
                          </button>
                        </Link>
                        <button
                          onClick={(e) => deleteVeh(item._id)}
                          className="btn btn-danger-v btn-rounded-v btn-sm-v"
                        >
                          <span className="fa fa-times" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <br></br>
          <div className="row justify-content-center pagination-container-1">
            <div className="col-md-8">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 0 ? "disabled" : ""
                    }`}
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
      {/* Contextual classes table ends */}
    </div>
  );
};
export default ListeVeh;
