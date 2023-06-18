import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import reservationService from "../../Service/reservationService";
import "./styleRes.css";

const Listereserv = () => {
  const [reservation, setReservation] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 6;

  const getAll = () => {
    reservationService
      .getAll()
      .then((res) => {
        console.log(res);
        setReservation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAll();
  }, []);
  const deleteReserv = (id) => {
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
        reservationService.deleteReserv(id).then((res) => {
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
  const filteredData = reservation?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return String(el.numPermis)
        .toLowerCase()
        .includes(inputText.toLowerCase());
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

      <div style={{ margin: "auto", marginTop: "45px" }} className="card-new">
        <div className="card-header-new">
          <h2 className="text-center">
            <i>
              <u>Liste des réservations</u>
            </i>
          </h2>
        </div>
        <br></br>
        <div className="card-block-new table-border-style-new">
          <h5>
            {" "}
            <i className="ligne">Toutes les réservations de véhicules :</i>
          </h5>
          <br></br>
          <form className="form-new " role="form">
            <input
              type="text"
              name="seach"
              placeholder="Rechercher par numéro de permis"
              onChange={inputHandler}
            />{" "}
          </form>
          <br></br>
          <div className="table-responsive-new" style={{ overflowY: "scroll" }}>
            <table className="table-new table-striped-new table-bordered-new table-fixed-new ">
              <thead>
                <tr>
                  <th style={{ width: "1%" }} className="text-center">
                    identifiant
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    Date de réservation
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    Heure de réservation
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    Date de fin de location
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    Heure de retour
                  </th>
                  <th style={{ width: "10%" }} className="text-center">
                    Numéro de permis
                  </th>
                  <th style={{ width: "5%" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td className="text-center">{startIndex + index + 1}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        {new Date(item.dateReserv).toLocaleDateString()}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {item.heureResrv}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {new Date(item.dateFinloc).toLocaleDateString()}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {item.heureRet}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {item.numPermis}
                      </td>
                      <td>
                        
                        <Link to={`/Detailsreservation/${item._id}`}>
                          <button className="btn btn-default-new btn-rounded-new btn-sm-new">
                            <i className="fa fa-info"></i>
                          </button>
                        </Link>
                        <button
                          onClick={(e) => deleteReserv(item._id)}
                          className="btn btn-danger-new btn-rounded-new btn-sm-new"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br></br>
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

      {/* Contextual classes table ends */}
    </div>
  );
};
export default Listereserv;
