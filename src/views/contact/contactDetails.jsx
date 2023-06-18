import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import vehiculeService from "../../Service/vehiculeService";
import contactService from "../../Service/contactService";

const ContactDetails = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [Image, setImage] = useState({});

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
          const reply = {
            to: data?.email,
            subject: data?.subject,
            content: data?.description,
          };
          contactService
            .sendEmail(reply)
            .then((res) => {
              console.log(res);

              navigate("/contactList");
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else navigate("/contactList");
  };

  useEffect(() => {
    contactService.getMessageById(id).then((res) => {
      setData(res.data.data);
    });
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
              Details message
            </u>
          </h4>
        </div>
        <div className="card-block">
          <form className="form-cat" onSubmit={(e) => onSubmitHandler(e)}>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>email</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="email"
                  required
                  className="form-control form-control-capitalize"
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>name</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="text"
                  required
                  className="form-control form-control-capitalize"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>phone</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="number"
                  className="form-control form-control-uppercase"
                  name="phone"
                  required
                  value={data.phone}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            {/* <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Type </b>
              </label>
              <div className="col-sm-5">
                <select
                  disabled={type == "update" ? false : true}
                  type="text"
                  className="form-control form-control-lowercase"
                  name="type"
                  required
                  onChange={onChangeHandler}
                >
                  <option
                    key={0}
                    selected={data.type == "information"}
                    value={"information"}
                  >
                    information
                  </option>
                </select>
              </div>
            </div> */}
            <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>object</b>
              </label>
              <div className="col-sm-5">
                <input
                  disabled={type == "update" ? false : true}
                  type="text"
                  className="form-control form-control-bold"
                  name="subject"
                  required
                  value={data.subject}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            { type == "update" ? (
              <>
              <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Reponse</b>
              </label>
              <div className="col-sm-5">
                <textarea
                  type="text"
                  required={type == "update" ? true : false}
                  className="form-control form-control-left"
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
              </>
            ):( <>
              <div className="form-group row">
              <label
                style={{ textAlign: "right", color: "#2da1d7" }}
                className="col-sm-2 col-form-label"
              >
                <b>Message</b>
              </label>
              <div className="col-sm-5">
                <textarea
                  type="text"
                  disabled={type == "update" ? false : true}

                  required={type == "update" ? true : false}
                  className="form-control form-control-left"
                  name="message"
                  value={data.message}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
              </>)}
            

            <button
              type="submit"
              style={{ marginLeft: "60% " }}
              class="btn waves-effect waves-light btn-grd-info "
            >
              {type == "update" ? "Répondre" : "Retour"}
            </button>
          </form>
        </div>
      </div>
      {/* Input Alignment card end */}
    </div>
  );
};
export default ContactDetails;
