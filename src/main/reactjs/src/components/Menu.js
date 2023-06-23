import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

function Menu(props) {
  return (
    <ul className="menu">
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/member/form"}>회원가입</NavLink>
      </li>
      <li>
        <NavLink to={"/member/list"}>회원목록</NavLink>
      </li>
      <li>
        <NavLink to={"/board/list"}>게시판</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>로그인</NavLink>
      </li>
    </ul>
  );
}

export default Menu;
