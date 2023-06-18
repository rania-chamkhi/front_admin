import { Link, Navigate,useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Swal from "sweetalert2";
import loginService from "../Service/loginService";

const Siedbar = () => {
  const navigate =useNavigate();


  const logout = () => {

    Swal.fire({
      title: 'Are you sure to Logout?',
  
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        loginService.LogoutAdmin()
        localStorage.clear()
        navigate("/login")
          
        Swal.fire(
          '',
          '',
          'success'
        )
      }
    })
  }
 

  return (
    <div>
      <nav className="pcoded-navbar">
        <div className="sidebar_toggle">
          <a href="#">
            <i className="icon-close icons" />
          </a>
        </div>
        <div className="pcoded-inner-navbar main-menu">
          <div className>
            <div className="main-menu-header">
              <img
                className="img-80 img-radius"
                src="assets/images/admin.png"
                alt="User-Profile-Image"
              />
              <div className="user-details">
                <span id="more-details">
                  AlloLocation Car
                  <i className="" />
                </span>
              </div>
            </div>
          </div>
          <div className="p-15 p-b-0">
            <form className="form-material">
             
            </form>
          </div>
          <div
            className="pcoded-navigation-label"
            data-i18n="nav.category.navigation"
          >
            Layout
          </div>
          <hr />
          <ul className="pcoded-item pcoded-left-item">
            <li className="active">
              <a href="/" className="waves-effect waves-dark">
                <span className="pcoded-micon">
                  <i className="ti-home" />
                  <b></b>
                </span>
                <span className="pcoded-mtext" data-i18n="nav.dash.main">
                  Dashboard
                </span>
                <span className="pcoded-mcaret" />
              </a>
            </li>
            <hr />

            <li className="pcoded-hasmenu">
              <a
                href="javascript:void(0)"
                className="waves-effect waves-dark admin-link"
                style={{}}
              >
                <span style={{ fontSize: "16px" }} className="pcoded-micon">
                  <i
                    style={{ fontSize: "18px" }}
                    className="fa fa-user-circle-o"
                  />
                </span>
                <span
                  style={{ fontSize: "16px" }}
                  className="pcoded-mtext"
                  data-i18n="nav.basic-components.main"
                >
                  <b>Clients</b>
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <a
                    href="notification.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li>
                      <Link to="ListeClient">Liste Client</Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>
                <li className=" ">
                  <a
                    href="icon-themify.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                   
                  </a>
                </li>
              </ul>
            </li>

            

            <hr />
            <li className="pcoded-hasmenu">
              <a href="javascript:void(0)" className="waves-effect waves-dark">
                <span style={{ fontSize: "17px" }} className="pcoded-micon">
                  <i className="fa fa-car" aria-hidden="true" />
                </span>
                <span
                  style={{ fontSize: "16px" }}
                  className="pcoded-mtext"
                  data-i18n="nav.basic-components.main"
                >
                  <b>Véhicules</b>
                </span>
                <span className="pcoded-mcaret" />
              </a>

              <ul className="pcoded-submenu">
                <li className=" ">
                  <a
                    href="icon-themify.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li>
                      <Link to="AddVehicule">Ajouter des véhicules </Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>

                <li className=" ">
                  <a
                    href="notification.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li style={{ fontSize: "16px" }}>
                      <Link to="Listevehicule">Liste de Véhicules</Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>
              </ul>
            </li>

            <li className="pcoded-hasmenu">
              <a href="javascript:void(0)" className="waves-effect waves-dark">
                <span style={{ fontSize: "17px" }} className="pcoded-micon">
                  <i className="fa fa-list	" aria-hidden="true" />
                </span>
                <span
                  style={{ fontSize: "16px" }}
                  className="pcoded-mtext"
                  data-i18n="nav.basic-components.main"
                >
                  <b>
                    <li>
                      <Link to="ListevehiculeR">
                        Liste de Véhicules Réserver
                      </Link>
                    </li>
                  </b>
                </span>
                <span className="pcoded-mcaret" />
              </a>
            </li>

            

            <hr />

            <li className="pcoded-hasmenu">
              <a href="javascript:void(0)" className="waves-effect waves-dark">
                <span style={{ fontSize: "17px" }} className="pcoded-micon">
                  <i className="nav-icon fa fa-database " />
                </span>
                <span
                  style={{ fontSize: "16px" }}
                  className="pcoded-mtext"
                  data-i18n="nav.basic-components.main"
                >
                  <b>Réservation</b>
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <a
                    href="notification.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li>
                      <Link to="Listereservation">Liste des reservations</Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>
              </ul>
            </li>

            <hr />

            <li className="pcoded-hasmenu">
              <a href="javascript:void(0)" className="waves-effect waves-dark">
                <span style={{ fontSize: "17px" }} className="pcoded-micon">
                  <i className="fa fa-cogs" aria-hidden="true" />
                </span>
                <span
                  style={{ fontSize: "16px" }}
                  className="pcoded-mtext"
                  data-i18n="nav.basic-components.main"
                >
                  <b>Assurances</b>
                </span>
                <span className="pcoded-mcaret" />
              </a>

              <ul className="pcoded-submenu">
                <li className=" ">
                  <a
                    href="icon-themify.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li>
                      <Link to="AddAssurance">Ajouter assurance </Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>
                <li className=" ">
                  <a
                    href="notification.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li>
                      <Link to="ListeAssurance">Liste des assurances</Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>
              </ul>
            </li>
<hr></hr>
            <li className="pcoded-hasmenu">
              <a href="javascript:void(0)" className="waves-effect waves-dark">
                <span style={{ fontSize: "17px" }} className="pcoded-micon">
                  <i className="fa fa-building-o" />
                </span>
                <span
                  style={{ fontSize: "16px" }}
                  className="pcoded-mtext"
                  data-i18n="nav.basic-components.main"
                >
                  <b>Agence</b>
                </span>
                <span className="pcoded-mcaret" />
              </a>

              <ul className="pcoded-submenu">
                <li className=" ">
                  <a
                    href="icon-themify.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li>
                      <Link to="AddAgence">Ajouter agence </Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>
                <li className=" ">
                  <a
                    href="notification.html"
                    className="waves-effect waves-dark"
                  >
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <li>
                      <Link to="ListeAgence"> Liste des agence</Link>
                    </li>
                    <span className="pcoded-mcaret" />
                  </a>
                </li>
              </ul>

              <hr />
            </li>
            <li className="pcoded-hasmenu">
            <a
              href="javascript:void(0)"
              className="waves-effect waves-dark admin-link"
              style={{}}
            >
              <span style={{ fontSize: "16px" }} className="pcoded-micon">
                <i
                  style={{ fontSize: "18px" }}
                  className="fa fa-user-circle-o"
                />
              </span>
              <span
                style={{ fontSize: "16px" }}
                className="pcoded-mtext"
                data-i18n="nav.basic-components.main"
              >
                <b>Message</b>
              </span>
              <span className="pcoded-mcaret" />
            </a>
            <ul className="pcoded-submenu">
              <li className=" ">
                <a href="icon-themify.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <li>
                    <Link to="contactList">Liste des messages </Link>
                  </li>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
            </ul>
            <hr></hr>
           
            <a href="javascript:void(0)" className="waves-effect waves-dark">
                <span style={{ fontSize: "17px" }} className="pcoded-micon">
                  <i className="ti-layout-sidebar-left" />
                </span>
                
                <a style={{ fontSize: "16px" }} onClick={(e) => logout()}>
                
                  <b>Logout</b>
                </a>
                <span className="pcoded-mcaret" />
              </a>


        
          </li>
          </ul>
        
        </div>
      </nav>
      <div className="pcoded-content"></div>
    </div>
  );
};
export default Siedbar;
