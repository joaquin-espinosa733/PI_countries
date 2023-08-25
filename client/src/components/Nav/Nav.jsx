import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {NavLink, useNavigate} from "react-router-dom"
import style from "./Nav.module.css"
import { setPage } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Nav() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButton = ()=>{
    dispatch(setPage(1))
    navigate("/home");
  }
return (
    <div className={style.container}>
    <SearchBar/>
    <NavLink onClick={handleButton}className={style.Link} to={"/home"}>Home</NavLink>
    <NavLink className={style.Link2} to="/from">Create Activity</NavLink>
    </div>
  )
}
