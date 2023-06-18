import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import reservationService from "../../Service/reservationService";
import { useParams } from "react-router-dom";
import "./styleRes.css";
import contactService from "../../Service/contactService";

const DetailsReserv = () => {
  const { id } = useParams(); // get the reservation ID from the URL
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const [reclamation, setReclamation] = useState([]);

  const [reservation, setReservation] = useState();

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = reclamation?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.marque.toLowerCase().includes(inputText);
    }
  });
  const getReclamation = (id) => {
    reservationService
      .getReclamation(id)
      .then((res) => {
        setReclamation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const getReservation = (id) => {
    reservationService
      .getReservation(id)
      .then((res) => {
        setReservation(res.data.data);
     
        console.log("reservation",res.data.data)
        getReclamation(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReservation(id); // call getReservation with the reservation ID
  }, [id]);

  if (!reservation) {
    return <div>Chargement...</div>;
  }
  const deleteReclamation = (itemId) => {
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
        contactService.DeleteMessageById(itemId).then((res) => {
          getReclamation(id);
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <div
        className="card"
        style={{ width: "90%", margin: "45px", marginTop: "45px" }}
      >
        <div
          style={{
            justifyContent: "space-evenly",
            width: "100%",
            padding: "5rem",
          }}
        >
          <form>
          <div class="form-group col-md-4">
                <br />
                <img style={{borderRadius:"35%" ,width: "15%",marginTop:"-15%",height:"-10% !important"}}
                
                  src={
                    "http://localhost:3000/file/uploadUser/" +
                    reservation?.userId?.file
                  }
                />
              </div>


              <div class="form-row">
            
            <div class="form-group col-md-6">
              <label for="date-reserv"> Nom du Client : :</label>
              <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.userId?.nom}
                 
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4"> Prenom du Client : :</label>
              <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.userId?.prenom}
                  id="inputZip"
              />
            </div>
          </div>

          <div class="form-row">
            
            <div class="form-group col-md-6">
              <label for="date-reserv">  Numéro de téléphone:</label>
              <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.userId?.telephone}
                  id="inputZip"
                 
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4"> Adresse du Client :</label>
              <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.userId?.ville}
                  id="inputZip"
              />
            </div>
          </div>
          <div class="form-group">
              <label for="inputCity">Email :</label>
              <input
                type="text"
                class="form-control"
                placeholder={reservation?.userId?.email}
                id="inputCity"
              />
            </div>
            <div class="form-row">
            
              <div class="form-group col-md-6">
                <label for="date-reserv"> Date de création de la réservation :</label>
                <input
                  type="text"
                  class="form-control"
                  id="date-reserv"
                  placeholder={new Date(
                    reservation?.createdAt
                  ).toLocaleDateString()}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4"> Numéro de permis :</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPassword4"
                  placeholder={reservation?.numPermis}
                />
              </div>
            </div>
            <div class="form-row">
            
              <div class="form-group col-md-6">
                <label for="date-reserv"> Date de la réservation :</label>
                <input
              disabled
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder={new Date(
                  reservation?.dateReserv
                ).toLocaleDateString()}
              />
              </div>
              <div class="form-group col-md-6">

<label for="inputAddress"> Heure reservation :</label>
<input
  type="text"
  class="form-control"
  id="inputAddress"
  placeholder={reservation?.heureResrv}
/>
</div>
            </div>
            
            <div class="form-row">
            
            <div class="form-group col-md-6">
              <label for="inputAddress2"> date fin Location :</label>
              <input
              disabled
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder={new Date(
                  reservation?.dateFinloc
                ).toLocaleDateString()}
              />
              </div>
              <div class="form-group col-md-6">
                <label for="inputCity"> heure retour :</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.heureRet}
                  id="inputCity"
                />
            
            </div></div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputCity"> nom assurance :</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.assuranceId?.name}
                  id="inputCity"
                />
              </div>

              <div class="form-group col-md-4">
                <label for="modele">
                  {" "}
                  Modele de vehicule :
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.vehiculeId?.modele}
                  id="modele"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputZip"> Marque de vehicule :</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.vehiculeId?.marque}
                  id="inputZip"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputCity"> Numéro de matricule :</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.vehiculeId?.numMatr}
                  id="inputCity"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputZip"> Numéro de téléphone :</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.userId?.telephone}
                  id="inputZip"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputZip"> Adresse du Client :</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={reservation?.userId?.ville}
                  id="inputZip"
                />
              </div>
            </div>
          
            <div class="form-group">
              <label for="inputCity">prix Total :</label>
              <input
                type="text"
                class="form-control"
                placeholder={reservation?.prixTotal + reservation?.assuranceId?.prix}
                id="inputCity"
              />
            </div>
          </form>


<div className="reclamation">Reclamation</div>
          <div className="table-responsive-r">
            {reclamation?.length > 0 && (
              <table
                className="table-r table-bordered-r table-hover-r"
                style={{ width: "95%", margin: "15 px" }}
              >
                <thead>
                  <tr class="table-r">
                    <th style={{ width: "10%" }} className="text-center2">
                      Nom
                    </th>
                    <th style={{ width: "10%" }} className="text-center2">
                      Message
                    </th>
                    <th style={{ width: "10%" }} className="text-center2">
                      email
                    </th>
                    <th style={{ width: "5%" }} className="text-center2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {currentPageData?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td style={{ verticalAlign: "middle" }}>
                          <strong>{item?.name}</strong>
                        </td>
                        <td style={{ verticalAlign: "middle" ,width:"60%"}}>
                          <strong>{item?.message}</strong>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <strong>{item?.email}</strong>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <button
                            onClick={() => deleteReclamation(item._id)}
                            className="btn btn-default-r btn-rounded-r btn-sm-r"
                          >
                            <i className="fa fa-times"></i>
                           
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}<br></br>
            <button
              type="submit"
              onClick={() => navigate("/Listereservation")}
              class="btn btn-primary"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsReserv;

// {
//   "_id": "645ebfdbc61fbe45b020c528",
//   "modele": "erg",
//   "marque": "erfzefz",
//   "numMatr": "ezf",
//   "kilometrage": "681",
//   "typeCarburant": "Gazoil",
//   "prix": 52,
//   "description": "ezf",
//   "disponible": false,
//   "file": "1683931099759-tÃ©lÃ©chargement.png",
//   "reservationId": [
//     "645ec62bc61fbe45b020c5d8",
//     "645ec62bc61fbe45b020c5d8"
//   ],
//   "createdAt": "2023-05-12T22:38:19.774Z",
//   "updatedAt": "2023-05-14T22:18:35.220Z",
//   "__v": 0,
//   "boiteVit": "Manuel",
//   "gps": false,
//   "ports": 4
// }
