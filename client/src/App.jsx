import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/ladingPage/landingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Nav from "./components/Nav/Nav"


function App() {
  const location = useLocation();
  return (
    <>
      <div>
        {location.pathname !== "/" && <Nav />}
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/home/' element={<Home />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
