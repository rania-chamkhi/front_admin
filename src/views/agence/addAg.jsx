import { useState  } from 'react';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import agenceService from '../../Service/agenceService';

const AddAg=()=>{

    const navigate = useNavigate()
    const [data,setData]=useState({})
        const onChangeHandler=(e)=>{
          setData({
            ...data,
            [e.target.name]:e.target.value
          })
          console.log(data)
        }
     const onSubmitHandler=(e)=>{
      e.preventDefault()
      Swal.fire({
        title: 'Do you want to save a new Agence!',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          agenceService.createAg(data).then((res)=>{
            console.log(res)
            navigate('/ListeAgence')
          }).catch((err)=>{
            console.log(err)
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
     }

    return(
<div>


<div className="row">
  <div className="col-sm-12">
    {/* Basic Form Inputs card start */}
    <div style={{width:'90%',margin:'auto', marginTop:'45px'  }} className="card">
      <div className="card-header">
       
      
      </div>
      <div className="card-block">
        <h4 className="" ><u style={{color:'#88291f' , marginLeft: '17% '}}><b>Ajouter une agence</b></u></h4><br></br>
        <form className="form-cat" onSubmit={onSubmitHandler}>

       
          <div className="form-group row">
            <label style={{textAlign:'right' ,color:'#c80719'}} className="col-sm-2 col-form-label"><b>Nom</b></label>
            <div className="col-sm-5">
              <input type="text" className="form-control form-control-round" name="name"  onChange={onChangeHandler}/>
            </div>
          </div>
         
        
          
          <div className="form-group row">
            <label style={{textAlign:'right' ,color:'#c80719'}} className="col-sm-2 col-form-label"><b>Adresse de l'agence</b></label>
            <div className="col-sm-5">
              <textarea rows={5} cols={5} className="form-control" name="adresseAg"  onChange={onChangeHandler} />
            </div>
          </div>

          <div className="form-group row">
            <label style={{textAlign:'right' ,color:'#c80719'}} className="col-sm-2 col-form-label"><b>email</b></label>
            <div className="col-sm-5">
              <input type="email" className="form-control" name="email"  onChange={onChangeHandler} />
            </div>
          </div>

          <div className="form-group row">
            <label style={{textAlign:'right' ,color:'#c80719'}} className="col-sm-2 col-form-label"><b>Téléphone</b></label>
            <div className="col-sm-5">
              <input type="text" className="form-control" name="tel"  onChange={onChangeHandler} />
            </div>
          </div>

          

          <button type="submit" class="btn waves-effect waves-light hor-grd btn-grd-warning "  style={{ marginLeft: '60% ' }}>Ajouter agence </button>

        </form>
      </div></div></div></div>

</div>
    )
}
export default AddAg