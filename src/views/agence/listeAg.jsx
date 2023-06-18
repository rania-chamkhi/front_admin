
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import agenceService from "../../Service/agenceService"

const ListeAg=()=>{
    const [agence,setAgence]=useState()

    
    const getAll=()=>{
    agenceService.getAll().then((res)=>{
      console.log(res)
      setAgence(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAll()
  },[])


  const deleteAg=(id)=>{
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
        agenceService.deleteAg(id).then((res)=>{
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
  const filteredData = agence?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        return el.name.toLowerCase().includes(inputText)
    }
})

    return(

        <div>

<div className="card" style={{width: '90%', margin: 'auto', marginTop: '45px'}}>
  <div className="card-header">
    <h2 className="text-center"><u style={{color: 'red'}}>Liste des agences</u></h2>
  </div>
  <div className="card-block table-border-style">
    <h5 style={{position: 'absolute', right: '63%'}}><i>La liste des agences disponibles :</i></h5><br /><br></br>
    <form role="form" style={{ position: 'absolute', right: '73%' }}>
      <input type="text" name="seach" placeholder="Rechercher..." onChange={inputHandler} />
    </form><br></br><br></br>
    <div className="table-responsive" style={{margin: 'auto', textAlign: 'center'}}>
      <table className="table table-bordered table-hover" style={{width: '70%', margin: 'auto'}}>
        <thead>
          <tr className="table-success">
            <th style={{width: '1%'}} className="text-center">id</th>
            <th style={{width: '10%'}} className="text-center">Nom de l'agence</th>
            <th style={{width: '10%'}} className="text-center">Adresse</th>
            <th style={{width: '10%'}} className="text-center">Email</th>
            <th style={{width: '10%'}} className="text-center">telephone</th>
            
            <th style={{width: '10%'}} className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, index) => {
            return (
              <tr className="text-center" id="trow_2" key={item._id}>
                <td style={{verticalAlign: "middle"}} className="text-center">{index + 1}</td>
                      <td style={{ verticalAlign: "middle" }}><strong>{item.name}</strong></td>
                      <td style={{ verticalAlign: "middle" }}><strong>{item.adresseAg}</strong></td>
                      <td style={{ verticalAlign: "middle" }} ><strong>{item.email}</strong></td>
                      <td style={{ verticalAlign: "middle" }} className="text-center" ><strong>{item.tel}</strong></td>

                <td>
                  <Link to={`/UpdateAgence/${item._id}`}>
                    <button className="btn btn-default btn-rounded btn-sm">
                      <span className="fa fa-pencil" />
                    </button>
                  </Link>
                  <button onClick={(e) => deleteAg(item._id)} className="btn btn-danger btn-rounded btn-sm">
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
export default ListeAg