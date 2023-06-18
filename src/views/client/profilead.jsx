import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import loginService from "../../Service/loginService"
import "./stylead1.css"

const Profile=()=>{

    const [admin,setAdmin]=useState()
    
    
  
   
    
    const getAll=()=>{
    loginService.getAll().then((res)=>{
      console.log(res)
      setAdmin(res.data.data)
      console.log("err",admin)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAll()
  },[])

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };



  const filteredData = admin?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        return el.name.toLowerCase().includes(inputText)
    }
})

    return(
        <>

{filteredData?.map((item) => {
            return (

              <div>

    {/* BEGIN USER PROFILE */}
    <div className="col-md-12">
      <div className="grid profile">
        <div className="grid-header">
          <div className="col-xs-2">
          <img className="img-circle" 
                                         
                                         src={"http://localhost:3000/file/uploadAdmin/" +item.file}
                                     />
          </div>
          <div className="col-xs-7">
            <h3>{item.username}</h3>
           
            <p>Website Developer, Programmer</p>
          </div>
          <div className="col-xs-3 text-right">
          </div>
        </div>
        <div className="grid-body">
         
          <div className="tab-content">
            {/* BEGIN PROFILE */}
            <div class="tab-pane active" id="profile">
      <p class="lead">My Profile</p>
      <hr />
      <div class="row">
        <div class="col-md-6">
        &nbsp;&nbsp;<p><strong class="titleProfile">Nom:  </strong>&nbsp;<span class="info">{item.nom}</span></p>
          &nbsp;&nbsp;<p><strong class="titleProfile">Prénom:</strong>&nbsp; <span class="info"> {item.prenom}</span></p>
          &nbsp;&nbsp;<p><strong class="titleProfile">Skills:</strong>&nbsp; <span class="label label-primary">HTML</span>, <span class="label label-primary">CSS</span>, <span class="label label-primary">JAVASCRIPT</span>, <span class="label label-primary">JQUERY</span>, <span class="label label-primary">ReactJs</span>, <span class="label label-primary">PHP</span>, <span class="label label-primary">RUBY</span>, <span class="label label-primary">PHYTON</span>, </p>
        </div>
        <div class="col-md-6">
        &nbsp;&nbsp;<p className="space"><strong class="titleProfile">Téléphone:</strong>&nbsp;&nbsp;<span class="info">{item.telephone}</span></p>
        &nbsp;&nbsp;<p className="space"><strong class="titleProfile">Email:</strong>&nbsp;&nbsp;<span class="info">{item.email}</span></p>
        &nbsp;&nbsp;<p className="space"><strong class="titleProfile">Adresse:</strong>&nbsp;&nbsp;<span class="info">{item.ville}</span></p>
        </div>
      </div>
                
              
            </div>
            {/* END PROFILE */}
          
           
          </div>
        </div>
      </div>
    </div>
    {/* END USER PROFILE */}
  </div>




                )
            })}</>
    )
}
export default Profile