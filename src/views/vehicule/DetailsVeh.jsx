import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vehiculeService from "../../Service/vehiculeService";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import contactService from '../../Service/contactService';

const DetailVeh=()=>{

    const { id } = useParams(); 

    const [vehicule, setVehicule] = useState();
    const [data, setData] = useState({});
    const [Image, setImage] = useState({});
    const [feedBack, setFeedBack] = useState([]);
    const navigate = useNavigate();

    const getReclamation = (id) => {
        contactService
          .getFeedBackByCar(id)
          .then((res) => {
            setFeedBack(res.data.data);
          })
          .catch((err) => {
            Swal.fire("un erreur est servenue", "", "info");
          });
      };
      const onChangeHandlerImage = (e) => {
        e.preventDefault();
        setImage(e.target.files);
      };
    
      useEffect(() => {
        vehiculeService.getVehicule(id).then((res) => {
          setData(res.data.data);
        });
        getReclamation(id);
      }, []);
      const deleteFeedBack = (itemId) => {
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

   

      



    return(

        <div>
        {/* Input Alignment card start */}
        <div
          style={{ width: "90%", margin: "auto", marginTop: "45px", backgroundcolor:"#477db41a" }}
          className="card"
        >
          <div className="card-header5">
            <br></br>
            <h4 className="titre details ">
              <u>
              Les détails du véhicule
              </u>
            </h4>
          </div>
          <div className="card-block5">
          <form className="form-cat5">
          <div className="form-group row1 d-flex justify-content-center text-center">
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Modele</b>
    </label>
    <input
      disabled
      type="text"
      className="form-control form-control mx-auto"
      style={{ width: "80%" ,color:"black"}}
      name="modele"
      required
      value={data.modele}
    />
  </div>
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Marque</b>
    </label>
    <input
      disabled
      type="text"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="marque"
      required
      value={data.marque}
    />
  </div>
</div>

<div className="form-group row1 d-flex justify-content-center text-center">
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Numéro de matricule</b>
    </label>
    <input
      disabled
      type="text"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="numMatr"
      required
      value={data.numMatr}
    />
  </div>
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>kilométrage</b>
    </label>
    <input
      disabled
      type="text"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="kilometrage"
      required
      value={data.kilometrage}
    />
  </div>
</div>
<div className="form-group row1 d-flex justify-content-center text-center">
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Type de carburant</b>
    </label>
    <select
      disabled
      type="text"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="typeCarburant"
      required
    >
      <option
        key={0}
        selected={data.typeCarburant === "Essence"}
        value={"Essence"}
      >
        Essence
      </option>
      <option
        key={1}
        selected={data.typeCarburant === "Gazoil"}
        value={"Gazoil"}
      >
        Gazoil
      </option>
    </select>
  </div>
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Description</b>
    </label>
    <textarea
      disabled
      type="text"
      required
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="description"
      value={data.description}
    />
  </div>
</div>
<div className="form-group row1 d-flex justify-content-center text-center">
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Ports</b>
    </label>
    <input
      disabled
      type="number"
      required
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="ports"
      value={data.ports}
    />
  </div>
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Boite Vitesse</b>
    </label>
    <select
      disabled
      type="text"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="boiteVit"
      required
    >
      <option
        key={0}
        selected={data?.boiteVit === "Automatique"}
        value={"Automatique"}
      >
        Automatique
      </option>
      <option
        key={1}
        selected={data?.boiteVit === "Manuel"}
        value={"Manuel"}
      >
        Manuel
      </option>
    </select>
  </div>
</div>
<div className="form-group row1 d-flex justify-content-center text-center">
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Climatiseur</b>
    </label>
    <select
      disabled
      type="text"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="clima"
      required
    >
      <option
        selected={data?.clima === "Sans climatiseur"}
        key={0}
        value={false}
      >
        Sans climatiseur
      </option>
      <option
        key={1}
        selected={data?.clima === "Avec climatiseur"}
        value={true}
      >
        Avec climatiseur
      </option>
    </select>
  </div>
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>gps</b>
    </label>
    <select
      disabled
      className="form-control form-control- mx-auto"
      style={{ width: "80%" }}
      name="gps"
      required
    >
      <option key={0} selected={data.gps} value={true}>
        Oui
      </option>
      <option key={1} selected={!data.gps} value={false}>
        Non
      </option>
    </select>
  </div>
</div>
<div className="form-group row1 d-flex justify-content-center text-center">
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Prix</b>
    </label>
    <input
      required
      disabled
      type="number"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="prix"
      value={data.prix}
    />
  </div>
  <div className="col-sm-6">
    <label className="col-form-label" >
      <b>Agence</b>
    </label>
    <input
      required
      disabled
      type="string"
      className="form-control form-control mx-auto"
      style={{ width: "80%" }}
      name="agenceId"
      value={data?.agenceId?.name}
    />
  </div>
</div>
  
              <div className="form-group5 row">
                <label
                  style={{ textAlign: "center", color: "#2da1d7" }}
                  className="col-sm-2 col-form-label"
                >
                  <b> </b>
                </label>
                <div className="col-sm-5">
                  <img
                    style={{ maxWidth: "-webkit-fill-available" ,height:"50%"}}
                    src={"http://localhost:3000/file/UploadVehicule/" + data.file}
                  />
                </div>
               
              </div>
             <br></br><br></br>
             
            </form>
            <div
              className="table-responsive-8"
              style={{ margin: "auto", textAlign: "center",marginTop:"-17%" }}
            >
              <table
                className="table-8 table-bordered-8 table-hover-8"
                style={{ width: "95%", margin: "15 px" }}
              >
                <thead>
                  <tr className="table-5">
                    <th style={{ width: "1%" }} className="text-center-a">
                      nom
                    </th>
                    <th style={{ width: "10%" }} className="text-center-a">
                      feedback
                    </th>
                    <th style={{ width: "1%" }} className="text-center-a">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feedBack?.map((item, index) => {
                    return (
                      <tr className="text-center-a" id="trow_2" key={item._id}>
                        <td style={{ verticalAlign: "middle" }}>
                          <strong>{item.reservationId?.userId?.username}</strong>
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            whiteSpace: "pre-line",
                          }}
                        >
                          <strong>{item.message}</strong>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                            <button
                              onClick={() => deleteFeedBack(item._id)}
                              className="btn8 btn-default-8 btn-rounded-8 btn-sm-8"
                            >
                              <i className="fa fa-times"></i>
                             
                            </button>
                          </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> <br></br>
              <Link to="/listevehicule"><button  style={{marginLeft:"80%"}}
                type="submit"
                
                class="btn5 waves-effect5 waves-light5 btn-grd-info5 "
              >Retour
            </button></Link>
            </div>
          </div>
        </div>
  
        {/* Input Alignment card end */}
      </div>
    )
}
export default DetailVeh