
import './App.css';
import LeadBoard from './components/LeadBoard/LeadBoard';
import ButtonAppBar from './components/Topbar/Topbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clients from './pages/Clients'
import SmartQuotation from './pages/SmartQuotation';
import SignIn from './components/LoginRegistration/Signin';
import Dashboard from './pages/Dashboard';
import SignUp from './components/LoginRegistration/SignUp';
function App() {
  return (
    
    <Router>
      <div className="App">
       
      <div >
        <Routes>
            {/* <Route path="/" element={<LeadBoard />} /> */}
            <Route index element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
             <Route path="/quotation" element={<SmartQuotation />} />
        </Routes>
        
      </div>
       
      </div>
    </Router>
    
    
  );
}

export default App;
