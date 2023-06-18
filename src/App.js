import './App.css';
import Login from './views/Login';
import Layout from './views/Layout';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home';
import ListeVeh from './views/vehicule/liste';
import UpdateVeh from './views/vehicule/update';
import AddVeh from './views/vehicule/add';
import Listereserv from './views/Reservation/listeReserv';
import ListeAss from './views/assurance/listeAss';
import AddAss from './views/assurance/AddAss';
import ListeAg from './views/agence/listeAg';
import UpdateAss from './views/assurance/updateAss';
import AddAg from './views/agence/addAg';
import UpdateAg from './views/agence/updateAg';
import ListeFalse from './views/vehicule/listvehFalse';
import DetailsReserv from './views/Reservation/detailsReserv';
import ContactList from './views/contact';
import ContactDetails from './views/contact/contactDetails';
import ListeCl from './views/client/ListeClient';
import DetailVeh from './views/vehicule/DetailsVeh';
import Profile from './views/client/profilead';


function App() {

  const Privateroute = ({ children }) => {
    if (!localStorage.getItem("user")) {
      return <Navigate to="/"></Navigate>
    } return children
  }



  return (
    <div className="App">
      <BrowserRouter>



        <Routes>
          <Route path="/" element={ <Home /> } >
            <Route path="/" element={<Layout />  }></Route>
            <Route path="Listevehicule" element={ <ListeVeh />  }> </Route>
            <Route path='ListevehiculeR' element={<ListeFalse />}> </Route>

            <Route path='Updatevehicule/:id/:type' element={ <UpdateVeh /> }> </Route>
            <Route path='update-contact/:id/:type' element={ <ContactDetails /> }> </Route>
            <Route path='AddVehicule' element={<AddVeh /> }> </Route>
            <Route path='Listereservation' element={<Listereserv /> }> </Route>
            <Route path='Detailsreservation/:id' element={<DetailsReserv />}> </Route>
            <Route path='contactList' element={<ContactList />}> </Route>
            <Route path='ListeAssurance' element={<ListeAss />}></Route>
            <Route path='AddAssurance' element={<AddAss />}></Route>
            <Route path='UpdateAssurance/:id' element={<UpdateAss />}></Route>
            <Route path='ListeAgence' element={<ListeAg />}></Route>
            <Route path='AddAgence' element={<AddAg />}></Route>
            <Route path='UpdateAgence/:id' element={<UpdateAg/>}></Route>
            <Route path='ListeClient' element={<ListeCl />}> </Route>
            <Route path='DetailVehicule/:id' element={<DetailVeh/>}></Route>
            <Route path='Profile' element={<Profile/>}></Route>

            </Route>
          



          <Route path="/login" element={<Login />}></Route>

        </Routes>


      </BrowserRouter>

    </div >

  );
}

export default App;
