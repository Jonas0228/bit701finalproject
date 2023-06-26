import Axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import noimage from "../image/noimage.png";

function BoardRowList(props) {
  const { idx, no, row, currentPage } = props;

  //이미지 경로
  const photoUrl = process.env.REACT_APP_SMALL_BOARDURL1;
  const photoUrl2 = process.env.REACT_APP_SMALL_BOARDURL2;

  // 이미지 URL 결정
  const imageUrl = row.photo ? `${photoUrl}${row.photo}${photoUrl2}` : noimage;

  const navi = useNavigate();

  const handleRowClick = (e) => {
    const isLoggedIn = sessionStorage.getItem("loginok") === "yes";
    if (!isLoggedIn) {
      e.preventDefault(); // 클릭 이벤트 기본 동작 막기
      alert("로그인이 필요합니다."); // 알림 메시지 표시
      navi("/login"); // 로그인 페이지로 리다이렉션
    }
  };

  return (
    <tr>
      <td>{no - idx}</td>
      <td>
        <div onClick={handleRowClick}>
          {" "}
          {/* div 추가 */}
          <NavLink
            to={`/board/detail/${row.num}/${currentPage}`}
            style={{
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
            }}
          >
            <img
              alt=""
              src={imageUrl}
              style={{
                width: "40px",
                border: "1px solid #000",
                marginRight: "4px",
              }}
            />
            <b>{row.subject}</b>
          </NavLink>
        </div>
      </td>
      <td>{row.myname}</td>
      <td>{row.writeday}</td>
      <td>{row.readcount}</td>
    </tr>
  );
}

export default BoardRowList;
