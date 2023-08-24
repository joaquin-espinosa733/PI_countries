import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {NavLink} from "react-router-dom"
import style from "./Nav.module.css"

export default function Nav() {
  return (
    <div className={style.container}>
    <SearchBar/>
    <NavLink className={style.Link} to={"/home"}>Home</NavLink>
    <NavLink className={style.Link2} to="/from">Create Activity</NavLink>
    </div>
  )
}
