import React , {Component} from "react"
import loginService from "../Service/loginService"
import { Link,useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useEffect,useState } from "react"
import reservationService from "../Service/reservationService"
import notificationService from "../Service/notificationService"
import { redirect } from "react-router-dom"

const Header = () => {
const navigate =useNavigate();



const [Data,setData]=useState()



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

const fetchNotificationData = () => {
  notificationService.createNot()
    .then((res) => {
      setData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  // Fetch notification data immediately when the component mounts
  fetchNotificationData();

  // Fetch notification data every 5 minutes
  const intervalId = setInterval(fetchNotificationData, 5 * 60 * 1000);

  // Clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []);


   


   



  
  



    return(
      
      <div>
  <nav className="navbar header-navbar pcoded-header">
    <div className="navbar-wrapper">
      <div className="navbar-logo">
        <a className="mobile-menu waves-effect waves-light" id="mobile-collapse" href="#!">
          <i className="ti-menu" />
        </a>
        <div className="mobile-search waves-effect waves-light">
          <div className="header-search">
            <div className="main-search morphsearch-search">
              <div className="input-group">
                <span className="input-group-addon search-close"><i className="ti-close" /></span>
                <input type="text" className="form-control" placeholder="Enter Keyword" />
                <span className="input-group-addon search-btn"><i className="ti-search" /></span>
              </div>
            </div>
          </div>
        </div>
        <a href="index.html">
          <img className="img-fluid" src="assets/images/logo.png" alt="Theme-Logo" />
        </a>
        <a className="mobile-options waves-effect waves-light">
          <i className="ti-more" />
        </a>
      </div>
      <div className="navbar-container container-fluid">
        <ul className="nav-left">
          <li>
            <div className="sidebar_toggle"><a href="javascript:void(0)"><i className="ti-menu" /></a></div>
          </li>
          <li className="header-search">
            <div className="main-search morphsearch-search">
              <div className="input-group">
                <span className="input-group-addon search-close"><i className="ti-close" /></span>
                <input type="text" className="form-control" />
                <span className="input-group-addon search-btn"><i className="ti-search" /></span>
              </div>
            </div>
          </li>
          <li>
           
          </li>
        </ul>

       


        <ul className="nav-right">
              <li className="header-notification">
                <a className="waves-effect waves-light">
                  <i onClick={fetchNotificationData} className="ti-bell" />


                  <span className="badge bg-c-red" style={{width:"32%" , height:"28%" }} >{Data?.length}</span>
                </a>
                <ul className="show-notification">
                  <li>
                    <h6>Notifications</h6>
                    <label className="label label-danger">{Data?.length}</label>
                  </li>

                  {Data?.map((item) => {
                    return (
                      <li className="waves-effect waves-light">




                        <div className="media">
                        <img style={{width:'15%'}} 
                                         
                                         src={"http://localhost:3000/file/UploadVehicule/" +item.reservation.vehiculeId.file}
                                     />
                          <div className="media-body">
                            <h5 className="notification-user"></h5>

                            <p className="notification-msg"> <b>{item.contenu}</b></p>
          
          
                            <p className="notification-msg" ><Link to={`/Detailsreservation/${item?.reservation?._id}`}>
                               Aujourd'hui {item.reservation.userId.username} rend la voiture</Link></p>
                  
                            <span className="notification-time"></span>
                          </div>
                        </div>
                      </li>             )
                  })}
                  



                </ul>
          </li>
         
          <li className="user-profile header-notification">
            <a href="#!" className="waves-effect waves-light">
              <img src="assets/images/admin.png" className="img-radius" alt="User-Profile-Image" />
              <span>AlloLocationCar</span>
              <i className="ti-angle-down" />
            </a>
            <ul className="show-notification profile-notification">
            
              <li className="waves-effect waves-light">
                <a href="Profile">
                  <i className="ti-user" /> Profile
                </a>
              </li>
              <li className="waves-effect waves-light">
                <a href="email-inbox.html">
                  <i className="ti-email" /> My Messages
                </a>
              </li>

             

             
             
              <li className="waves-effect waves-light">
                    <a onClick={(e) => logout()}>
                      <i className="ti-layout-sidebar-left" /> Logout
                    </a>
                  </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </div>

          
    )

}
export default Header