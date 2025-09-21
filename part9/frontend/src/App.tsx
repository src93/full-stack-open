import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Patients } from "./components/Patients/Patients";
import { Patient } from './components/Patient/Patient';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Patients /> } />
        <Route path='/patient/:id' element={ <Patient /> } />
      </Routes>
    </Router>
  );
};

export default App;