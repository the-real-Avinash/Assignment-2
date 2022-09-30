
import './App.css';
import FirstCard from './components/FirstCard';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import SecondCard from './components/SecondCard';


function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<LoginForm/>}/>
   <Route path='/firstcard' element={<FirstCard/>}/>
   <Route path='/secondcard' element={<SecondCard/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
