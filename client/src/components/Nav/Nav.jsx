import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {NavLink} from "react-router-dom"

export default function Nav() {
  return (
    <div>
        <SearchBar/>
    <NavLink to={"/home"}>salir al Home</NavLink>
    </div>
  )
}
