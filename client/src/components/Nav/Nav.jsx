import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { NavLink, useNavigate } from "react-router-dom"
import style from "./Nav.module.css"
import { setPage } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Nav() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButton = () => {
    dispatch(setPage(1))
    navigate("/home");
  }
  return (
    <div className={style.container}>
      <h1 className={style.logo}>WELCOME TO THE COUNTRIES</h1>
      <div className={style.links}>
        <SearchBar />
        <NavLink onClick={handleButton} className={style.Link} to="/home">
          Home
        </NavLink>
        <NavLink className={style.Link2} to="/from">
          Create Activity
        </NavLink>
      </div>
    </div>
  );
}
