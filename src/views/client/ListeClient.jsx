
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import UserService from "../../Service/UserService"
import "./stylead.css"


const ListeCl = () => {

  const [user, setUser] = useState()
 
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 6;


  const getAll = () => {
    UserService.getAll().then((res) => {
      console.log(res)
      setUser(res.data.data)

    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getAll()
  }, [])


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
        UserService.Deleteone(id).then((res) => {
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
  const filteredData = user?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return String(el.email)
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

      <div style={{ width: '90%', margin: 'auto', marginTop: '45px' }} className="card-c"><br></br><br></br>

        <div className="title-admin" >
          <h2 className="text-center"><u>Liste des Clients</u></h2><br></br>
        </div>
        <div className="card-block table-border-style">
    <h4 ><i>La liste les Clients de notre site AlloLocation Car:</i></h4>

     <form className="search" role="form">
  <input type="text" name="seach" placeholder="Rechercher par Email" onChange={inputHandler} />
     </form><br></br>
        <div className="card-body1">
          <table className="table1 table-hover1 table-striped1 table-bordered bg-light1" >
            <thead className="thead-light1">
              <tr >
              <th style={{ width: '10%', borderLeft: '3px solid pink' }} className="text-center">Identifiant</th>
                <th style={{ width: '10%', borderLeft: '3px solid pink' }} className="text-center">Photo</th>
                <th style={{ width: '10%', borderLeft: '3px solid pink' }} className="text-center" >Username</th>
                <th style={{ width: '10%', borderLeft: '3px solid pink' }} className="text-center">Email</th>
                <th style={{ width: '10%', borderLeft: '3px solid pink' }} className="text-center">Téléphone</th>
                <th style={{ width: '10%', borderLeft: '3px solid pink' }} className="text-center">Adresse</th>
                <th style={{ width: '10%', borderLeft: '3px solid pink', borderRight: '3px solid pink' }} className="text-center">Action</th>
              </tr>

            </thead>

            <tbody>


            {currentPageData?.map((item, index) => {
                  return (
                    <tr className="text-center" key={item._id}>
                      <td className="text-center">{startIndex + index + 1}</td>

                
                                     <img className="img-circle" style={{width:'20%',height:'100% !important' }} 
                                         
                                            src={"http://localhost:3000/file/uploadUser/" +item.file}
                                        />

                    <td style={{ verticalAlign: "middle" }}><strong>{item.username}</strong></td>
                    <td style={{ verticalAlign: "middle" }}><strong>{item.email}</strong></td>
                    <td style={{ verticalAlign: "middle" }} className="text-center" ><strong>{item.telephone}</strong></td>
                    <td style={{ verticalAlign: "middle" }} ><strong>{item.ville}</strong></td>




                    {/* <td style={{verticalAlign: "middle"}}><strong>{item.reservationId?._id }
                              
                            </strong></td> */}
                    <td style={{ verticalAlign: "middle" }}>

                      <button onClick={(e) => Deleteone(item._id)}  className="btn btn-danger1 btn-rounded1 btn-sm1">
                        <span className="fa fa-times" />
                      </button>
                    </td>

                  </tr>

                )
              })}


            </tbody>

          </table>
        </div>
      </div></div>

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
    
  )
}
export default ListeCl