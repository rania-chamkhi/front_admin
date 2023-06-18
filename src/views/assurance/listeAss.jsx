import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import assuranceService from "../../Service/assuranceService"
import "./stylea.css"
const ListeAss=()=>{

    const [assurance,setAssurance]=useState()
    
    
  
   
    
    const getAll=()=>{
    assuranceService.getAll().then((res)=>{
      console.log(res)
      setAssurance(res.data.data)
      console.log("err",assurance)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAll()
  },[])

  

  const deleteAss=(id)=>{
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
        assuranceService.deleteAss(id).then((res)=>{
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
  const filteredData = assurance?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        return el.name.toLowerCase().includes(inputText)
    }
})


 

 
    return(

        <div>

<div style={{width: '90%', margin: 'auto', marginTop: '45px'}} className="card-a" >
  <div className="card-header-a">
    <h2 className="text-center-a"><u >Liste des assurances</u></h2>
  </div>
  <div className="card-block table-border-style">
    <h5 className="title-a" style={{position: 'absolute', right: '63%'}}><i>La liste des assurances disponibles :</i></h5><br /><br></br>
    <form className="search-a" role="form" style={{ position: 'absolute', right: '73%' }}>
      <input type="text" name="seach" placeholder="Rechercher..." onChange={inputHandler} />
    </form><br></br><br></br><br></br>
    <div className="table-responsive-a" style={{margin: 'auto', textAlign: 'center'}}>
      <table className="table-a table-bordered-a table-hover-a" style={{width: '95%', margin: 'auto'}}>
        <thead>
          <tr className="table-success-a">
            <th style={{width: '1%'}} className="text-center-a">id</th>
            <th style={{width: '10%'}} className="text-center-a">Nom de l'assurance</th>
            <th style={{width: '10%'}} className="text-center-a">Description</th>
            <th style={{width: '10%'}} className="text-center-a">Prix</th>
            <th style={{width: '10%'}} className="text-center-a">Action</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredData?.map((item, index) => {
            return (
              <tr className="text-center-a" id="trow_2" key={item._id}>
                <td style={{verticalAlign: "middle"}} className="text-center">{index + 1}</td>
                <td style={{verticalAlign: "middle"}}><strong>{item.name}</strong></td>
                <td style={{verticalAlign: "middle",whiteSpace: "pre-line"}}><strong>{item.description}</strong></td>
                <td style={{verticalAlign: "middle"}} className="text-center"><strong>{item.prix}</strong></td>
                <td>
                  <Link to={`/UpdateAssurance/${item._id}`}>
                    <button className="btn btn-default-a btn-rounded-a btn-sm-a">
                      <span className="fa fa-pencil" />
                    </button>
                  </Link>
                  <button onClick={(e) => deleteAss(item._id)} className="btn btn-danger-a btn-rounded-a btn-sm-a">
                    <span className="fa fa-times" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      


    </div>
  </div>
</div>
        </div>
    )
}
export default ListeAss