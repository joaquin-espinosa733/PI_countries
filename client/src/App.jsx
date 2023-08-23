import style from './App.module.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/ladingPage/landingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Nav from "./components/Nav/Nav"
import From from "./components/Form/Form"


function App() {
  const location = useLocation();
  return (
    <>
      <div className={style.container}>
        {location.pathname !== "/" && <Nav />}
        <div className={style.link}>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          
          <Route path='/home/' element={<Home />}></Route>
          
          <Route path='/detail/:id' element={<Detail />}></Route>
          
          <Route path='/from' element={<From />}></Route>
        </Routes>
        </div>
      </div>
    </>
  )
}

export default App
