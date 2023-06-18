
import React from "react"
import Header from "../components/Header"
import Footer from "../components/footer"
import Siedbar from "../components/siedbar"
import { Outlet } from "react-router-dom"
const Home = () => {
    return(
      
       
<div>
 
  {/* Pre-loader end */}
  <div id="pcoded" className="pcoded">
    <div className="pcoded-overlay-box" ></div>
    <div className="pcoded-container navbar-wrapper">
    
    <Header/>
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
         <Siedbar/>
        
         <div className="pcoded-content">
         <div className="page-header">
              <div className="page-block">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="page-header-title">
                      <h5 className="m-b-10">Dashboard</h5>
                      <p className="m-b-0">Bienvenue chez Allocation Car</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <a href="index.html"> <i className="fa fa-home" /> </a>
                      </li>
                      <li className="breadcrumb-item"><a href="#!">Dashboard</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              </div>  
              
         <Outlet/> 
        </div>
      </div>
      </div>
  </div>
</div>
</div>

    )
}
export default Home