import React from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";

function Menu(props) {
  const isLoggedIn = sessionStorage.loginok === "yes";

  const loggedInId = sessionStorage.myid;

  const navi = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navi("/login");
  };

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

      {isLoggedIn ? (
        <li style={{ width: "180px" }}>
          <a href="/login" onClick={logout}>
            로그아웃&nbsp;&nbsp;{loggedInId}님
          </a>
        </li>
      ) : (
        <li>
          <NavLink to={"/login"}>로그인</NavLink>
        </li>
      )}
    </ul>
  );
}

export default Menu;
