import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import vehiculeService from "../../Service/vehiculeService";

const AddVeh = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [Image, setImage] = useState({});
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };
  const formData = new FormData();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    formData.append("modele", data.modele);
    formData.append("marque", data.marque);
    formData.append("numMatr", data.numMatr);
    formData.append("gps", (data.gps) ? data.gps : true);
    formData.append("clima", (data.clima) ? data.clima : true); 
    formData.append("boiteVit", (data.boiteVit) ? data.boiteVit : "Manuel"); 
    formData.append("ports", data.ports);
    formData.append("kilometrage", data.kilometrage);
    formData.append("typeCarburant", (data.typeCarburant) ? data.typeCarburant : "Essence" );
    formData.append("prix", data.prix);
    formData.append("description", data.description);
    formData.append("agenceId", data.agenceId);


    for (let i = 0; i < Image.length; i++) {
      formData.append("file", Image[i]);
    }
    Swal.fire({
      title: "Do you want to save a new véhicule!",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        vehiculeService
          .createVehicule(formData)
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
  };
  const onChangeHandlerImage = (e) => {
    e.preventDefault();
    setImage(e.target.files);
  };

  return (
    <div>
      {/* Input Alignment card stat */}
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
          </h4>r
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
                  type="text"
                  className="form-control form-control-variant"
                  name="agenceId"
                  value={data.agenceId}
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
               
                  <input
                    className="input-cat"
                    type="file"
                    name="files"
                    style={{ paddingLeft: "1rem" }}
                    multiple
                    onChange={onChangeHandlerImage}
                  />
                </div>

            <button
              type="submit"
              style={{ marginLeft: "60% " }}
              class="btn waves-effect waves-light btn-grd-info "
            >
               Ajouter un vehicule{" "}
            </button>
          </form>
        </div>
      </div>
      {/* Input Alignment card end */}
    </div>
  );
};
export default AddVeh;
