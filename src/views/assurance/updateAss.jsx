import { useEffect, useState  } from 'react';
import { useNavigate,useParams  } from 'react-router-dom';
import Swal from 'sweetalert2';
import assuranceService from '../../Service/assuranceService';

const UpdateAss=()=>{

    const {id} =useParams()
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
          title: 'Do you want to save updated data!',
          showDenyButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            assuranceService.updateass(id,data).then((res)=>{
              console.log(res)
              navigate('/ListeAssurance')
            }).catch((err)=>{
              console.log(err)
            })
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
       }
       useEffect(()=>{
        assuranceService.getAssurance(id).then((res)=>{
          console.log("dataofcat",res)
          setData(res.data.data)
        })
       },[]) 
    return(
        <div>

{/* Input Alignment card start */}
<div style={{width:'90%',margin:'auto', marginTop:'45px'  }} className="card">
  <div className="card-header"><br></br>
  <h4 className=" "><u style={{color:'#3593a4' , marginLeft: '17% '}}>Mise à jour de l'assurance</u></h4>
  
  </div>
  <div className="card-block">
    <form className="form-cat"  onSubmit={onSubmitHandler}>
      <div className="form-group row">
        <label style={{textAlign:'right' ,color:'#008697'}} className="col-sm-2 col-form-label"><b>nom de l'assurance</b></label>
        <div className="col-sm-5">
          <input type="text"  className="form-control form-control-normal" name="name" value={data.name}   onChange={onChangeHandler} />
        </div>
      </div>
      <div className="form-group row">
        <label style={{textAlign:'right' ,color:'#2da1d7'}} className="col-sm-2 col-form-label"><b>Description</b></label>
        <div className="col-sm-5">
          <textarea type="text" className="form-control form-control-left" name="description" value={data.description}  onChange={onChangeHandler}/>
        </div>
      </div>
      <div className="form-group row">
        <label style={{textAlign:'right' ,color:'#2da1d7'}} className="col-sm-2 col-form-label"><b>Prix</b></label>
        <div className="col-sm-5">
          <input type="number" className="form-control form-control-capitalize" name="prix" value={data.prix}  onChange={onChangeHandler}/>
        </div>
      </div>
     
      
      <button type="submit" style={{ marginLeft: '60% ' }} class="btn waves-effect waves-light btn-grd-info ">Mise à jour</button>

      
    </form>
  </div>
</div>
{/* Input Alignment card end */}

        </div>
    )
}
export default UpdateAss