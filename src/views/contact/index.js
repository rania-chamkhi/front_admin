import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import vehiculeService from "../../Service/vehiculeService";
import "./styleContact.css";
import contactService from "../../Service/contactService";
const ContactList = () => {
  const [ContactList, setContactList] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 7;

  const getAll = () => {
    contactService.getMessages()
      .then((res) => {
        console.log(res);
        setContactList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAll();
  }, []);

  const Deleteone = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        contactService.DeleteMessageById(id).then((res) => {
          getAll();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = ContactList?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.email.toLowerCase().includes(inputText);
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
        <div className="card-header-c ">
          <h1 className="text-center-c ">
            <i>Liste des messages</i>
          </h1>
        </div>
        <br></br>
        <div className="card-block table-border-style ">
          <h5 className="lignev">
            {" "}
            <i>La liste des messages recus par les clients :</i>
          </h5>
          <br></br>

          <form className="seach12" role="form">
            <input
              type="text"
              name="seach"
              placeholder="Rechercher par nom"
              onChange={inputHandler}
            />
          </form>
          <br></br>

          <div className="table-responsive-c">
            <table className="table-c table-striped-c table-bordered-c table-fixed-c">
              <thead>
                <tr className="table-danger-c">
                <th style={{ width: "10%" }} className="text-center-c">
                  identifiant
                  </th>
                <th style={{ width: "10%" }} className="text-center-c">
                  objet
                  </th>
                  <th style={{ width: "10%" }} className="text-center-c">
                  email
                  </th>

                  <th style={{ width: "10%" }} className="text-center-c">
                  nom et prenom
                  </th>
                  <th style={{ width: "10%" }} className="text-center-c">
                  telephone
                  </th>

                  <th style={{ width: "10%" }} className="text-center-c">
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
                        <strong>{item.subject}</strong>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <strong>{item.email}</strong>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <strong>{item.name}</strong>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <strong>{item.phone}</strong>
                      </td>
                      <td>
                        <Link to={`/update-contact/${item._id}/info`}>
                          <button className="btn btn-default-c btn-rounded-c btn-sm-c">
                            <span className="fa fa-info"></span>
                          </button>
                        </Link>
                        <Link to={`/update-contact/${item._id}/update`}>
                          {" "}
                          <button className="btn btn-default-c btn-rounded-c btn-sm-c">
                            <span className="fa fa-reply" />
                          </button>
                        </Link>
                        <button
                          onClick={(e) => Deleteone(item._id)}
                          className="btn btn-danger-c btn-rounded-c btn-sm-c"
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
export default ContactList;
