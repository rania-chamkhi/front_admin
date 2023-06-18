import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import vehiculeService from "../../Service/vehiculeService";
import reservationService from "../../Service/reservationService";
import contactService from "../../Service/contactService";

const UpdateVeh = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [Image, setImage] = useState({});
  const [feedBack, setFeedBack] = useState([]);

  const [data, setData] = useState({});
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const onSubmitHandler = (e) => {
    if (type == "update") {
      e.preventDefault();
      Swal.fire({
        title: "Do you want to save updated data!",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          vehiculeService
            .updatevehicule(id, data)
            .then((res) => {
              console.log(res);
              navigate("/Listevehicule");
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else navigate("/Listevehicule");
  };
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
      console.log(res.data.data)
      setData(res.data.data);
    });
    getReclamation(id);
  }, []);

  return (
    <div>
      {/* Input Alignment card start */}
      <div
        style={{ width: "90%", margin: "auto", marginTop: "45px" }}
        className="card"
      >
        <div className="card-header">
          <br></br>
          <h4 className=" ">
            <u style={{ color: "#3593a4", marginLeft: "17% " }}>
              Mise à jour d'un vehicule
            </u>
          </h4>
        </div>
        <div className="card-block">
          <form className="form-cat" onSubmit={onSubmitHandler}>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#008697" }}
                className="col-sm-2 col-form-label"
              >
                <b>Modele</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="text"
                  className="form-control form-control-normal"
                  name="modele"
                  required
                  value={data.modele}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Marque</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="text"
                  className="form-control form-control-bold"
                  name="marque"
                  required
                  value={data.marque}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Numéro de matricule</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="text"
                  required
                  className="form-control form-control-capitalize"
                  name="numMatr"
                  value={data.numMatr}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>kilométrage</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="string"
                  className="form-control form-control-uppercase"
                  name="kilometrage"
                  required
                  value={data.kilometrage}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Type de carburant</b>
              </label>
              <div className="col-sm-5">
                <select
                  disabled={type == "update" ? false : true}
                  type="text"
                  className="form-control form-control-lowercase"
                  name="typeCarburant"
                  required
                  onChange={onChangeHandler}
                >
                  <option
                    key={0}
                    selected={data.typeCarburant == "Essence"}
                    value={"Essence"}
                  >
                    Essence
                  </option>
                  <option
                    key={1}
                    selected={data.typeCarburant == "Gazoil"}
                    value={"Gazoil"}
                  >
                    Gazoil
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Description</b>
              </label>
              <div className="col-sm-5">
                <textarea
                disabled={type == "update" ? false : true}
                  type="text"
                  required
                  className="form-control form-control-left"
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Ports</b>
              </label>
              <div className="col-sm-5">
                <input
                disabled={type == "update" ? false : true}
                  type="number"
                  required
                  className="form-control form-control-left"
                  name="ports"
                  value={data.ports}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Boite Vitesse</b>
              </label>
              <div className="col-sm-5">
                <select
                  disabled={type == "update" ? false : true}
                  type="text"
                  className="form-control form-control-lowercase"
                  name="boiteVit"
                  required
                  onChange={onChangeHandler}
                >
                  <option
                    key={0}
                    selected={data?.boiteVit == "Automatique"}
                    value={"Automatique"}
                  >
                    Automatique
                  </option>
                  <option
                    key={1}
                    selected={data?.boiteVit == "Manuel"}
                    value={"Manuel"}
                  >
                    Manuel
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Climatiseur</b>
              </label>
              <div className="col-sm-5">
                <select
                  disabled={type == "update" ? false : true}
                  type="text"
                  className="form-control form-control-lowercase"
                  name="clima"
                  required
                  onChange={onChangeHandler}
                >
                  <option
                    selected={data?.clima == "Sans climatiseur"}
                    key={0}
                    value={false}
                  >
                    Sans climatiseur
                  </option>
                  <option
                    key={1}
                    selected={data?.clima == "Avec climatiseur"}
                    value={true}
                  >
                    Avec climatiseur
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>gps</b>
              </label>
              <div className="col-sm-5">
                <select
                  disabled={type == "update" ? false : true}
                  className="form-control form-control-lowercase"
                  name="gps"
                  required
                  onChange={onChangeHandler}
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

            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Prix</b>
              </label>
              <div className="col-sm-5">
                <input
                  required
                  disabled={type == "update" ? false : true}
                  type="number"
                  className="form-control form-control-variant"
                  name="prix"
                  value={data.prix}
                  onChange={onChangeHandler}
                />
              </div>
            </div>


            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Agence</b>
              </label>
              <div className="col-sm-5">
                <input
                  required
                  disabled={type == "update" ? false : true}
                  type="string"
                  className="form-control form-control-variant"
                  name="agenceId"
                  value={data?.agenceId?.name}
                  onChange={onChangeHandler}
                />
              </div>
            </div>



            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b> image</b>
              </label>
              <div className="col-sm-5">
                <img
                  style={{ maxWidth: "-webkit-fill-available" }}
                  src={"http://localhost:3000/file/UploadVehicule/" + data.file}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{ marginLeft: "60% " }}
              class="btn waves-effect waves-light btn-grd-info "
            >
              {type == "update" ? "Mise à jour" : "Retour"}
            </button>
          </form>
        
        </div>
      </div>

      {/* Input Alignment card end */}
    </div>
  );
};
export default UpdateVeh;
